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

### Sprint 04: CORE ESSENCIAL - Ingestão de Dados, Validação Nominal e Persistência
* **Branch:** `feat/core-data-and-matching`
* **Micro-Marcos:**
  * **Ingestão de Calouros:** Pipeline para extração dos PDFs da UFAPE (1 regular + 9 listas de espera), expurgando alunos de 2026.1 via Ata de Sala, inserindo na tabela `calouros_aprovados`;
  * **Ingestão de Veteranos:** Carga dos dados reais dos padrinhos e madrinhas na tabela `padrinhos` (madrinha Tamires com cota 4, demais veteranos com cota 5), sincronizando com o catálogo do frontend;
  * **Validação Nominal no Frontend:** Verificação de elegibilidade do calouro em tempo real (com normalização `normalize('NFD')`) e chave de desbloqueio temporal em 12/10/2026;
  * **Persistência Total:** Leitura em tempo real de vagas via `vw_padrinhos_publico` e confirmação transacional do apadrinhamento gravada no Supabase.
* **Critério de Aceite:** Calouro na lista é liberado; nome ausente recebe bloqueio orientativo; após escolha, dados são gravados atomicamente no Supabase.

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
  * Substituição da logo provisória "UF" pela identidade oficial da UFAPE enviada;
  * Otimização e alocação dos memes/stickers em `assets/img/padrinhos/*.webp`;
  * **Padronização rigorosa do Footer** em todas as páginas e rotas com dados institucionais e créditos do desenvolvedor;
  * Teste de homologação em dispositivos móveis (Android e iOS);
  * Atualização de apontamento de repositório na Vercel com publicação em produção.
* **Critério de Aceite:** Site em produção respondendo com performance excelente e zero erros de console.

---

## Notas de Discussão & Decisões Pendentes (Backlog / ADRs)
* **[DISCUSSÃO PENDENTE] Botão de WhatsApp vs. Suspense da Cerimônia de Apadrinhamento:**
  - *Contexto:* Ao concluir o formulário com sucesso, a interface exibe atualmente um card com a opção de contato via WhatsApp.
  - *Ponto de atenção:* Deve-se pausar a exibição do contato telefônico dos padrinhos/madrinhas caso eles prefiram resguardar a privacidade, mantendo o suspense para a Cerimônia Oficial de Apadrinhamento presencial?
  - *Status:* Aguardando retorno da resposta válida do usuário antes de efetivar a alteração.
* **[COMPROMISSO] Padronização Rigorosa do Footer:**
  - O rodapé institucional deve ser idêntico em todas as páginas (`index.html`, `test-errors.html`, `404.html`, `/padrinho/`, `/admin/`) antes da release final.

---

## Política de Branches & Git Flow
1. Toda funcionalidade é criada a partir de `main` em sua branch específica (`feat/...`);
2. Commits atômicos no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`);
3. Ao concluir a sprint, é aberto o Pull Request (PR) com descrição objetiva para revisão e merge em `main`.
