# Registros de Decisões Arquiteturais (ADRs)
### Sistema de Apadrinhamento Acadêmico • Bacharelado em Administração (UFAPE)

Este diretório documenta formalmente todas as decisões arquiteturais, premissas de engenharia de software e escolhas de conformidade normativa adotadas no desenvolvimento do sistema, seguindo o padrão de **Architectural Decision Records (ADR)**.

Cada registro detalha o contexto da demanda, as alternativas avaliadas, a decisão técnica final, as justificativas acadêmicas/profissionais e as consequências para a sustentação do projeto.

---

## Índice de Decisões Arquiteturais

| Código | Título | Status | Data | Impacto Principal |
| :---: | :--- | :---: | :---: | :--- |
| **[ADR-001](ADR-001-arquitetura-spa-vanilla-mobile-first.md)** | Arquitetura Frontend SPA Vanilla & Abordagem Mobile-First | **Aprovado** | 06/10/2026 | Zero bundle overhead, performance em redes 3G/4G |
| **[ADR-002](ADR-002-backend-supabase-rbac-rls-lgpd.md)** | Backend Supabase com RBAC e Row Level Security (RLS) Estrita | **Aprovado** | 06/10/2026 | Conformidade com LGPD e isolamento multi-inquilino |
| **[ADR-003](ADR-003-controle-cotas-transacional-anti-race-condition.md)** | Controle Concorrente de Cotas & Prevenção de Race Conditions | **Aprovado** | 06/10/2026 | Atomicidade transacional em banco (5 vagas / 1 com 4) |
| **[ADR-004](ADR-004-pipeline-ingestao-validacao-calouros-fallback-temporal.md)** | Pipeline de Ingestão Nominal UFAPE e Fallback Temporal | **Aprovado** | 06/10/2026 | Higienização de 2026.1 vs 2026.2 e contingência em 12/10 |
| **[ADR-005](ADR-005-autenticacao-padrinhos-gestao-credenciais.md)** | Estratégia de Autenticação dos Padrinhos e Ciclo de Credenciais | **Aprovado** | 06/10/2026 | E-mail institucional, senhas seguras e reset com prazo |
| **[ADR-006](ADR-006-hospedagem-interna-ativos-midia-webp.md)** | Hospedagem Local de Memes/Stickers e Otimização WebP | **Aprovado** | 06/10/2026 | Latência zero de CDN externa e renderização instantânea |
| **[ADR-007](ADR-007-design-system-telas-tratamento-erros-http.md)** | Design System de Telas e Modais de Erros HTTP (401, 403, 404, 500) | **Aprovado** | 06/10/2026 | Experiência fluida de navegação e tratamento de exceção |

---

*Documentação mantida com rigor acadêmico para fins de registro técnico e comprovação de Atividades Curriculares Complementares (ACC).*
