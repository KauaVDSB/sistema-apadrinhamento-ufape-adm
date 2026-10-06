/**
 * ==============================================================================
 * SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
 * Arquivo: js/error-handler.js
 * Módulo: Design System de Telas e Modais de Erros HTTP (ADR-007)
 * Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
 * ==============================================================================
 */

export class HttpErrorHandler {
  constructor() {
    this.modalId = 'http-error-modal';
    this.ensureModalStructure();
  }

  /**
   * Garante que o contêiner do modal exista no DOM
   */
  ensureModalStructure() {
    if (document.getElementById(this.modalId)) return;

    const modalMarkup = `
      <div id="${this.modalId}" class="error-modal-overlay" role="alertdialog" aria-modal="true" aria-labelledby="error-modal-title" aria-describedby="error-modal-desc">
        <div class="error-modal-dialog">
          <div class="error-modal-header">
            <span id="error-modal-badge" class="error-status-badge">ERRO HTTP</span>
            <button id="error-modal-close-btn" class="error-modal-close" aria-label="Fechar modal de erro">✕</button>
          </div>

          <div class="error-modal-body">
            <div id="error-modal-icon" class="error-modal-icon-box">
              <!-- Ícone vetorial SVG injetado dinamicamente -->
            </div>
            <h3 id="error-modal-title" class="error-modal-title">Título do Erro</h3>
            <p id="error-modal-desc" class="error-modal-text">Descrição detalhada do erro e orientações institucionais.</p>

            <div id="error-modal-safe-banner" class="error-safe-badge" style="display: none;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Seus dados preenchidos foram preservados com segurança.</span>
            </div>
          </div>

          <div id="error-modal-actions" class="error-modal-footer">
            <!-- Botões de ação dinâmicos -->
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalMarkup);

    // Event listener para fechar no botão 'X' ou clique fora
    const overlay = document.getElementById(this.modalId);
    const closeBtn = document.getElementById('error-modal-close-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.hide();
      });
    }

    // Tecla ESC para fechar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        this.hide();
      }
    });
  }

  /**
   * Exibe o modal com a configuração do código HTTP
   * @param {number|string} status - 401, 403, 404, 500
   * @param {Object} custom - Opções customizadas de texto e callbacks
   */
  show(status, custom = {}) {
    this.ensureModalStructure();

    const overlay = document.getElementById(this.modalId);
    const badgeEl = document.getElementById('error-modal-badge');
    const titleEl = document.getElementById('error-modal-title');
    const descEl = document.getElementById('error-modal-desc');
    const iconEl = document.getElementById('error-modal-icon');
    const actionsEl = document.getElementById('error-modal-actions');
    const safeBanner = document.getElementById('error-modal-safe-banner');

    const config = this.getHttpErrorConfig(Number(status), custom);

    // Atualiza elementos
    badgeEl.textContent = config.badge;
    badgeEl.className = `error-status-badge badge-${config.theme}`;
    titleEl.textContent = config.title;
    descEl.innerHTML = config.message;
    iconEl.innerHTML = config.iconSvg;
    iconEl.className = `error-modal-icon-box theme-${config.theme}`;

    if (config.preserveData) {
      safeBanner.style.display = 'flex';
    } else {
      safeBanner.style.display = 'none';
    }

    // Renderiza botões de ação
    actionsEl.innerHTML = '';

    if (config.secondaryBtn) {
      const btnSec = document.createElement('button');
      btnSec.className = 'btn btn-outline btn-sm';
      btnSec.textContent = config.secondaryBtn.text;
      btnSec.addEventListener('click', () => {
        if (typeof config.secondaryBtn.action === 'function') {
          config.secondaryBtn.action();
        } else if (typeof config.secondaryBtn.action === 'string') {
          window.location.href = config.secondaryBtn.action;
        }
        this.hide();
      });
      actionsEl.appendChild(btnSec);
    }

    if (config.primaryBtn) {
      const btnPrim = document.createElement('button');
      btnPrim.className = 'btn btn-primary btn-sm';
      btnPrim.innerHTML = `<span>${config.primaryBtn.text}</span>`;
      btnPrim.addEventListener('click', () => {
        if (typeof config.primaryBtn.action === 'function') {
          config.primaryBtn.action();
        } else if (typeof config.primaryBtn.action === 'string') {
          window.location.href = config.primaryBtn.action;
        }
        this.hide();
      });
      actionsEl.appendChild(btnPrim);
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Oculta o modal
   */
  hide() {
    const overlay = document.getElementById(this.modalId);
    if (overlay) {
      overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  /**
   * Obtém os templates configurados por status HTTP
   */
  getHttpErrorConfig(status, custom) {
    switch (status) {
      case 401:
        return {
          theme: 'navy',
          badge: '401 • Autenticação Necessária',
          title: custom.title || 'Sessão Expirada ou Não Iniciada',
          message: custom.message || 'Para visualizar os dados dos seus afilhados e gerenciar seu perfil de mentor, faça login com seu e-mail institucional da UFAPE.',
          iconSvg: `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          `,
          preserveData: false,
          primaryBtn: custom.primaryBtn || {
            text: 'Fazer Login',
            action: () => {
              window.location.href = 'padrinho/index.html';
            }
          },
          secondaryBtn: custom.secondaryBtn || {
            text: 'Página Inicial',
            action: () => {
              window.location.href = 'index.html';
            }
          }
        };

      case 403:
        return {
          theme: 'gold',
          badge: '403 • Acesso Restrito (LGPD)',
          title: custom.title || 'Área Privada de Outro Mentor',
          message: custom.message || 'Por diretrizes de segurança da informação e conformidade com a <strong>LGPD</strong>, cada padrinho possui acesso exclusivo aos seus próprios afilhados. O recurso solicitado pertence a outro mentor ou requer privilégios de coordenação.',
          iconSvg: `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          `,
          preserveData: false,
          primaryBtn: custom.primaryBtn || {
            text: 'Voltar ao Meu Painel',
            action: () => {
              window.location.href = 'padrinho/index.html';
            }
          },
          secondaryBtn: custom.secondaryBtn || {
            text: 'Página Inicial',
            action: () => {
              window.location.href = 'index.html';
            }
          }
        };

      case 404:
        return {
          theme: 'slate',
          badge: '404 • Não Encontrado',
          title: custom.title || 'Recurso Não Localizado',
          message: custom.message || 'O mentor, calouro ou página que você tentou acessar não foi localizado em nossa base de dados.',
          iconSvg: `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          `,
          preserveData: false,
          primaryBtn: custom.primaryBtn || {
            text: 'Ver Mural de Padrinhos',
            action: () => {
              window.location.href = 'index.html#mural-padrinhos';
            }
          },
          secondaryBtn: custom.secondaryBtn || {
            text: 'Início',
            action: () => {
              window.location.href = 'index.html';
            }
          }
        };

      case 500:
      default:
        return {
          theme: 'coral',
          badge: '500 • Instabilidade no Servidor',
          title: custom.title || 'Falha de Comunicação Temporária',
          message: custom.message || 'Não foi possível concluir sua solicitação no momento devido a uma instabilidade momentânea na conexão. Não se preocupe: se você estava preenchendo um formulário, suas respostas estão preservadas.',
          iconSvg: `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          `,
          preserveData: custom.preserveData !== undefined ? custom.preserveData : true,
          primaryBtn: custom.primaryBtn || {
            text: 'Tentar Novamente',
            action: () => {
              if (typeof custom.onRetry === 'function') {
                custom.onRetry();
              } else {
                window.location.reload();
              }
            }
          },
          secondaryBtn: custom.secondaryBtn || {
            text: 'Fechar',
            action: () => this.hide()
          }
        };
    }
  }
}

// Instância singleton global para uso direto no frontend
export const httpErrorHandler = new HttpErrorHandler();

if (typeof window !== 'undefined') {
  window.httpErrorHandler = httpErrorHandler;
}
