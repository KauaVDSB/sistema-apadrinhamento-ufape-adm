# ADR-003: Controle Concorrente de Cotas & Prevenção de Race Conditions

* **Status:** Aprovado
* **Data:** 06/10/2026 (Atualizado em 11/10/2026)
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

O programa de apadrinhamento estabelece cotas rigorosas de vagas para garantir que o acompanhamento dos calouros seja equilibrado, próximo e humanizado:
* **Capacidade Oficial Homologada:** **10 mentores oficiais** com exatamente **4 afilhados cada**, totalizando **40 vagas de acolhimento** (casando perfeitamente com as 40 vagas semestrais ofertadas no curso de Administração da UFAPE).

Em momentos de pico de acesso (ex.: leitura em massa do QR Code divulgado em cartazes e murais físicos da universidade), múltiplos calouros podem selecionar o mesmo padrinho simultaneamente. Se a verificação de vagas for efetuada apenas no lado do cliente (frontend) ou através de consultas separadas (`SELECT count` seguido de `INSERT`), ocorre uma clássica **Race Condition (Condição de Corrida)**, permitindo que padrinhos fiquem com 5 ou mais apadrinhados, quebrando a governança acordada.

---

## 2. Decisão Arquitetural

Decidiu-se pela implementação de **Controle Transacional Atômico em Nível de Banco de Dados** através de uma **Função RPC (Remote Procedure Call) no PostgreSQL/Supabase**:

```sql
CREATE OR REPLACE FUNCTION registrar_apadrinhamento(
    p_calouro_nome TEXT,
    p_calouro_whatsapp TEXT,
    p_calouro_instagram TEXT,
    p_canal_preferido TEXT,
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
    -- Bloqueio pessimista de linha (Row-Level Lock com FOR UPDATE) para atomicidade estrita
    SELECT limite_vagas INTO v_limite_maximo
    FROM padrinhos
    WHERE id = p_padrinho_id
    FOR UPDATE;

    IF v_limite_maximo IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'MENTOR_NAO_ENCONTRADO',
            'message', 'Mentor não identificado na base oficial.'
        );
    END IF;

    -- Contagem sob transação bloqueada
    SELECT COUNT(*) INTO v_vagas_atuais
    FROM apadrinhamentos
    WHERE padrinho_id = p_padrinho_id;

    IF v_vagas_atuais >= v_limite_maximo THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'VAGAS_ESGOTADAS',
            'message', 'As 4 vagas deste padrinho/madrinha acabaram de ser preenchidas. Por favor, escolha outro mentor no mural.'
        );
    END IF;

    -- Inserção atômica garantida
    INSERT INTO apadrinhamentos (
        calouro_nome, 
        calouro_whatsapp, 
        calouro_instagram, 
        canal_preferido, 
        respostas, 
        padrinho_id
    )
    VALUES (
        p_calouro_nome, 
        p_calouro_whatsapp, 
        p_calouro_instagram, 
        p_canal_preferido, 
        p_respostas, 
        p_padrinho_id
    )
    RETURNING id INTO v_novo_id;

    RETURN jsonb_build_object(
        'success', true,
        'id', v_novo_id,
        'vagas_restantes', v_limite_maximo - (v_vagas_atuais + 1)
    );
END;
$$;
```

---

## 3. Justificativas Técnicas & Acadêmicas

* **Consistência ACID Garantida:** O bloqueio `FOR UPDATE` serializa as requisições concorrentes direcionadas ao mesmo mentor. Nenhuma transação consegue inserir novo afilhado enquanto a anterior não liberar o lock;
* **Economia de Round-Trips:** A validação e a persistência ocorrem em uma única viagem de rede (*single network round-trip*), acelerando a resposta ao calouro no smartphone;
* **Auditoria Automatizada:** O script `scripts/test_rules.py` (Teste 1) audita automaticamente que todos os 10 mentores ativos mantêm `limite_vagas = 4`, somando exatamente 40 vagas no ecossistema.

---

## 4. Consequências

* **Positivas:** Blindagem matemática contra sobre-alocação de cotas, estabilidade durante o lançamento via QR Code e feedback imediato quando uma cota é finalizada.
* **Mitigações:** No frontend, caso o retorno seja `VAGAS_ESGOTADAS`, o botão de seleção do mentor é desabilitado em tempo real e o usuário é redirecionado para escolher outro padrinho com vagas abertas.
