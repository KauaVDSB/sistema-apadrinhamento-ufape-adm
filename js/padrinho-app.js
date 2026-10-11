/**
 * ==============================================================================
 * SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
 * Arquivo: js/padrinho-app.js
 * Módulo: Lógica do Portal do Padrinho & Madrinha (UFAPE padrinhos)
 * Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
 * ==============================================================================
 */

// 1. Inicialização do Cliente Supabase
let supabase = null;
const SUPABASE_URL = window.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';

if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('[PadrinhoApp] Supabase não inicializado. Verifique js/env.js.');
}

// Estado Local
let currentSession = null;
let currentMentor = null;
let isUserAdmin = false;

// Elementos do DOM - Login
const loginSection = document.getElementById('padrinho-login-section');
const dashboardSection = document.getElementById('padrinho-dashboard-section');
const loginForm = document.getElementById('padrinho-login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginAlert = document.getElementById('login-alert');
const btnLoginSubmit = document.getElementById('btn-login-submit');

// Elementos do DOM - Dashboard
const mentorMonogram = document.getElementById('mentor-monogram');
const mentorNameEl = document.getElementById('mentor-name');
const mentorEmailEl = document.getElementById('mentor-email');
const mentorAdminBadge = document.getElementById('mentor-admin-badge');
const quotaHeadline = document.getElementById('quota-headline');
const quotaRemainingBadge = document.getElementById('quota-remaining-badge');
const quotaProgressBar = document.getElementById('quota-progress-bar');
const metricAfilhadosCount = document.getElementById('metric-afilhados-count');
const metricAfilhadosStatus = document.getElementById('metric-afilhados-status');
const metricVagasRestantes = document.getElementById('metric-vagas-restantes');
const metricOcupacao = document.getElementById('metric-ocupacao');
const afilhadosGrid = document.getElementById('afilhados-grid');
const afilhadosTableBody = document.getElementById('afilhados-table-body');
const btnRecarregar = document.getElementById('btn-recarregar-afilhados');
const btnLogout = document.getElementById('btn-logout');

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabBtnCoordenacao = document.getElementById('tab-btn-coordenacao');
const tabContentCards = document.getElementById('tab-content-cards');
const tabContentTabela = document.getElementById('tab-content-tabela');
const tabContentCoordenacao = document.getElementById('tab-content-coordenacao');

// Coordenação Geral (Heloísa / Admins)
const coordenacaoTableBody = document.getElementById('coordenacao-table-body');
const coordTotalOcupadas = document.getElementById('coord-total-ocupadas');
const coordTotalLivres = document.getElementById('coord-total-livres');

// Modal Alterar Senha
const modalAlterarSenha = document.getElementById('modal-alterar-senha');
const btnAbrirTrocaSenha = document.getElementById('btn-abrir-troca-senha');
const btnFecharModalSenha = document.getElementById('btn-fechar-modal-senha');
const btnCancelarModalSenha = document.getElementById('btn-cancelar-modal-senha');
const formAlterarSenha = document.getElementById('form-alterar-senha');
const novaSenhaInput = document.getElementById('nova-senha');
const confirmaNovaSenhaInput = document.getElementById('confirma-nova-senha');
const modalSenhaAlert = document.getElementById('modal-senha-alert');

// Modal Esqueci Senha
const modalEsqueciSenha = document.getElementById('modal-esqueci-senha');
const btnToggleEsqueci = document.getElementById('btn-toggle-esqueci');
const btnFecharModalEsqueci = document.getElementById('btn-fechar-modal-esqueci');
const btnCancelarModalEsqueci = document.getElementById('btn-cancelar-modal-esqueci');
const formEsqueciSenha = document.getElementById('form-esqueci-senha');
const esqueciEmailInput = document.getElementById('esqueci-email');
const modalEsqueciAlert = document.getElementById('modal-esqueci-alert');

/**
 * Inicialização ao carregar a página
 */
document.addEventListener('DOMContentLoaded', async () => {
  if (!supabase) {
    showAlert(loginAlert, 'Serviço de autenticação temporariamente indisponível. Recarregue a página.', 'danger');
    return;
  }

  // 1. Ouvir mudanças no estado de autenticação
  supabase.auth.onAuthStateChange(async (event, session) => {
    currentSession = session;
    if (session) {
      await carregarDadosMentor(session.user);
      if (event === 'PASSWORD_RECOVERY') {
        abrirModal(modalAlterarSenha);
        showAlert(modalSenhaAlert, 'Por favor, defina sua nova senha de acesso.', 'info');
      }
    } else {
      exibirTelaLogin();
    }
  });

  // 2. Verificar sessão existente
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      currentSession = session;
      await carregarDadosMentor(session.user);
    } else {
      exibirTelaLogin();
    }
  } catch (err) {
    console.warn('[PadrinhoApp] Erro ao verificar sessão inicial:', err);
    exibirTelaLogin();
  }

  // 3. Registrar eventos
  configurarEventos();
});

/**
 * Registra listeners de formulários, botões e tabs
 */
function configurarEventos() {
  // Login
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Logout
  if (btnLogout) {
    btnLogout.addEventListener('click', handleLogout);
  }

  // Segmented Tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      ativarTab(targetTab);
    });
  });

  // Recarregar afilhados
  if (btnRecarregar) {
    btnRecarregar.addEventListener('click', async () => {
      if (currentMentor) {
        btnRecarregar.disabled = true;
        btnRecarregar.classList.add('loading-spin');
        await carregarAfilhados(currentMentor.id);
        if (isUserAdmin) {
          await carregarVisaoGeralCoordenacao();
        }
        setTimeout(() => {
          btnRecarregar.disabled = false;
          btnRecarregar.classList.remove('loading-spin');
        }, 500);
      }
    });
  }

  // Modais - Alterar Senha
  if (btnAbrirTrocaSenha) {
    btnAbrirTrocaSenha.addEventListener('click', () => abrirModal(modalAlterarSenha));
  }
  if (btnFecharModalSenha) {
    btnFecharModalSenha.addEventListener('click', () => fecharModal(modalAlterarSenha));
  }
  if (btnCancelarModalSenha) {
    btnCancelarModalSenha.addEventListener('click', () => fecharModal(modalAlterarSenha));
  }
  if (formAlterarSenha) {
    formAlterarSenha.addEventListener('submit', handleAlterarSenha);
  }

  // Modais - Esqueci Senha
  if (btnToggleEsqueci) {
    btnToggleEsqueci.addEventListener('click', () => abrirModal(modalEsqueciSenha));
  }
  if (btnFecharModalEsqueci) {
    btnFecharModalEsqueci.addEventListener('click', () => fecharModal(modalEsqueciSenha));
  }
  if (btnCancelarModalEsqueci) {
    btnCancelarModalEsqueci.addEventListener('click', () => fecharModal(modalEsqueciSenha));
  }
  if (formEsqueciSenha) {
    formEsqueciSenha.addEventListener('submit', handleEsqueciSenha);
  }

  // Fechar modais ao clicar no backdrop ou pressionar ESC
  [modalAlterarSenha, modalEsqueciSenha].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal(modal);
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fecharModal(modalAlterarSenha);
      fecharModal(modalEsqueciSenha);
    }
  });
}

/**
 * Ativa aba do segmented control
 */
function ativarTab(tabName) {
  tabBtns.forEach(b => {
    const isTarget = b.getAttribute('data-tab') === tabName;
    b.classList.toggle('active', isTarget);
    b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  if (tabContentCards) tabContentCards.style.display = tabName === 'cards' ? 'block' : 'none';
  if (tabContentTabela) tabContentTabela.style.display = tabName === 'tabela' ? 'block' : 'none';
  if (tabContentCoordenacao) tabContentCoordenacao.style.display = tabName === 'coordenacao' ? 'block' : 'none';
}

/**
 * Fluxo de Login
 */
async function handleLogin(e) {
  if (e && e.preventDefault) e.preventDefault();
  esconderAlert(loginAlert);

  const email = (loginEmailInput.value || '').trim().toLowerCase();
  const password = loginPasswordInput.value || '';

  if (!email || !password) {
    showAlert(loginAlert, 'Por favor, informe seu e-mail institucional e senha.', 'warning');
    return false;
  }

  btnLoginSubmit.disabled = true;
  btnLoginSubmit.classList.add('btn-loading');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.warn('[PadrinhoApp] Erro de autenticação:', error);
      if (error.message.includes('Invalid login credentials')) {
        showAlert(loginAlert, 'E-mail ou senha incorretos. Verifique os dados recebidos da coordenação.', 'danger');
      } else {
        showAlert(loginAlert, `Falha no acesso: ${error.message}`, 'danger');
      }
      return false;
    }

    if (data && data.user) {
      await carregarDadosMentor(data.user);
    }
  } catch (err) {
    console.error('[PadrinhoApp] Erro inesperado no login:', err);
    showAlert(loginAlert, 'Erro de conexão com o servidor. Verifique sua rede e tente novamente.', 'danger');
  } finally {
    btnLoginSubmit.disabled = false;
    btnLoginSubmit.classList.remove('btn-loading');
  }

  return false;
}

/**
 * Fluxo de Logout
 */
async function handleLogout() {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('[PadrinhoApp] Erro ao encerrar sessão:', err);
  }
  currentSession = null;
  currentMentor = null;
  isUserAdmin = false;
  exibirTelaLogin();
}

/**
 * Carrega perfil do mentor autenticado e seus respectivos afilhados
 */
async function carregarDadosMentor(user) {
  try {
    // 1. Buscar registro do mentor em public.padrinhos
    let { data: mentor, error } = await supabase
      .from('padrinhos')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    // Fallback: busca pelo e-mail institucional se user_id ainda não estiver populado
    if (!mentor && user.email) {
      const { data: mentorFallback } = await supabase
        .from('padrinhos')
        .select('*')
        .eq('email_institucional', user.email)
        .maybeSingle();
      mentor = mentorFallback;
    }

    if (!mentor) {
      showAlert(loginAlert, 'Usuário autenticado, mas nenhum perfil de mentor vinculado a este e-mail.', 'warning');
      await handleLogout();
      return;
    }

    currentMentor = mentor;

    // 2. Verificar se possui role de admin / coordenador
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    isUserAdmin = roleData && (roleData.role === 'admin' || roleData.role === 'coordenador');

    // 3. Renderizar Header do Mentor
    const cotaMentor = mentor.limite_vagas || 4;
    if (mentorMonogram) mentorMonogram.textContent = mentor.iniciais || 'HB';
    if (mentorNameEl) mentorNameEl.textContent = mentor.nome;
    if (mentorEmailEl) mentorEmailEl.textContent = mentor.email_institucional;
    if (mentorAdminBadge) {
      mentorAdminBadge.style.display = isUserAdmin ? 'inline-flex' : 'none';
    }

    const mentorBadgePeriodo = document.getElementById('mentor-badge-periodo');
    if (mentorBadgePeriodo) {
      mentorBadgePeriodo.textContent = `${cotaMentor} Vagas de Acolhimento`;
    }
    const metricCotaTotal = document.getElementById('metric-cota-total');
    if (metricCotaTotal) {
      metricCotaTotal.textContent = `${cotaMentor} Vagas`;
    }
    const tabCardsLabel = document.getElementById('tab-cards-label');
    if (tabCardsLabel) {
      tabCardsLabel.textContent = `${cotaMentor} Slots de Acolhimento`;
    }
    const tabBadgeCards = document.getElementById('tab-badge-cards');
    if (tabBadgeCards) {
      tabBadgeCards.textContent = String(cotaMentor);
    }

    // 4. Mostrar aba de coordenação se for admin
    if (tabBtnCoordenacao) {
      tabBtnCoordenacao.style.display = isUserAdmin ? 'inline-flex' : 'none';
    }

    // 5. Alternar telas
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';

    // 6. Carregar lista de afilhados e slots do mentor
    await carregarAfilhados(mentor.id);

    // 7. Se for coordenador/admin, carregar a visão geral dos 10 padrinhos
    if (isUserAdmin) {
      await carregarVisaoGeralCoordenacao();
    }

    // Garante que aba de cards seja a ativa
    ativarTab('cards');

  } catch (err) {
    console.error('[PadrinhoApp] Erro ao carregar perfil do mentor:', err);
    showAlert(loginAlert, 'Não foi possível carregar os dados do mentor. Tente novamente.', 'danger');
  }
}

/**
 * Carrega e renderiza os calouros vinculados ao mentor (SEMPRE exibe os 4 slots!)
 */
async function carregarAfilhados(padrinhoId) {
  try {
    const { data: afilhados, error } = await supabase
      .from('apadrinhamentos')
      .select('id, calouro_nome, calouro_whatsapp, calouro_instagram, canal_preferido, respostas, permutou, criado_em, trocado_em')
      .eq('padrinho_id', padrinhoId)
      .order('criado_em', { ascending: true });

    if (error) {
      console.error('[PadrinhoApp] Erro ao buscar afilhados:', error);
      return;
    }

    const lista = afilhados || [];
    const total = lista.length;
    const limite = currentMentor.limite_vagas || 4;
    const vagasRestantes = Math.max(0, limite - total);
    const porcentagem = Math.min(100, Math.round((total / limite) * 100));

    // Atualiza Card de Cota e Métricas
    if (quotaHeadline) quotaHeadline.textContent = `${total} de ${limite} afilhados vinculados`;
    if (quotaRemainingBadge) {
      quotaRemainingBadge.textContent = `${vagasRestantes} vaga${vagasRestantes !== 1 ? 's' : ''} restante${vagasRestantes !== 1 ? 's' : ''}`;
    }
    if (quotaProgressBar) quotaProgressBar.style.width = `${porcentagem}%`;

    // Atualiza Métricas Rápidas
    if (metricAfilhadosCount) metricAfilhadosCount.textContent = String(total);
    if (metricVagasRestantes) metricVagasRestantes.textContent = `${vagasRestantes} vaga${vagasRestantes !== 1 ? 's' : ''}`;
    if (metricOcupacao) metricOcupacao.textContent = `${porcentagem}%`;

    if (metricAfilhadosStatus) {
      if (total === 0) {
        metricAfilhadosStatus.textContent = 'Aguardando escolhas no mural';
        metricAfilhadosStatus.className = 'metric-hint text-warning';
      } else if (total < limite) {
        metricAfilhadosStatus.textContent = `${total} vinculado(s)`;
        metricAfilhadosStatus.className = 'metric-hint text-success';
      } else {
        metricAfilhadosStatus.textContent = 'Cota 100% preenchida!';
        metricAfilhadosStatus.className = 'metric-hint text-success';
      }
    }

    // RENDERIZAÇÃO DOS 4 SLOTS (CARDS E TABELA)
    renderizarSlotsCardsETabela(lista, limite);

  } catch (err) {
    console.error('[PadrinhoApp] Falha na consulta de afilhados:', err);
  }
}

/**
 * Renderiza simultaneamente os 4 Cards de Vagas e as 4 Linhas da Tabela
 * Design dos cards totalmente diferenciado, limpo e moderno.
 */
function renderizarSlotsCardsETabela(afilhados, limite = 4) {
  if (!afilhadosGrid || !afilhadosTableBody) return;

  afilhadosGrid.innerHTML = '';
  afilhadosTableBody.innerHTML = '';

  for (let i = 0; i < limite; i++) {
    const slotNumero = i + 1;
    const afilhado = afilhados[i];

    if (afilhado) {
      // -------------------------------------------------------------
      // SLOT PREENCHIDO (CARD MODERNO + LINHA DA TABELA)
      // -------------------------------------------------------------
      const dataIso = afilhado.trocado_em || afilhado.criado_em;
      let dataFormatada = 'Recente';
      if (dataIso) {
        const d = new Date(dataIso);
        dataFormatada = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      }

      // Extrair iniciais do calouro
      const nomesPartes = (afilhado.calouro_nome || 'Calouro').trim().split(/\s+/);
      const calouroIniciais = nomesPartes.length >= 2 
        ? `${nomesPartes[0][0]}${nomesPartes[nomesPartes.length - 1][0]}`.toUpperCase()
        : (nomesPartes[0][0] || 'C').toUpperCase();

      const rawWhats = (afilhado.calouro_whatsapp || '').replace(/\D/g, '');
      let whatsLink = '#';
      let whatsDisplay = afilhado.calouro_whatsapp || 'Não informado';
      if (rawWhats.length >= 10) {
        const ddiWhats = rawWhats.startsWith('55') ? rawWhats : `55${rawWhats}`;
        const primeiroNomeCalouro = nomesPartes[0];
        const mensagemBoasVindas = encodeURIComponent(
          `Olá, ${primeiroNomeCalouro}! Sou ${currentMentor.nome}, seu padrinho/madrinha no curso de Administração da UFAPE. Vi que você me escolheu e vim te dar as boas-vindas ao nosso curso e à nossa universidade!`
        );
        whatsLink = `https://wa.me/${ddiWhats}?text=${mensagemBoasVindas}`;
      }

      const rawInsta = (afilhado.calouro_instagram || '').replace(/[@\s]/g, '');
      const instaLink = rawInsta ? `https://instagram.com/${rawInsta}` : '#';
      const instaDisplay = rawInsta ? `@${rawInsta}` : 'Não informado';

      let canalTexto = 'Tanto faz';
      let canalBadgeClass = 'badge-muted';
      if (afilhado.canal_preferido === 'whatsapp') {
        canalTexto = 'Prefere WhatsApp';
        canalBadgeClass = 'badge-whatsapp';
      } else if (afilhado.canal_preferido === 'instagram') {
        canalTexto = 'Prefere Instagram';
        canalBadgeClass = 'badge-instagram';
      }

      const storageKey = `contato_padrinho_${currentMentor.id}_${afilhado.id}`;
      const jaContatou = localStorage.getItem(storageKey) === 'true';

      const respostas = afilhado.respostas || {};
      const choqueMateria = respostas.materia_temida || respostas.choque_realidade || 'Adaptação geral';
      const perfilResumo = respostas.perfil_estudo || respostas.expectativa || 'Início das aulas';

      // 1. Inserir Card Diferenciado do Slot Preenchido
      const card = document.createElement('div');
      card.className = `modern-slot-card slot-card-filled ${jaContatou ? 'card-contatado-glow' : ''}`;
      card.innerHTML = `
        <div class="slot-card-top-bar">
          <div class="slot-indicator-group">
            <span class="slot-index-pill">Slot #${slotNumero}</span>
            <span class="badge badge-success">● Confirmado</span>
          </div>
          <span class="slot-timestamp">${dataFormatada}</span>
        </div>

        <div class="slot-student-profile">
          <div class="student-avatar-circle">${calouroIniciais}</div>
          <div class="student-profile-info">
            <h3 class="student-name">${escapeHtml(afilhado.calouro_nome)}</h3>
            <div class="student-chips-row">
              <span class="badge ${canalBadgeClass}">${canalTexto}</span>
              ${afilhado.permutou ? '<span class="badge badge-permuta">🔄 Permuta</span>' : ''}
            </div>
          </div>
        </div>

        <!-- Dock de Contatos com Ação 1-Clique -->
        <div class="slot-contact-dock">
          ${rawWhats.length >= 10 ? `
            <a href="${whatsLink}" target="_blank" rel="noopener noreferrer" class="btn-dock-whatsapp" title="Iniciar conversa no WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          ` : `<span class="dock-empty-contact">WhatsApp: ${escapeHtml(whatsDisplay)}</span>`}

          ${rawInsta ? `
            <a href="${instaLink}" target="_blank" rel="noopener noreferrer" class="btn-dock-instagram" title="Abrir perfil no Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>${escapeHtml(instaDisplay)}</span>
            </a>
          ` : ''}
        </div>

        <!-- Micro-Chips de Afinidade do Quiz -->
        <div class="slot-affinity-chips">
          <div class="affinity-chip">
            <span class="chip-label">Receio:</span>
            <span class="chip-val">${escapeHtml(choqueMateria)}</span>
          </div>
          <div class="affinity-chip">
            <span class="chip-label">Perfil:</span>
            <span class="chip-val">${escapeHtml(perfilResumo)}</span>
          </div>
        </div>

        <!-- Checklist de Acolhimento -->
        <div class="slot-card-bottom-action">
          <label class="modern-checklist-toggle">
            <input type="checkbox" class="checklist-toggle-input" data-key="${storageKey}" ${jaContatou ? 'checked' : ''}>
            <span class="toggle-switch-visual"></span>
            <span class="toggle-text">Primeiro contato realizado</span>
          </label>
        </div>
      `;

      // Listener para o checkbox de contato
      const checkbox = card.querySelector('.checklist-toggle-input');
      checkbox.addEventListener('change', (e) => {
        localStorage.setItem(storageKey, e.target.checked ? 'true' : 'false');
        card.classList.toggle('card-contatado-glow', e.target.checked);
        const statusTbEl = document.getElementById(`tb-status-${afilhado.id}`);
        if (statusTbEl) {
          statusTbEl.textContent = e.target.checked ? 'Contatado' : 'Pendente';
          statusTbEl.className = e.target.checked ? 'badge badge-success' : 'badge badge-warning';
        }
      });

      afilhadosGrid.appendChild(card);

      // 2. Inserir Linha da Tabela
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="text-navy">#${slotNumero}</strong></td>
        <td><span class="badge badge-success">● Confirmado</span></td>
        <td>
          <div class="tb-student-name">${escapeHtml(afilhado.calouro_nome)}</div>
          <div class="tb-student-meta">${dataFormatada}</div>
        </td>
        <td><span class="badge ${canalBadgeClass}">${canalTexto}</span></td>
        <td>
          <div class="tb-actions-row">
            ${rawWhats.length >= 10 ? `
              <a href="${whatsLink}" target="_blank" rel="noopener noreferrer" class="btn-tb-action btn-tb-wa" title="WhatsApp">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            ` : '—'}
            ${rawInsta ? `
              <a href="${instaLink}" target="_blank" rel="noopener noreferrer" class="btn-tb-action btn-tb-ig" title="Instagram">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                </svg>
                <span>Insta</span>
              </a>
            ` : ''}
          </div>
        </td>
        <td style="text-align: center;">
          <span id="tb-status-${afilhado.id}" class="badge ${jaContatou ? 'badge-success' : 'badge-warning'}">
            ${jaContatou ? 'Contatado' : 'Pendente'}
          </span>
        </td>
      `;
      afilhadosTableBody.appendChild(tr);

    } else {
      // -------------------------------------------------------------
      // SLOT EM ABERTO (CARD VAGO MODERNO + LINHA DA TABELA)
      // -------------------------------------------------------------
      const openCard = document.createElement('div');
      openCard.className = 'modern-slot-card slot-card-open';
      openCard.innerHTML = `
        <div class="slot-card-top-bar">
          <span class="slot-index-pill">Slot #${slotNumero}</span>
          <span class="badge badge-accent">○ Vaga em Aberto</span>
        </div>

        <div class="slot-open-visual-center">
          <div class="slot-open-ring-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </div>
          <h4 class="slot-open-heading">Disponível no Mural</h4>
          <p class="slot-open-text">
            Aguardando seleção por um calouro de Administração no formulário oficial do site.
          </p>
        </div>

        <div class="slot-open-action-footer">
          <a href="index.html#mural-padrinhos" target="_blank" class="btn btn-outline btn-xs btn-open-link">
            <span>Ver no Mural Público</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      `;
      afilhadosGrid.appendChild(openCard);

      // Linha da Tabela Aberta
      const openTr = document.createElement('tr');
      openTr.className = 'tb-row-open';
      openTr.innerHTML = `
        <td><strong class="text-muted">#${slotNumero}</strong></td>
        <td><span class="badge badge-accent">○ Em Aberto</span></td>
        <td><span class="text-muted" style="font-style: italic;">Disponível no formulário público</span></td>
        <td><span class="text-light">—</span></td>
        <td><span class="text-light">Aguardando calouro</span></td>
        <td style="text-align: center;"><span class="badge badge-muted">Pendente</span></td>
      `;
      afilhadosTableBody.appendChild(openTr);
    }
  }
}

/**
 * Carrega a visão geral da Coordenação (10 Mentores • 40 Vagas)
 * Garante layout auto e colunas fluidas para NÃO quebrar a página!
 */
async function carregarVisaoGeralCoordenacao() {
  if (!coordenacaoTableBody) return;

  try {
    // 1. Buscar todos os padrinhos cadastrados
    const { data: padrinhos, error: errPad } = await supabase
      .from('padrinhos')
      .select('id, nome, email_institucional, limite_vagas, ordem_exibicao')
      .order('ordem_exibicao', { ascending: true });

    if (errPad || !padrinhos) {
      console.warn('[PadrinhoApp] Erro ao carregar padrinhos da coordenação:', errPad);
      return;
    }

    // 2. Buscar contagem de apadrinhamentos por padrinho
    const { data: allApadrinhamentos, error: errApad } = await supabase
      .from('apadrinhamentos')
      .select('padrinho_id');

    const counts = {};
    (allApadrinhamentos || []).forEach(row => {
      counts[row.padrinho_id] = (counts[row.padrinho_id] || 0) + 1;
    });

    let totalGeralOcupadas = 0;
    const totalGeralVagas = padrinhos.reduce((acc, p) => acc + (p.limite_vagas || 4), 0);

    coordenacaoTableBody.innerHTML = '';

    padrinhos.forEach((p, idx) => {
      const cota = p.limite_vagas || 4;
      const ocupadas = counts[p.id] || 0;
      const livres = Math.max(0, cota - ocupadas);
      totalGeralOcupadas += ocupadas;
      const pct = Math.round((ocupadas / cota) * 100);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
        <td><strong class="text-navy">${escapeHtml(p.nome)}</strong></td>
        <td><span class="tb-email-truncate">${escapeHtml(p.email_institucional)}</span></td>
        <td style="text-align: center; font-weight: 700;">${cota}</td>
        <td style="text-align: center;"><span class="badge ${ocupadas > 0 ? 'badge-success' : 'badge-muted'}">${ocupadas}</span></td>
        <td style="text-align: center;"><span class="badge ${livres > 0 ? 'badge-accent' : 'badge-danger'}">${livres}</span></td>
        <td style="text-align: center;">
          <span class="badge ${ocupadas === cota ? 'badge-success' : (ocupadas > 0 ? 'badge-warning' : 'badge-muted')}">
            ${pct}%
          </span>
        </td>
      `;
      coordenacaoTableBody.appendChild(tr);
    });

    const totalGeralLivres = Math.max(0, totalGeralVagas - totalGeralOcupadas);
    if (coordTotalOcupadas) coordTotalOcupadas.textContent = String(totalGeralOcupadas);
    if (coordTotalLivres) coordTotalLivres.textContent = String(totalGeralLivres);

  } catch (err) {
    console.error('[PadrinhoApp] Erro na coordenação:', err);
  }
}

/**
 * Alteração de Senha
 */
async function handleAlterarSenha(e) {
  if (e && e.preventDefault) e.preventDefault();
  esconderAlert(modalSenhaAlert);

  const novaSenha = novaSenhaInput.value;
  const confirmaSenha = confirmaNovaSenhaInput.value;

  if (!novaSenha || novaSenha.length < 6) {
    showAlert(modalSenhaAlert, 'A nova senha deve ter no mínimo 6 caracteres.', 'warning');
    return false;
  }

  if (novaSenha !== confirmaSenha) {
    showAlert(modalSenhaAlert, 'As senhas informadas não coincidem. Digite novamente.', 'danger');
    return false;
  }

  try {
    const { error } = await supabase.auth.updateUser({ password: novaSenha });

    if (error) {
      showAlert(modalSenhaAlert, `Erro ao atualizar senha: ${error.message}`, 'danger');
      return false;
    }

    showAlert(modalSenhaAlert, 'Senha atualizada com sucesso! Você já pode utilizá-la em seus próximos acessos.', 'success');
    novaSenhaInput.value = '';
    confirmaNovaSenhaInput.value = '';

    setTimeout(() => {
      fecharModal(modalAlterarSenha);
      esconderAlert(modalSenhaAlert);
    }, 2000);

  } catch (err) {
    console.error('[PadrinhoApp] Erro ao alterar senha:', err);
    showAlert(modalSenhaAlert, 'Falha ao atualizar a senha. Tente novamente.', 'danger');
  }

  return false;
}

/**
 * Esqueci Minha Senha
 */
async function handleEsqueciSenha(e) {
  if (e && e.preventDefault) e.preventDefault();
  esconderAlert(modalEsqueciAlert);

  const email = esqueciEmailInput.value.trim().toLowerCase();
  if (!email) {
    showAlert(modalEsqueciAlert, 'Por favor, informe seu e-mail institucional.', 'warning');
    return false;
  }

  try {
    const redirectUrl = window.location.origin + window.location.pathname;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });

    if (error) {
      showAlert(modalEsqueciAlert, `Erro: ${error.message}`, 'danger');
      return false;
    }

    showAlert(modalEsqueciAlert, 'Link de redefinição enviado com sucesso para o seu e-mail institucional!', 'success');
    esqueciEmailInput.value = '';

  } catch (err) {
    console.error('[PadrinhoApp] Erro ao enviar recuperação:', err);
    showAlert(modalEsqueciAlert, 'Falha ao processar solicitação. Tente novamente.', 'danger');
  }

  return false;
}

/**
 * Utilitários de Interface
 */
function exibirTelaLogin() {
  if (loginSection) loginSection.style.display = 'block';
  if (dashboardSection) dashboardSection.style.display = 'none';
  if (loginPasswordInput) loginPasswordInput.value = '';
}

function abrirModal(modal) {
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 80);
    }
  }
}

function fecharModal(modal) {
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function showAlert(el, msg, type = 'info') {
  if (!el) return;
  el.className = `portal-alert portal-alert-${type}`;
  el.textContent = msg;
  el.style.display = 'block';
}

function esconderAlert(el) {
  if (!el) return;
  el.style.display = 'none';
  el.textContent = '';
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
