# Planejamento e Execução de Sprints & Micro-Sprints
### Sistema de Apadrinhamento Acadêmico • Bacharelado em Administração (UFAPE)

Planejamento ágil orientado a entregas incrementais, modelagem atômica de branches e Pull Requests (PRs) integrados à branch principal (`main`).

---

## 1. Visão Geral dos Marcos e Entregas

| Sprint | Branch | Foco / Entregável | Status |
| :---: | :--- | :--- | :---: |
| **01** | `feat/supabase-schema-rls` | Modelagem DDL PostgreSQL, RLS estrita e RPC transacional | **[x] Concluída** |
| **02** | `feat/http-error-states` | Design System de Telas e Modais de Erro HTTP (401, 403, 404, 500) | **[x] Concluída** |
| **03** | `feat/calouro-form-questions` | Formulário completo do calouro (Preferências, afinidades e contatos) | **[x] Concluída** |
| **04** | `feat/core-data-and-matching` | **CORE DE DADOS:** Ingestão de 159 convocados (40 vagas), purga de veteranos e matching | **[x] Concluída** |
| **05** | `feat/portal-dos-padrinhos` | Portal Restrito do Mentor (`/padrinho/`), GoTrue Auth, RLS, modais e slots | **[x] Concluída** |
| **06** | `feat/admin-dashboard-coord` | Painel da Coordenação Geral (10 Mentores • 40 Vagas Oficiais) | **[x] Concluída** |
| **07** | `feat/brand-polish-deploy` | Identidade visual UFAPE PADRINHOS, mobile-first, QR Code e lançamento | **[x] Concluída** |

---

## 2. Detalhamento das Sprints Executadas

### Sprint 01: Modelagem do Banco, RLS & Função Transacional de Cotas
* **Branch:** `feat/supabase-schema-rls` (PR #1 merged)
* **Objetivo:** Estabelecer a infraestrutura de dados relacional e a camada de segurança no Supabase (PostgreSQL).
* **Entregáveis:**
  * Criação das tabelas relacionais `padrinhos`, `calouros_aprovados`, `apadrinhamentos` e perfis de controle de acesso;
  * Definição de políticas *Row Level Security* (RLS) para isolamento rigoroso entre mentores e calouros (conformidade LGPD);
  * Implementação da função transacional `registrar_apadrinhamento` com bloqueio pessimista `SELECT ... FOR UPDATE` para mitigação de *race conditions*;
  * Scripts de migração e seeds iniciais de teste.
* **Critério de Aceite Atendido:** DDL executável sem erros no PostgreSQL com validação de integridade referencial.

---

### Sprint 02: Design System de Estados e Erros HTTP (401, 403, 404, 500)
* **Branch:** `feat/http-error-states` (PR #5 merged)
* **Objetivo:** Desenvolver uma arquitetura visual consistente e acolhedora para exceções e desvios de fluxo HTTP (ADR-007).
* **Entregáveis:**
  * Componente unificado para tratamento de erros 401 (Não Autenticado), 403 (Acesso Proibido/Restrito), 404 (Não Encontrado) e 500 (Erro de Servidor);
  * Rotas seguras de recuperação ("Fazer Login", "Voltar ao Meu Painel", "Tentar Novamente");
  * Página estática independente `404.html` com suporte a Clean URLs e redirecionamentos amigáveis.
* **Critério de Aceite Atendido:** Simulação validada de todas as respostas HTTP em ambiente de homologação.

---

### Sprint 03: Formulário Completo de Apresentação do Calouro
* **Branch:** `feat/calouro-form-questions` (PR #10 merged)
* **Objetivo:** Interface interativa e amigável para coleta de informações acadêmicas e de perfil dos ingressantes.
* **Entregáveis:**
  * Formulário estruturado em 5 seções temáticas (Identificação, Expectativas, Perfil de Estudo, Redes Sociais e Mensagem de Apresentação);
  * Máscaras e validações em tempo real para número de WhatsApp e arroba do Instagram;
  * Persistência de rascunhos locais via `localStorage` para evitar perda de dados por oscilação de conexão móvel;
  * Sanitização de entradas contra vulnerabilidades XSS.
* **Critério de Aceite Atendido:** Submissão integrada à camada RPC com persistência confirmada no banco de dados.

---

### Sprint 04: CORE DE DADOS - Ingestão, Validação Nominal e Auditoria
* **Branch:** `feat/core-data-and-matching` (PR #11 merged)
* **Objetivo:** Higienização de bases oficiais da UFAPE e homologação do motor de validação dos calouros (ADR-004).
* **Entregáveis:**
  * **Ingestão dos Editais UFAPE 2026.2:** Processamento de 10 editais em PDF (1 chamada regular + 9 listas de espera), totalizando 159 candidatos convocados para o preenchimento das 40 vagas semestrais do curso;
  * **Auditoria e Purga de Veteranos:** Cruzamento com a Ata Oficial de 2026.1, expurgando 35 discentes veteranos remanescentes para eliminar riscos de duplicidade ou falso acolhimento;
  * **Normalização Ortográfica:** Tratamento algorítmico com Unicode NFD (remoção de acentuações, diacríticos, pontuações e múltiplos espaços);
  * **Governança de Cotas:** Parametrização dos 10 mentores oficiais com exatamente 4 vagas cada (40 vagas totais no programa, casando com a capacidade da turma);
  * **Suíte de Testes Automatizados:** Criação do script `scripts/test_rules.py` cobrindo 100% dos cenários de cotas e purga.
* **Critério de Aceite Atendido:** 159 candidatos auditados com unicidade nominal absoluta e 0 veteranos na base de calouros.

---

### Sprint 05: Portal Restrito do Mentor (`/padrinho/`) & Gestão de Afilhados
* **Branch:** `feat/portal-dos-padrinhos` (PR #13 merged)
* **Objetivo:** Área restrita para os mentores veteranos acompanharem suas 4 vagas e acessarem os afilhados acolhidos.
* **Entregáveis:**
  * Autenticação segura via Supabase Auth (GoTrue) com e-mail institucional;
  * Prevenção de loops de RLS através da função utilitária `public.is_admin()`;
  * Interface com *Segmented Tabs*:
    * **Aba 1 (Cards Visuais):** 4 cartões individuais modernos representando os slots (preenchidos com iniciais/monograma vs. vagas em aberto);
    * **Aba 2 (Tabela de Gestão):** Visão tabular fluida com status de acolhimento, data de registro e botões rápidos para WhatsApp (com mensagem personalizada pronta) e Instagram;
  * Modais centrais com *viewport overlay* e *backdrop blur* para Troca de Senha e Recuperação de Senha ("Esqueci minha senha");
  * Ativação de atalhos de usabilidade (foco automático no primeiro input e fechamento com tecla `ESC`).
* **Critério de Aceite Atendido:** Mentor logado visualiza exclusivamente seus 4 afilhados em conformidade rigorosa com a LGPD.

---

### Sprint 06: Painel da Coordenação Geral (10 Mentores • 40 Vagas)
* **Branch:** `feat/portal-dos-padrinhos` (Complemento PR #13 e commits na `main`)
* **Objetivo:** Visão analítica centralizada para a Coordenadora Heloísa Barreto e administração do curso.
* **Entregáveis:**
  * Criação da **Aba 3 (Coordenação Geral)**, ativada sob validação de privilégio administrativo (`is_admin()`);
  * Tabela consolidada com o panorama dos 10 mentores oficiais (Cota, Ocupadas, Livres e Taxa de Preenchimento);
  * Painel de cartões de métricas rápidas no topo (Total Geral: 40 vagas, Preenchidas e Livres);
  * Layout responsivo encapsulado em contêiner flexível, garantindo que colunas e dados nunca quebrem em telas de celular.
* **Critério de Aceite Atendido:** Coordenadora monitora em tempo real o ritmo de ocupação das 40 vagas acadêmicas.

---

### Sprint 07: Refinamento Visual, Identidade UFAPE PADRINHOS & Lançamento
* **Branch:** `main` (Commits atômicos `57a84bf`, `766870f`, `04b8b7e`)
* **Objetivo:** Harmonização visual de alto padrão institucional para o lançamento oficial e divulgação via QR Code.
* **Entregáveis:**
  * **Brand Identity:** Tipografia "UFAPE" em branco e "PADRINHOS" em caixa alta (dourado acadêmico) no Navbar, Hero Emblem e Dashboard;
  * **Brasão Oficial de Alto Contraste:** Estilização do badge de login em fundo Royal Navy (`#0E2A47`) com borda dourada, assegurando que o brasão da UFAPE em vetor branco se destaque com máxima nitidez;
  * **Modais Padronizados:** Cabeçalhos em Royal Navy com títulos dourados nobres (`var(--warm-gold)` / `#C9A227`);
  * **Suporte à Divulgação por QR Code:** Renderização mobile-first rápida (< 800ms) auditada para leitura em smartphones de estudantes;
  * **Publicação em Produção:** Deploy automatizado e operacional na Vercel.
* **Critério de Aceite Atendido:** Aplicação em produção na branch `main` com 5/5 testes aprovados e visual acadêmico refinado.

---

## 3. Diretrizes e Decisões de Governança Acadêmica

1. **Relação Convocados vs. Vagas Efetivas:** A base do sistema comporta os 159 candidatos convocados nos editais e chamadas de 2026.2 para assegurar que os 40 alunos matriculados consigam realizar o processo de apadrinhamento sem impasses de cadastro.
2. **Omissão de Contatos no Mural Público (ADR-005):** Números telefônicos de mentores não são revelados no mural público para preservar a privacidade e o suspense da Cerimônia Presencial (14/10/2026).
3. **Pausamento dos E-mails Automáticos:** O envio automatizado de credenciais por e-mail permanece desativado a pedido da coordenação; a entrega de credenciais é realizada manualmente via canais oficiais.
4. **Política de Git Flow e Versionamento:** Todas as entregas seguiram branches isoladas, mensagens semânticas no padrão Conventional Commits e testes de integridade pré-merge.
