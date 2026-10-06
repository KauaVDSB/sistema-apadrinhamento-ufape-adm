# ADR-002: Backend Supabase com RBAC e Row Level Security (RLS) Estrita

* **Status:** Aprovado
* **Data:** 06/10/2026
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

O sistema manipula informações cadastrais, de contato (WhatsApp, redes sociais) e depoimentos pessoais/acadêmicos dos estudantes ingressantes. A Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) impõe diretrizes rigorosas sobre o tratamento de dados pessoais no âmbito universitário:
1. Padrinhos e madrinhas devem ter acesso **estritamente e exclusivamente** aos dados dos seus respectivos afilhados;
2. Calouros não devem ter visibilidade sobre os contatos ou respostas de outros calouros;
3. Apenas a coordenação geral do projeto (1 login mestre administrativo) deve ter visibilidade consolidada de todos os registros e autorização para exportação de dados em planilhas.

BaaS tradicionais sem políticas granulares em nível de banco poderiam permitir vazamento de dados via inspeção de requisições de rede ou manipulação de parâmetros em cliente.

## 2. Decisão Arquitetural

Adotou-se o **Supabase (PostgreSQL gerenciado)** com governança de acesso em 3 camadas e políticas mandatórias de **Row Level Security (RLS)**:

```
[ Usuário Público / Calouro ] ──> Apenas leitura de validação e INSERT atômico
[ Padrinho Autenticado ]      ──> SELECT permitido onde auth.uid() == padrinho_id
[ Administrador Geral ]       ──> SELECT / EXPORT irrestrito para gestão e relatórios
```

### Detalhamento das Políticas de RLS (PostgreSQL):
* **Tabela `calouros_aprovados`:** Leitura pública permitida apenas para verificação de nome (antes de 12/10); sem permissão de escrita pública.
* **Tabela `padrinhos`:** Leitura pública restrita a metadados de apresentação e cota de vagas; telefones pessoais e identificadores sensíveis não expostos no catálogo público.
* **Tabela `apadrinhamentos`:**
  * `INSERT`: Permitido para criação de novo vínculo mediante validação prévia.
  * `SELECT`: Habilitado para o padrinho autenticado estritamente onde `padrinho_id = (SELECT id FROM padrinhos WHERE user_id = auth.uid())`.
  * `ALL`: Habilitado para a conta administrativa com `role = 'admin'`.

## 3. Justificativas Técnicas & Conformidade Legal

* **Segurança a Nível de Banco (Defense in Depth):** Mesmo que um usuário mal-intencionado manipule requisições HTTP ou intercepte tokens, o PostgreSQL rejeita nativamente no motor de dados qualquer consulta fora de sua alçada;
* **Conformidade Estrita com a LGPD:** Respeito aos princípios de finalidade, necessidade e segurança da informação para dados pessoais de discentes da UFAPE;
* **Auditoria Acadêmica:** Todas as transações são rastreáveis via identificadores únicos universais (`UUID`).

## 4. Consequências

* **Positivas:** Blindagem completa contra vazamento de dados, separação impecável de responsabilidades e transparência jurídica;
* **Mitigações:** O desenvolvimento do painel de padrinhos (`/padrinho/`) e da área administrativa (`/admin/`) utiliza os métodos oficiais do cliente `@supabase/supabase-js`, garantindo que o cabeçalho `Authorization: Bearer <JWT>` seja repassado de forma transparente.
