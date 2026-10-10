/**
 * ==============================================================================
 * SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
 * Arquivo: js/padrinho-app.js
 * Módulo: Lógica do Portal do Padrinho & Madrinha (Autenticação, Gestão e Contatos)
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

// Elementos do DOM
const loginSection = document.getElementById('padrinho-login-section');
const dashboardSection = document.getElementById('padrinho-dashboard-section');
const loginForm = document.getElementById('padrinho-login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginAlert = document.getElementById('login-alert');
const btnLoginSubmit = document.getElementById('btn-login-submit');

// Dashboard Elements
const mentorMonogram = document.getElementById('mentor-monogram');
const mentorNameEl = document.getElementById('mentor-name');
const mentorEmailEl = document.getElementById('mentor-email');
const mentorAdminBadge = document.getElementById('mentor-admin-badge');
const quotaHeadline = document.getElementById('quota-headline');
const quotaRemainingBadge = document.getElementById('quota-remaining-badge');
const quotaProgressBar = document.getElementById('quota-progress-bar');
const quotaEncouragement = document.getElementById('quota-encouragement');
const afilhadosEmptyState = document.getElementById('afilhados-empty-state');
const afilhadosGrid = document.getElementById('afilhados-grid');
const btnRecarregar = document.getElementById('btn-recarregar-afilhados');
const btnLogout = document.getElementById('btn-logout');

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
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    currentSession = session;
    await carregarDadosMentor(session.user);
  } else {
    exibirTelaLogin();
  }

  // 3. Registrar eventos
  configurarEventos();
});

/**
 * Registra listeners de formulários e botões
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

  // Recarregar afilhados
  if (btnRecarregar) {
    btnRecarregar.addEventListener('click', async () => {
      if (currentMentor) {
        btnRecarregar.disabled = true;
        btnRecarregar.classList.add('loading-spin');
        await carregarAfilhados(currentMentor.id);
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

  // Fechar modais ao clicar no backdrop
  [modalAlterarSenha, modalEsqueciSenha].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal(modal);
      });
    }
  });
}

/**
 * Fluxo de Login
 */
async function handleLogin(e) {
  e.preventDefault();
  esconderAlert(loginAlert);

  const email = loginEmailInput.value.trim().toLowerCase();
  const password = loginPasswordInput.value;

  if (!email || !password) {
    showAlert(loginAlert, 'Por favor, informe seu e-mail institucional e senha.', 'warning');
    return;
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
      return;
    }

    // Sucesso - o listener onAuthStateChange cuidará de carregar a tela
  } catch (err) {
    console.error('[PadrinhoApp] Erro inesperado no login:', err);
    showAlert(loginAlert, 'Erro de conexão com o servidor. Tente novamente.', 'danger');
  } finally {
    btnLoginSubmit.disabled = false;
    btnLoginSubmit.classList.remove('btn-loading');
  }
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
      .single();

    // Fallback: se user_id ainda não estiver populado, busca pelo e-mail institucional
    if (!mentor && user.email) {
      const { data: mentorFallback } = await supabase
        .from('padrinhos')
        .select('*')
        .eq('email_institucional', user.email)
        .single();
      mentor = mentorFallback;
    }

    if (!mentor) {
      showAlert(loginAlert, 'Usuário autenticado, mas nenhum perfil de mentor vinculado a este e-mail.', 'warning');
      await handleLogout();
      return;
    }

    currentMentor = mentor;

    // 2. Verificar se possui role de admin
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    const isAdmin = roleData && (roleData.role === 'admin' || roleData.role === 'coordenador');

    // 3. Renderizar Header do Mentor
    mentorMonogram.textContent = mentor.iniciais || 'MT';
    mentorNameEl.textContent = mentor.nome;
    mentorEmailEl.textContent = mentor.email_institucional;
    if (mentorAdminBadge) {
      mentorAdminBadge.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    // 4. Alternar telas
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';

    // 5. Carregar lista de afilhados
    await carregarAfilhados(mentor.id);

  } catch (err) {
    console.error('[PadrinhoApp] Erro ao carregar perfil do mentor:', err);
    showAlert(loginAlert, 'Não foi possível carregar os dados do mentor. Tente novamente.', 'danger');
  }
}

/**
 * Carrega e renderiza os calouros vinculados ao mentor
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

    const total = (afilhados || []).length;
    const limite = currentMentor.limite_vagas || 4;
    const vagasRestantes = Math.max(0, limite - total);
    const porcentagem = Math.min(100, Math.round((total / limite) * 100));

    // Atualiza Card de Cota
    quotaHeadline.textContent = `${total} de ${limite} afilhados vinculados`;
    quotaRemainingBadge.textContent = `${vagasRestantes} vaga${vagasRestantes !== 1 ? 's' : ''} restante${vagasRestantes !== 1 ? 's' : ''}`;
    quotaProgressBar.style.width = `${porcentagem}%`;

    if (total === 0) {
      quotaEncouragement.textContent = 'Os calouros estão conhecendo os perfis no sistema e em breve farão a escolha de mentores.';
      afilhadosEmptyState.style.display = 'block';
      afilhadosGrid.innerHTML = '';
    } else if (total < limite) {
      quotaEncouragement.textContent = `Você já possui ${total} afilhado(s)! Aproveite para fazer o primeiro contato via WhatsApp.`;
      afilhadosEmptyState.style.display = 'none';
      renderizarCardsAfilhados(afilhados);
    } else {
      quotaEncouragement.textContent = '🎉 Parabéns! Sua cota máxima de 4 vagas está 100% preenchida para o acolhimento deste período!';
      afilhadosEmptyState.style.display = 'none';
      renderizarCardsAfilhados(afilhados);
    }

  } catch (err) {
    console.error('[PadrinhoApp] Falha na consulta de afilhados:', err);
  }
}

/**
 * Renderiza os cards de cada calouro apadrinhado
 */
function renderizarCardsAfilhados(afilhados) {
  afilhadosGrid.innerHTML = '';

  afilhados.forEach((afilhado, index) => {
    const card = document.createElement('div');
    card.className = 'afilhado-card';

    // Formatação de data
    const dataIso = afilhado.trocado_em || afilhado.criado_em;
    let dataFormatada = 'Data recente';
    if (dataIso) {
      const d = new Date(dataIso);
      dataFormatada = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    }

    // Limpeza e link WhatsApp
    const rawWhats = (afilhado.calouro_whatsapp || '').replace(/\D/g, '');
    let whatsLink = '#';
    let whatsDisplay = afilhado.calouro_whatsapp || 'Não informado';
    if (rawWhats.length >= 10) {
      const ddiWhats = rawWhats.startsWith('55') ? rawWhats : `55${rawWhats}`;
      const primeiroNomeCalouro = afilhado.calouro_nome.split(' ')[0];
      const mensagemBoasVindas = encodeURIComponent(
        `Olá, ${primeiroNomeCalouro}! Sou ${currentMentor.nome}, seu padrinho/madrinha no curso de Administração da UFAPE. Vi que você me escolheu e vim te dar as boas-vindas ao nosso curso e à nossa universidade!`
      );
      whatsLink = `https://wa.me/${ddiWhats}?text=${mensagemBoasVindas}`;
    }

    // Instagram
    const rawInsta = (afilhado.calouro_instagram || '').replace(/[@\s]/g, '');
    const instaLink = rawInsta ? `https://instagram.com/${rawInsta}` : '#';
    const instaDisplay = rawInsta ? `@${rawInsta}` : 'Não informado';

    // Canal preferido
    let canalTexto = 'Tanto faz';
    let canalBadgeClass = 'badge-muted';
    if (afilhado.canal_preferido === 'whatsapp') {
      canalTexto = 'Prefere WhatsApp';
      canalBadgeClass = 'badge-whatsapp';
    } else if (afilhado.canal_preferido === 'instagram') {
      canalTexto = 'Prefere Instagram';
      canalBadgeClass = 'badge-instagram';
    }

    // Status de contato salvo no localStorage
    const storageKey = `contato_padrinho_${currentMentor.id}_${afilhado.id}`;
    const jaContatou = localStorage.getItem(storageKey) === 'true';

    // Extrair dados do questionário
    const respostas = afilhado.respostas || {};
    const choqueMateria = respostas.materia_temida || respostas.choque_realidade || 'Adaptação geral ao curso';
    const perfilResumo = respostas.perfil_estudo || respostas.expectativa || 'Animado(a) com o início das aulas';

    card.innerHTML = `
      <div class="afilhado-card-top">
        <div class="afilhado-header-info">
          <span class="afilhado-numero">Afilhado #${index + 1}</span>
          <h3 class="afilhado-nome">${escapeHtml(afilhado.calouro_nome)}</h3>
          <div class="afilhado-meta-row">
            <span class="afilhado-data">${dataFormatada}</span>
            ${afilhado.permutou ? '<span class="badge badge-permuta">🔄 Permuta</span>' : ''}
            <span class="badge ${canalBadgeClass}">${canalTexto}</span>
          </div>
        </div>
      </div>

      <!-- Ações de Contato -->
      <div class="afilhado-contatos-box">
        <div class="contato-row">
          <span class="contato-label">WhatsApp:</span>
          ${rawWhats.length >= 10 ? `
            <a href="${whatsLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-action" title="Iniciar conversa no WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
              </svg>
              <span>${escapeHtml(whatsDisplay)}</span>
            </a>
          ` : `<span class="contato-valor">${escapeHtml(whatsDisplay)}</span>`}
        </div>

        <div class="contato-row">
          <span class="contato-label">Instagram:</span>
          ${rawInsta ? `
            <a href="${instaLink}" target="_blank" rel="noopener noreferrer" class="btn-instagram-action" title="Abrir perfil no Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>${escapeHtml(instaDisplay)}</span>
            </a>
          ` : `<span class="contato-valor">${escapeHtml(instaDisplay)}</span>`}
        </div>
      </div>

      <!-- Respostas do Formulário -->
      <div class="afilhado-respostas-box">
        <div class="resposta-item">
          <span class="resposta-rotulo">Maior choque ou receio:</span>
          <span class="resposta-valor">${escapeHtml(choqueMateria)}</span>
        </div>
        <div class="resposta-item">
          <span class="resposta-rotulo">Expectativa / Perfil:</span>
          <span class="resposta-valor">${escapeHtml(perfilResumo)}</span>
        </div>
      </div>

      <!-- Checklist de Primeiro Contato -->
      <div class="afilhado-checklist-box">
        <label class="checklist-label">
          <input type="checkbox" class="checklist-checkbox" data-key="${storageKey}" ${jaContatou ? 'checked' : ''}>
          <span>Primeiro contato realizado</span>
        </label>
      </div>
    `;

    // Listener para o checkbox de contato
    const checkbox = card.querySelector('.checklist-checkbox');
    checkbox.addEventListener('change', (e) => {
      localStorage.setItem(storageKey, e.target.checked ? 'true' : 'false');
      if (e.target.checked) {
        card.classList.add('afilhado-card-contatado');
      } else {
        card.classList.remove('afilhado-card-contatado');
      }
    });

    if (jaContatou) {
      card.classList.add('afilhado-card-contatado');
    }

    afilhadosGrid.appendChild(card);
  });
}

/**
 * Alteração de Senha
 */
async function handleAlterarSenha(e) {
  e.preventDefault();
  esconderAlert(modalSenhaAlert);

  const novaSenha = novaSenhaInput.value;
  const confirmaSenha = confirmaNovaSenhaInput.value;

  if (!novaSenha || novaSenha.length < 6) {
    showAlert(modalSenhaAlert, 'A nova senha deve ter no mínimo 6 caracteres.', 'warning');
    return;
  }

  if (novaSenha !== confirmaSenha) {
    showAlert(modalSenhaAlert, 'As senhas informadas não coincidem. Digite novamente.', 'danger');
    return;
  }

  try {
    const { error } = await supabase.auth.updateUser({ password: novaSenha });

    if (error) {
      showAlert(modalSenhaAlert, `Erro ao atualizar senha: ${error.message}`, 'danger');
      return;
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
}

/**
 * Esqueci Minha Senha
 */
async function handleEsqueciSenha(e) {
  e.preventDefault();
  esconderAlert(modalEsqueciAlert);

  const email = esqueciEmailInput.value.trim().toLowerCase();
  if (!email) {
    showAlert(modalEsqueciAlert, 'Por favor, informe seu e-mail institucional.', 'warning');
    return;
  }

  try {
    const redirectUrl = window.location.origin + window.location.pathname;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });

    if (error) {
      showAlert(modalEsqueciAlert, `Erro: ${error.message}`, 'danger');
      return;
    }

    showAlert(modalEsqueciAlert, 'Link de redefinição enviado com sucesso para o seu e-mail institucional!', 'success');
    esqueciEmailInput.value = '';

  } catch (err) {
    console.error('[PadrinhoApp] Erro ao enviar recuperação:', err);
    showAlert(modalEsqueciAlert, 'Falha ao processar solicitação. Tente novamente.', 'danger');
  }
}

/**
 * Utilitários de Interface
 */
function exibirTelaLogin() {
  loginSection.style.display = 'block';
  dashboardSection.style.display = 'none';
  if (loginPasswordInput) loginPasswordInput.value = '';
}

function abrirModal(modal) {
  if (modal) {
    modal.style.display = 'flex';
  }
}

function fecharModal(modal) {
  if (modal) {
    modal.style.display = 'none';
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
