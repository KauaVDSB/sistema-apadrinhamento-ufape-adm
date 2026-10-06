# ADR-004: Pipeline de Ingestão Nominal UFAPE e Fallback Temporal

* **Status:** Aprovado
* **Data:** 06/10/2026
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

Para evitar fraudes, acessos de terceiros ou desordem nas escolhas de apadrinhamento, o sistema precisa certificar que o usuário é de fato um estudante ingressante no Bacharelado em Administração da UFAPE em 2026.2.

Os desafios técnicos identificados são:
1. **Formato Bruto dos Dados:** As listas oficiais da UFAPE são publicadas em arquivos PDF fragmentados (1 chamada regular + 9 chamadas de lista de espera), organizadas por curso e ordenadas por nota decrescente;
2. **Ambiguidade de Semestre:** As publicações originais de ingresso muitas vezes não segregam nominalmente quem iniciou em 2026.1 versus 2026.2;
3. **Erros de Grafia e Divergências de Digitação:** Discentes podem digitar nomes sem acento, com abreviações ou pequenas variações ortográficas em relação ao edital do SISU;
4. **Risco de Exclusão Perto do Início das Aulas:** Caso algum estudante tenha seu nome grafado incorretamente na base oficial, uma trava rígida e intransponível poderia deixá-lo desamparado no primeiro dia letivo (13/10/2026).

## 2. Decisão Arquitetural

Decidiu-se pela construção de um **Pipeline de Ingestão e Validação em 3 Etapas com Cláusula de Fallback Temporal**:

### Etapa 1: Ingestão e Higienização de Dados (Scripts Python)
* Script dedicado para extração de texto estruturado dos 10 PDFs oficiais da UFAPE (chamada regular + 9 listas de espera);
* Cruzamento de dados com a **ata de presença de 2026.1** para expurgar todos os discentes que já iniciaram o curso no semestre anterior, isolando estritamente os calouros de 2026.2;
* Carga da listagem sanitizada na tabela `calouros_aprovados` do Supabase.

### Etapa 2: Algoritmo de Normalização Fonético-Ortográfica
No momento da verificação, tanto o nome do banco quanto o termo digitado pelo calouro são processados pelo algoritmo:
```javascript
function normalizarNome(texto) {
    if (!texto) return '';
    return texto
        .normalize('NFD') // Decomposição de diacríticos
        .replace(/[\u0300-\u036f]/g, '') // Remoção de acentos
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remoção de pontuação
        .replace(/\s+/g, ' ') // Remoção de espaços múltiplos
        .trim();
}
```

### Etapa 3: Regra de Fallback Temporal (12/10/2026)
* **Antes de 12/10/2026:** Validação estrita obrigatória. Usuários não reconhecidos recebem mensagem orientativa e são impedidos de selecionar padrinhos.
* **A partir de 12/10/2026:** A trava de validação por lista é flexibilizada temporariamente, permitindo que qualquer ingressante se identifique e participe, blindando o acolhimento antes do início das aulas em 13/10/2026.

## 3. Justificativas Técnicas & Acadêmicas

* **Segurança Baseada em Dados Oficiais:** Garante que apenas calouros reais preencham as vagas nas etapas iniciais de divulgação;
* **Empatia e Princípio de Inclusão Acadêmica:** O fallback temporal reconhece as limitações de dados administrativos de editais e assegura que nenhum aluno fique de fora por falha sistêmica ou divergência de registro.

## 4. Consequências

* **Positivas:** Redução a zero de invasões e integridade da base com tolerância a falhas ortográficas.
* **Mitigações:** A data de corte (12/10/2026) está parametrizada em constante de configuração no backend/frontend para eventual ajuste rápido pela coordenação.
