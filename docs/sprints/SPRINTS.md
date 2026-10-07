# Planejamento de Sprints & Micro-Sprints
### Sistema de Apadrinhamento Acadêmico • Bacharelado em Administração (UFAPE)

Planejamento ágil orientado a entregas incrementais com branches isoladas e Pull Requests (PRs), sem documentação redundante.

---

## Visão Geral dos Marcos

| Sprint | Branch | Foco / Entregável | Status |
| :---: | :--- | :--- | :---: |
| **01** | `feat/supabase-schema-rls` | Modelagem DDL, RLS estrita e RPC anti-race condition | [x] |
| **02** | `feat/http-error-states` | Design System de Telas e Modais de Erro HTTP (401, 403, 404, 500) | [x] |
| **03** | `feat/calouro-form-questions` | Formulário completo do calouro (Perguntas acadêmicas e contato) | [x] |
| **04** | `feat/core-data-and-matching` | **CORE ESSENCIAL:** Ingestão de dados (calouros/veteranos), validação nominal e persistência Supabase | [ ] |
| **05** | `feat/portal-padrinho` | Rota autenticada `/padrinho/`, troca de senha e visão isolada de afilhados | [ ] |
| **06** | `feat/admin-dashboard-export` | Rota `/admin/`, ocupação em tempo real e exportação para Excel/CSV | [ ] |
| **07** | `feat/brand-assets-deploy` | Substituição da logo UFAPE, figurinhas WebP e homologação na Vercel | [ ] |

---

## Detalhamento das Micro-Sprints

### Sprint 01: Modelagem do Banco, RLS & Função Transacional de Cotas
* **Branch:** `feat/supabase-schema-rls`
* **Micro-Marcos:**
  * `database/schema.sql`: Definição das tabelas `padrinhos`, `calouros_aprovados`, `apadrinhamentos` e `perfis_usuarios`;
  * Políticas de Row Level Security (RLS) para isolamento por papel (RBAC);
  * Stored Procedure `registrar_apadrinhamento` com `FOR UPDATE` para prevenção de race conditions (trava em 5 vagas, 1 madrinha com 4);
  * Seeds iniciais e documentação de execução no SQL Editor do Supabase.
* **Critério de Aceite:** Script SQL executável de ponta a ponta sem erros no console do Supabase com testes de violação de cota.

---

### Sprint 02: Design System de Estados e Erros HTTP (401, 403, 404, 500)
* **Branch:** `feat/http-error-states`
* **Micro-Marcos:**
  * Componente modal/view unificado para erros de navegação e requisição;
  * Telas institucionais acolhedoras para 401 (Não Autenticado), 403 (Acesso Proibido a outro padrinho), 404 e 500;
  * Botões de ação para navegação segura ("Fazer Login", "Voltar ao Meu Painel", "Tentar Novamente");
  * Página estática `404.html` com roteamento configurado no `vercel.json` e servidor local.
* **Critério de Aceite:** Simulação funcional de todos os códigos de erro no navegador com responsividade mobile.

---

### Sprint 03: Formulário Completo de Apresentação do Calouro
* **Branch:** `feat/calouro-form-questions`
* **Micro-Marcos:**
  * Interface mobile-first com as 5 seções de perguntas (Sobre você, Início da faculdade, Sobre seu padrinho/madrinha, Contato e Espaço livre);
  * Validações de campos obrigatórios (WhatsApp com máscara, Instagram e canal de contato);
  * Salvamento em tempo real de rascunhos no `localStorage`;
  * Resiliência offline e vendor local de dependências essenciais;
  * Sanitização rigorosa de credenciais no cliente Supabase.
* **Critério de Aceite:** Formulário validado e integrado à chamada RPC transacional (PR #10 merged).

---

### Sprint 04: CORE ESSENCIAL - Ingestão de Dados, Validação Nominal e Persistência [CONCLUÍDA]
* **Branch:** `feat/core-data-and-matching` (Merged via PR #11)
* **Micro-Marcos:**
  * **Ingestão de Calouros:** Pipeline para extração dos 10 PDFs da UFAPE (1 regular + 9 listas de espera), expurgando alunos de 2026.1 via Ata de Veteranos (35 veteranos expurgados), gerando base com 159 calouros únicos e seed `02_calouros_aprovados.sql`;
  * **Ingestão de Veteranos:** Carga dos dados oficiais dos 9 padrinhos e madrinhas reais na tabela `padrinhos` (Tamires com 4 vagas, demais 8 mentores com 5 vagas; total 44 vagas) no seed `01_padrinhos_reais.sql` e catálogo `js/data.js`;
  * **Validação Nominal no Frontend (ADR-004):** Verificação de elegibilidade do calouro em tempo real (com normalização Unicode NFD) e contingência temporal em 12/10/2026;
  * **Isolamento de Seleção e Confirmação (ADR-003):** Hero Banner e `localStorage` só persistem o mentor após confirmação via RPC do Supabase;
  * **Privacidade e Suspense (ADR-005):** Remoção de contato via WhatsApp prévio à cerimônia presencial; inserção de aviso da Cerimônia Oficial de Apadrinhamento;
  * **Contadores de Vagas:** Badges de cotas dinâmicas em tempo real (`5 vagas disponíveis`, `4 vagas disponíveis`, `Vagas Esgotadas`) e botão de boas-vindas no header;
  * **Testes Automatizados:** Suíte `scripts/test_rules.py` com 5 testes aprovados.
* **Critério de Aceite:** Calouro na lista é validado; cotas são respeitadas; dados são persistidos atomicamente no Supabase (PR #11 merged, Issue #4 fechada).

---

### Sprint 05: Portal Restrito do Padrinho (`/padrinho/`)
* **Branch:** `feat/portal-padrinho`
* **Micro-Marcos:**
  * Tela de login com e-mail institucional e senha;
  * Rota protegida com conferência de sessão Supabase Auth;
  * Listagem exclusiva dos afilhados vinculados com visualização das respostas completas e contatos;
  * Funcionalidade de alteração de senha inicial.
* **Critério de Aceite:** Padrinho logado visualiza estritamente seus afilhados e não consegue inspecionar calouros alheios.

---

### Sprint 06: Painel da Coordenação (`/admin/`) & Exportação
* **Branch:** `feat/admin-dashboard-export`
* **Micro-Marcos:**
  * Painel analítico com contadores de vagas por padrinho (ex.: 5/5, 3/5, 4/4);
  * Listagem geral de todos os apadrinhamentos;
  * Módulo de exportação de dados consolidados em planilha Excel (`.xlsx`) ou `.csv`.
* **Critério de Aceite:** Admin autenticado gera relatório completo formatado com um clique.

---

### Sprint 07: Identidade Visual Final, Mídias WebP e Deploy Vercel
* **Branch:** `feat/brand-assets-deploy`
* **Micro-Marcos:**
  * Substituição da logo provisória "UF" pela identidade oficial da UFAPE enviada (`assets/img/brasao-ufape.png`);
  * Otimização e alocação dos memes/stickers em `assets/img/padrinhos/*.webp`;
  * **Padronização rigorosa do Footer** em todas as páginas e rotas com dados institucionais e créditos do desenvolvedor;
  * Teste de homologação em dispositivos móveis (Android e iOS);
  * Atualização de apontamento de repositório na Vercel com publicação em produção.
* **Critério de Aceite:** Site em produção respondendo com performance excelente e zero erros de console.

---

## Notas de Decisões Arquiteturais e Diretrizes de Negócio
* **[DECISÃO CONCLUÍDA - ADR-005] Omissão de Contatos Telefônicos Pré-Cerimônia:**
  - *Decisão:* Nenhum número de WhatsApp ou telefone de mentor é exibido no frontend antes da Cerimônia Oficial de Apadrinhamento. O primeiro encontro será presencial no campus da UFAPE para preservar o suspense e a privacidade.
* **[COMPROMISSO] Padronização Rigorosa do Footer:**
  - O rodapé institucional deve ser idêntico em todas as páginas (`index.html`, `test-errors.html`, `404.html`, `/padrinho/`, `/admin/`) antes da release final.

---

## Política de Branches & Git Flow
1. Toda funcionalidade é criada a partir de `main` em sua branch específica (`feat/...`);
2. Commits atômicos no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`);
3. Ao concluir a sprint, é aberto o Pull Request (PR) com descrição objetiva para revisão e merge em `main`.
