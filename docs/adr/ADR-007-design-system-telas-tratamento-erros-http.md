# ADR-007: Design System de Telas e Modais de Erros HTTP (401, 403, 404, 500)

* **Status:** Aprovado
* **Data:** 06/10/2026
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

Com a separação entre rotas públicas (`/`), rotas autenticadas de veteranos (`/padrinho/`) e o painel de coordenação (`/admin/`), podem ocorrer tentativas de navegação indevidas:
* Padrinhos tentando acessar URLs diretamente sem estarem logados;
* Veteranos tentando manipular parâmetros para visualizar registros atribuídos a outro padrinho;
* Sessões expiradas durante a permanência no portal;
* Falhas temporárias de conexão com a API do Supabase.

A exibição de telas de erro padrão de servidores (páginas em branco, mensagens técnicas em inglês ou logs com stack traces) quebra a confiança do usuário, causa desorientação e compromete o profissionalismo exigido em um projeto institucional.

## 2. Decisão Arquitetural

Decidiu-se pela criação de um **Módulo Unificado de Tratamento Visual de Estados de Erro e Exceções HTTP**:

```
[ Requisição / Rota ]
         │
         ├── Erro 401 (Não Autenticado) ──> Modal/Tela com redirecionamento para Login
         ├── Erro 403 (Acesso Negado)   ──> Tela institucional de isolamento de perfil
         ├── Erro 404 (Não Encontrado)  ──> Página com navegação guiada de retorno
         └── Erro 500 (Instabilidade)   ──> Feedback amigável com ação de repetição
```

### Especificação dos Estados de Erro:
1. **HTTP 401 (Não Autenticado):**
   * *Diagnóstico:* Usuário tentando acessar `/padrinho/` sem token válido no `localStorage`.
   * *Ação:* Exibição de aviso acolhedor informando que a sessão não foi iniciada ou expirou, com formulário de login imediato.
2. **HTTP 403 (Acesso Proibido / Violação de RLS):**
   * *Diagnóstico:* Tentativa de acessar dados de outro padrinho ou rota administrativa com credencial comum.
   * *Ação:* Mensagem institucional destacando a governança e proteção de dados ("Este painel pertence a outro mentor ou requer privilégios de coordenação"), acompanhada de botão de retorno ao seu próprio painel.
3. **HTTP 404 (Página / Recurso Não Encontrado):**
   * *Diagnóstico:* URL digitada incorretamente.
   * *Ação:* Layout contextualizado mantendo cabeçalho e rodapé, com atalho para a página inicial.
4. **HTTP 500 (Falha de Comunicação / Banco):**
   * *Diagnóstico:* Falha transitória de rede ou rejeição de cota.
   * *Ação:* Alerta orientativo ("Não foi possível processar sua solicitação no momento"), preservando o estado do formulário para evitar que o calouro precise redigitar suas respostas.

## 3. Justificativas Técnicas & Acadêmicas

* **Experiência do Usuário (UX Humanizada):** Reduz o atrito de usabilidade e evita chamados de suporte decorrentes de dúvidas simples;
* **Segurança por Ocultação de Detalhes Internos:** Não expõe detalhes do schema do banco, nomes de colunas ou chaves de API nas mensagens de erro;
* **Identidade Visual Consistente:** Todas as telas de exceção utilizam a paleta aprovada da UFAPE (`#0E2A47`, `#1E4C7C`, `#C9A227`).

## 4. Consequências

* **Positivas:** Navegação fluida, tolerância a falhas e alto padrão de acabamento estético e funcional;
* **Mitigações:** Implementação de interceptador global de erros nas chamadas do cliente Supabase para captura centralizada de exceções.
