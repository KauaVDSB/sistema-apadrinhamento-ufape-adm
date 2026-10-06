# Planejamento de Sprints & Micro-Sprints
### Sistema de Apadrinhamento Acadêmico • Bacharelado em Administração (UFAPE)

Planejamento ágil orientado a entregas incrementais com branches isoladas e Pull Requests (PRs), sem documentação redundante.

---

## Visão Geral dos Marcos

| Sprint | Branch | Foco / Entregável | Status |
| :---: | :--- | :--- | :---: |
| **01** | `feat/supabase-schema-rls` | Modelagem DDL, RLS estrita e RPC anti-race condition | [x] |
| **02** | `feat/http-error-states` | Design System de Telas e Modais de Erro HTTP (401, 403, 404, 500) | [ ] |
| **03** | `feat/calouro-form-questions` | Formulário completo do calouro (Perguntas acadêmicas e contato) | [ ] |
| **04** | `feat/calouros-validation-pipeline` | Ingestão de PDFs UFAPE, normalização nominal e fallback em 12/10 | [ ] |
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
  * Botões de ação para navegação segura ("Fazer Login", "Voltar ao Meu Painel", "Tentar Novamente").
* **Critério de Aceite:** Simulação funcional de todos os códigos de erro no navegador com responsividade mobile.

---

### Sprint 03: Formulário Completo de Apresentação do Calouro
* **Branch:** `feat/calouro-form-questions`
* **Micro-Marcos:**
  * Interface mobile-first com as 5 seções de perguntas (Sobre você, Início da faculdade, Sobre seu padrinho/madrinha, Contato e Espaço livre);
  * Validações de campos obrigatórios (WhatsApp / Instagram);
  * Integração com a chamada RPC do Supabase com tratamento de loading e estados de sucesso.
* **Critério de Aceite:** Envio completo de respostas com persistência íntegra em coluna JSONB/estruturada.

---

### Sprint 04: Pipeline de Ingestão Nominal & Validação de Calouros
* **Branch:** `feat/calouros-validation-pipeline`
* **Micro-Marcos:**
  * Script Python para extração de dados dos PDFs da UFAPE (chamada regular + listas de espera);
  * Higienização contra a ata de 2026.1 (expurgo de veteranos);
  * Algoritmo de normalização ortográfica (`normalize('NFD')`) no frontend e conferência prévia;
  * Implementação da trava temporal com liberação automática em 12/10/2026.
* **Critério de Aceite:** Calouro na lista é liberado; nome ausente recebe bloqueio orientativo; a partir de 12/10 o acesso é liberado irrestritamente.

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
  * Teste de homologação em dispositivos móveis (Android e iOS);
  * Atualização de apontamento de repositório na Vercel com publicação em produção.
* **Critério de Aceite:** Site em produção respondendo com performance excelente e zero erros de console.

---

## Política de Branches & Git Flow
1. Toda funcionalidade é criada a partir de `main` em sua branch específica (`feat/...`);
2. Commits atômicos no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`);
3. Ao concluir a sprint, é aberto o Pull Request (PR) com descrição objetiva para revisão e merge em `main`.
