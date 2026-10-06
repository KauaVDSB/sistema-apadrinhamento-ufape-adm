# ADR-003: Controle Concorrente de Cotas & Prevenção de Race Conditions

* **Status:** Aprovado
* **Data:** 06/10/2026
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

O programa de apadrinhamento estabelece cotas rigorosas de vagas para garantir que o acompanhamento dos calouros seja equilibrado e humanizado:
* Capacidade padrão: **5 afilhados** por padrinho/madrinha;
* Capacidade especial: **4 afilhados** para uma madrinha específica pré-determinada pela organização.

Em momentos de pico de acesso (ex.: minutos após a divulgação do link nos grupos de calouros), múltiplos estudantes podem selecionar o mesmo padrinho simultaneamente. Se a verificação de vagas for efetuada apenas no lado do cliente (frontend) ou através de consultas separadas (`SELECT count` seguido de `INSERT`), ocorre uma clássica **Race Condition (Condição de Corrida)**, permitindo que padrinhos fiquem com 6 ou mais apadrinhados, estourando as cotas acordadas.

## 2. Decisão Arquitetural

Decidiu-se pela implementação de **Controle Transacional Atômico em Nível de Banco de Dados** através de uma **Função RPC (Remote Procedure Call) no PostgreSQL/Supabase**:

```sql
CREATE OR REPLACE FUNCTION registrar_apadrinhamento(
    p_calouro_nome TEXT,
    p_calouro_contato TEXT,
    p_respostas JSONB,
    p_padrinho_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_vagas_atuais INT;
    v_limite_maximo INT;
    v_novo_id UUID;
BEGIN
    -- Bloqueio pessimista de linha (Row-Level Lock) para atomicidade
    SELECT limite_vagas INTO v_limite_maximo
    FROM padrinhos
    WHERE id = p_padrinho_id
    FOR UPDATE;

    -- Contagem sob transação bloqueada
    SELECT COUNT(*) INTO v_vagas_atuais
    FROM apadrinhamentos
    WHERE padrinho_id = p_padrinho_id;

    IF v_vagas_atuais >= v_limite_maximo THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'VAGAS_ESGOTADAS',
            'message', 'As vagas para este padrinho/madrinha acabaram de ser preenchidas. Por favor, escolha outro mentor.'
        );
    END IF;

    -- Inserção atômica
    INSERT INTO apadrinhamentos (calouro_nome, contato, respostas, padrinho_id)
    VALUES (p_calouro_nome, p_contato, p_respostas, p_padrinho_id)
    RETURNING id INTO v_novo_id;

    RETURN jsonb_build_object(
        'success', true,
        'apadrinhamento_id', v_novo_id
    );
END;
$$;
```

## 3. Justificativas Técnicas & Acadêmicas

* **Consistência ACID:** Garante isolamento estrito (*Serializable/Row Lock*) das transações simultâneas;
* **Prevenção de Sobrecarga e Conflito:** Nenhum padrinho excederá sua cota máxima (seja 5 ou 4);
* **Feedback Imediato ao Usuário:** Caso ocorra a colisão no último segundo, o frontend recebe imediatamente o código `VAGAS_ESGOTADAS` e exibe um modal amigável convidando o ingressante a escolher outro mentor entre os disponíveis.

## 4. Consequências

* **Positivas:** Robustez contra concorrência e integridade absoluta dos dados sem necessidade de intervenção manual da organização;
* **Mitigações:** A função RPC será encapsulada no SDK cliente (`supabase.rpc('registrar_apadrinhamento', ...)`), mantendo o código frontend simples e declarativo.
