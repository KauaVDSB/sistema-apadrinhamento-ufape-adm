/**
 * Aplicação Principal do Programa de Apadrinhamento Universitário
 * ADM UFAPE - 2º Período acolhendo 1º Período
 */

import { QUIZ_CONFIG, QUIZ_QUESTIONS, PADRINHOS } from './data.js';
import { QuizEngine } from './quiz-engine.js';
import { supabaseService } from './supabase-client.js';
import { httpErrorHandler } from './error-handler.js';
import { validarElegibilidadeCalouro } from './calouros-validator.js';

class ApadrinhamentoApp {
  constructor() {
    this.engine = new QuizEngine();
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.matchResults = [];
    this.selectedPadrinho = null;
    this.confirmedPadrinho = null;
    this.calouroData = null;
    this.currentFilter = 'all';

    // Catalogo oficial de padrinhos enriquecido com controle de cotas (ADR-003)
    this.padrinhos = PADRINHOS.map(p => ({
      ...p,
      vagas_ocupadas: 0,
      vagas_restantes: p.limite_vagas || 5,
      esgotado: false
    }));

    this.initElements();
    this.loadStateFromStorage();
    this.bindEvents();
    this.renderQuestion();
    this.renderPadrinhosGrid();
    this.carregarVagasPadrinhos();
  }

  initElements() {
    // Quiz Elements
    this.quizSection = document.getElementById('quiz-section');
    this.quizQuestionTitle = document.getElementById('quiz-question-title');
    this.quizCategoryTag = document.getElementById('quiz-category-tag');
    this.quizStepCounter = document.getElementById('quiz-step-counter');
    this.quizProgressFill = document.getElementById('quiz-progress-fill');
    this.quizOptionsGrid = document.getElementById('quiz-options-grid');
    this.btnPrevQuestion = document.getElementById('btn-prev-question');
    this.btnNextQuestion = document.getElementById('btn-next-question');

    // Match Result Elements
    this.matchResultSection = document.getElementById('match-result-section');
    this.championAvatarInitials = document.getElementById('champion-avatar-initials');
    this.championName = document.getElementById('champion-name');
    this.championHogwarts = document.getElementById('champion-hogwarts');
    this.championScore = document.getElementById('champion-score');
    this.championFocus = document.getElementById('champion-focus');
    this.championQuote = document.getElementById('champion-quote');
    this.affinityReasonsList = document.getElementById('affinity-reasons-list');
    this.btnChampionChoose = document.getElementById('btn-champion-choose');
    this.btnChampionProfile = document.getElementById('btn-champion-profile');
    this.miniRankingList = document.getElementById('mini-ranking-list');

    // Directory Elements
    this.padrinhosGrid = document.getElementById('padrinhos-grid');

    // Modal Elements
    this.profileModal = document.getElementById('profile-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalPeriodo = document.getElementById('modal-periodo');
    this.modalAvatar = document.getElementById('modal-avatar');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalTabs = document.querySelectorAll('.modal-tab-btn');
    this.modalBodyContent = document.getElementById('modal-body-content');
    this.btnModalChoose = document.getElementById('btn-modal-choose');

    // Calouro Form & Connection Section
    this.selectionSection = document.getElementById('selection-section');
    this.chosenMentorName = document.getElementById('chosen-mentor-name');
    this.chosenMentorAvatar = document.getElementById('chosen-mentor-avatar');
    this.chosenMentorArea = document.getElementById('chosen-mentor-area');
    this.calouroForm = document.getElementById('calouro-presentation-form');
    this.inputNome = document.getElementById('calouro-nome');
    this.feedbackNome = document.getElementById('calouro-nome-feedback');

    // Success Card Elements
    this.connectionSuccessCard = document.getElementById('connection-success-card');
    this.successMentorName = document.getElementById('success-mentor-name');
    this.successCalouroName = document.getElementById('success-calouro-name');

    // Hero Selected Mentor Banner
    this.heroSelectedBanner = document.getElementById('hero-selected-banner');
    this.heroSelectedAvatar = document.getElementById('hero-selected-avatar');
    this.heroSelectedName = document.getElementById('hero-selected-name');
    this.btnHeroViewPresentation = document.getElementById('btn-hero-view-presentation');

    // Header & Reminder Bar Elements
    this.navActionBtn = document.getElementById('nav-action-btn');
    this.calouroReminderBar = document.getElementById('calouro-reminder-bar');
  }

  loadStateFromStorage() {
    try {
      const saved = localStorage.getItem('ufape_adm_apadrinhamento');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userAnswers) this.userAnswers = parsed.userAnswers;
        if (parsed.calouroData) this.calouroData = parsed.calouroData;
        if (parsed.confirmedPadrinhoId) {
          this.confirmedPadrinho = this.padrinhos.find(p => p.id === parsed.confirmedPadrinhoId) || PADRINHOS.find(p => p.id === parsed.confirmedPadrinhoId);
        }

        if (this.confirmedPadrinho) {
          this.updateConfirmedUI();
        }
      }
    } catch (e) {
      console.warn('Não foi possível ler dados salvos:', e);
    }
  }

  saveConfirmedStateToStorage() {
    try {
      const dataToSave = {
        userAnswers: this.userAnswers,
        confirmedPadrinhoId: this.confirmedPadrinho ? this.confirmedPadrinho.id : null,
        calouroData: this.calouroData
      };
      localStorage.setItem('ufape_adm_apadrinhamento', JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Erro ao salvar localmente:', e);
    }
  }

  updateConfirmedUI() {
    if (this.confirmedPadrinho) {
      // 1. Atualiza o Hero Banner com o padrinho REALMENTE confirmado
      if (this.heroSelectedBanner) {
        this.heroSelectedBanner.style.display = 'flex';
        this.heroSelectedAvatar.textContent = this.confirmedPadrinho.iniciais;
        this.heroSelectedName.textContent = this.confirmedPadrinho.nome;
      }
      // 2. Oculta barra de lembrete inicial
      if (this.calouroReminderBar) {
        this.calouroReminderBar.style.display = 'none';
      }
      // 3. Atualiza botão do Header para "Boas-vindas!"
      if (this.navActionBtn) {
        this.navActionBtn.textContent = 'Boas-vindas!';
        this.navActionBtn.href = '#hero-selected-banner';
        this.navActionBtn.className = 'btn btn-sm';
        this.navActionBtn.style.backgroundColor = 'var(--warm-gold)';
        this.navActionBtn.style.color = 'var(--royal-navy)';
        this.navActionBtn.style.fontWeight = '800';
      }
    }
  }

  async carregarVagasPadrinhos() {
    try {
      const dadosRemotos = await supabaseService.getPadrinhos();
      if (dadosRemotos && Array.isArray(dadosRemotos) && dadosRemotos.length > 0) {
        dadosRemotos.forEach(remoto => {
          const local = this.padrinhos.find(p => p.id === remoto.id);
          if (local) {
            local.limite_vagas = remoto.limite_vagas ?? local.limite_vagas;
            local.vagas_ocupadas = remoto.vagas_ocupadas ?? 0;
            local.vagas_restantes = remoto.vagas_restantes ?? Math.max(0, local.limite_vagas - local.vagas_ocupadas);
            local.esgotado = remoto.esgotado ?? (local.vagas_restantes <= 0);
          }
        });
        this.renderPadrinhosGrid();
      }
    } catch (err) {
      console.warn('[ApadrinhamentoApp] Falha ao sincronizar vagas do Supabase:', err);
    }
  }

  bindEvents() {
    // Navegação Quiz
    this.btnPrevQuestion.addEventListener('click', () => this.goToPrevQuestion());
    this.btnNextQuestion.addEventListener('click', () => this.goToNextQuestion());

    // Botões de demonstração rápida
    document.getElementById('demo-lucas-btn')?.addEventListener('click', () => {
      this.simularRespostasPara(1); // Lucas Andrade
    });
    document.getElementById('demo-mariana-btn')?.addEventListener('click', () => {
      this.simularRespostasPara(2); // Mariana Alves
    });
    document.getElementById('demo-random-btn')?.addEventListener('click', () => {
      this.simularRespostasAleatorias();
    });

    // Modal Events
    this.modalCloseBtn.addEventListener('click', () => this.closeProfileModal());
    this.profileModal.addEventListener('click', (e) => {
      if (e.target === this.profileModal) this.closeProfileModal();
    });

    this.modalTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.modalTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const tabKey = e.currentTarget.dataset.tab;
        this.renderModalTabContent(tabKey);
      });
    });

    this.btnModalChoose.addEventListener('click', () => {
      const padrinhoId = parseInt(this.btnModalChoose.dataset.padrinhoId, 10);
      const padrinho = PADRINHOS.find(p => p.id === padrinhoId);
      if (padrinho) {
        this.closeProfileModal();
        this.selecionarPadrinho(padrinho);
      }
    });

    // Ações do Padrinho Campeão (Top Match)
    this.btnChampionChoose.addEventListener('click', () => {
      if (this.matchResults.length > 0) {
        this.selecionarPadrinho(this.matchResults[0].padrinho);
      }
    });

    this.btnChampionProfile.addEventListener('click', () => {
      if (this.matchResults.length > 0) {
        this.openProfileModal(this.matchResults[0].padrinho);
      }
    });

    // Botão Ver Apresentação no Banner do Topo
    this.btnHeroViewPresentation?.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.confirmedPadrinho) {
        this.openProfileModal(this.confirmedPadrinho);
      } else if (this.selectedPadrinho) {
        this.abrirSecaoApresentacao();
      } else {
        document.getElementById('mural-padrinhos')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Formulário do Calouro
    if (this.calouroForm) {
      this.calouroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });

      this.calouroForm.addEventListener('input', () => {
        this.salvarRascunhoFormulario();
      });

      this.calouroForm.addEventListener('change', () => {
        this.salvarRascunhoFormulario();
      });

      if (this.inputNome && this.feedbackNome) {
        const verificarNome = () => {
          const valor = this.inputNome.value.trim();
          if (valor.length < 5) {
            this.feedbackNome.style.display = 'none';
            return;
          }
          const st = validarElegibilidadeCalouro(valor);
          this.feedbackNome.style.display = 'flex';
          if (st.valido) {
            this.feedbackNome.className = 'nome-validation-feedback success';
            this.feedbackNome.innerHTML = `<span>✓</span> <span>${st.mensagem}</span>`;
          } else {
            this.feedbackNome.className = 'nome-validation-feedback warning';
            this.feedbackNome.innerHTML = `<span>⚠</span> <span>${st.mensagem}</span>`;
          }
        };

        this.inputNome.addEventListener('input', verificarNome);
        this.inputNome.addEventListener('blur', verificarNome);
      }
    }

    // Botão reset quiz
    document.getElementById('btn-reset-quiz')?.addEventListener('click', () => {
      this.resetQuiz();
    });
  }

  // =========================================================================
  // QUIZ LOGIC
  // =========================================================================

  renderQuestion() {
    const q = QUIZ_QUESTIONS[this.currentQuestionIndex];
    if (!q) return;

    const total = QUIZ_QUESTIONS.length;
    const currentNum = this.currentQuestionIndex + 1;
    const progressPercent = (currentNum / total) * 100;
    this.quizProgressFill.style.width = `${progressPercent}%`;

    this.quizStepCounter.textContent = `Pergunta ${currentNum} de ${total}`;
    this.quizCategoryTag.textContent = `${q.categoria}`;
    this.quizQuestionTitle.textContent = q.pergunta;

    this.btnPrevQuestion.disabled = (this.currentQuestionIndex === 0);
    this.btnPrevQuestion.style.opacity = this.currentQuestionIndex === 0 ? '0.4' : '1';

    const isAnswered = this.userAnswers[q.id] !== undefined;
    if (this.currentQuestionIndex === total - 1) {
      this.btnNextQuestion.innerHTML = `<span>Ver Meu Match</span> →`;
    } else {
      this.btnNextQuestion.innerHTML = `<span>Próxima</span> →`;
    }
    this.btnNextQuestion.disabled = !isAnswered;
    this.btnNextQuestion.style.opacity = isAnswered ? '1' : '0.6';

    this.quizOptionsGrid.innerHTML = '';
    q.opcoes.forEach(opcao => {
      const isSelected = this.userAnswers[q.id] === opcao.id;
      const card = document.createElement('div');
      card.className = `option-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="option-letter">${opcao.id}</div>
        <div class="option-content">
          <div class="option-text">${opcao.texto}</div>
          ${opcao.tag ? `<div class="option-tag-hint">${opcao.tag}</div>` : ''}
        </div>
      `;

      card.addEventListener('click', () => {
        this.selecionarResposta(q.id, opcao.id);
      });

      this.quizOptionsGrid.appendChild(card);
    });
  }

  selecionarResposta(perguntaId, opcaoId) {
    this.userAnswers[perguntaId] = opcaoId;
    this.saveStateToStorage();
    this.renderQuestion();

    if (this.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        this.goToNextQuestion();
      }, 240);
    }
  }

  goToPrevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuestion();
    }
  }

  goToNextQuestion() {
    const q = QUIZ_QUESTIONS[this.currentQuestionIndex];
    if (!this.userAnswers[q.id]) {
      alert("Por favor, selecione uma opção para continuar.");
      return;
    }

    if (this.currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion();
    } else {
      this.finalizarQuiz();
    }
  }

  simularRespostasPara(padrinhoId) {
    const padrinho = PADRINHOS.find(p => p.id === padrinhoId);
    if (!padrinho) return;

    QUIZ_QUESTIONS.forEach(q => {
      const escolhas = padrinho.respostasEsperadas[q.id] || ["A"];
      this.userAnswers[q.id] = escolhas[0];
    });

    this.currentQuestionIndex = QUIZ_QUESTIONS.length - 1;
    this.saveStateToStorage();
    this.finalizarQuiz();
  }

  simularRespostasAleatorias() {
    QUIZ_QUESTIONS.forEach(q => {
      const idx = Math.floor(Math.random() * q.opcoes.length);
      this.userAnswers[q.id] = q.opcoes[idx].id;
    });

    this.currentQuestionIndex = QUIZ_QUESTIONS.length - 1;
    this.saveStateToStorage();
    this.finalizarQuiz();
  }

  resetQuiz() {
    this.userAnswers = {};
    this.currentQuestionIndex = 0;
    this.matchResults = [];
    this.matchResultSection.style.display = 'none';
    this.renderQuestion();
    this.renderPadrinhosGrid();
    this.quizSection.scrollIntoView({ behavior: 'smooth' });
  }

  // =========================================================================
  // MATCH RESULT
  // =========================================================================

  finalizarQuiz() {
    this.matchResults = this.engine.calcularMatches(this.userAnswers);
    if (this.matchResults.length === 0) return;

    const champion = this.matchResults[0];

    // Popula campeão com Monograma de Iniciais
    this.championAvatarInitials.textContent = champion.padrinho.iniciais;
    this.championName.textContent = champion.padrinho.nome;
    this.championHogwarts.textContent = champion.padrinho.casaHogwarts;
    this.championScore.textContent = `${champion.matchPercentual}%`;
    this.championFocus.textContent = champion.padrinho.areaDestaque;
    this.championQuote.textContent = `"${champion.padrinho.lemas}"`;

    // Afinidades
    this.affinityReasonsList.innerHTML = '';
    champion.principaisAfinidades.forEach(afinidade => {
      const li = document.createElement('li');
      li.className = 'affinity-reason-item';
      li.innerHTML = `<span class="affinity-check-icon">✓</span> <span>${afinidade}</span>`;
      this.affinityReasonsList.appendChild(li);
    });

    // Renderiza Mini Ranking dos outros padrinhos
    this.renderMiniRanking();

    // Atualiza mural geral com as badges de porcentagem
    this.renderPadrinhosGrid();

    // Exibe seção de match
    this.matchResultSection.style.display = 'block';
    this.matchResultSection.scrollIntoView({ behavior: 'smooth' });

    // Dispara confetes
    this.dispararConfetes();
  }

  renderMiniRanking() {
    if (!this.miniRankingList) return;
    this.miniRankingList.innerHTML = '';

    const outros = this.matchResults.slice(1, 5);
    outros.forEach((item) => {
      const card = document.createElement('div');
      card.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        background: #FFFFFF;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        margin-bottom: 0.5rem;
        gap: 0.75rem;
      `;
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; min-width: 0;">
          <div class="monogram-avatar avatar-mini">${item.padrinho.iniciais}</div>
          <div style="min-width: 0;">
            <div style="font-weight: 800; font-size: 0.9rem; color: var(--royal-navy); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.padrinho.nome}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.padrinho.casaHogwarts} • ${item.padrinho.areaDestaque}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0;">
          <span style="font-weight: 800; color: var(--sapphire-blue); font-size: 0.95rem;">${item.matchPercentual}%</span>
          <button class="btn btn-sm btn-secondary" data-id="${item.padrinho.id}" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">Ver Perfil</button>
        </div>
      `;

      card.querySelector('button').addEventListener('click', () => {
        this.openProfileModal(item.padrinho);
      });

      this.miniRankingList.appendChild(card);
    });
  }

  dispararConfetes() {
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0E2A47', '#1E4C7C', '#C9A227', '#F2EFE8']
      });
    }
  }

  // =========================================================================
  // MURAL DE TODOS OS PADRINHOS
  // =========================================================================

  renderPadrinhosGrid() {
    this.padrinhosGrid.innerHTML = '';

    let lista = [...this.padrinhos];

    if (this.matchResults.length > 0) {
      const matchMap = new Map();
      this.matchResults.forEach(r => matchMap.set(r.padrinho.id, r.matchPercentual));
      lista.sort((a, b) => (matchMap.get(b.id) || 0) - (matchMap.get(a.id) || 0));
    }

    lista.forEach(padrinho => {
      const matchObj = this.matchResults.find(m => m.padrinho.id === padrinho.id);
      const matchPercent = matchObj ? matchObj.matchPercentual : null;
      const isConfirmed = this.confirmedPadrinho && this.confirmedPadrinho.id === padrinho.id;
      const isSelected = this.selectedPadrinho && this.selectedPadrinho.id === padrinho.id;
      const vagasRestantes = typeof padrinho.vagas_restantes === 'number'
        ? padrinho.vagas_restantes
        : (padrinho.limite_vagas || 5);
      const esgotado = Boolean(padrinho.esgotado || vagasRestantes <= 0);

      const card = document.createElement('div');
      card.className = 'padrinho-card';
      card.innerHTML = `
        <div class="padrinho-card-header">
          <div class="card-quota-badge ${esgotado ? 'quota-exhausted' : ''}">
            <span class="quota-dot"></span>
            <span>${esgotado ? 'Vagas Esgotadas' : `${vagasRestantes} vaga${vagasRestantes > 1 ? 's' : ''}`}</span>
          </div>
          ${matchPercent ? `<div class="card-match-badge">${matchPercent}% Match</div>` : ''}
          <div class="card-hogwarts-chip">${padrinho.casaHogwarts}</div>
          <div class="monogram-avatar avatar-card padrinho-card-avatar">${padrinho.iniciais}</div>
        </div>
        <div class="padrinho-card-body">
          <h3 class="card-mentor-name">${padrinho.nome}</h3>
          <div class="card-mentor-role">${padrinho.areaDestaque}</div>
          <p class="card-mentor-bio">${padrinho.resumo}</p>
          
          <div class="card-tags">
            ${padrinho.hobbies.slice(0, 3).map(h => `<span class="tag-pill">${h}</span>`).join('')}
          </div>
        </div>
        <div class="padrinho-card-footer">
          <button class="btn btn-secondary btn-sm btn-view-profile" style="flex: 1;">Ver Perfil</button>
          <button class="btn ${isConfirmed ? 'btn-primary' : (isSelected ? 'btn-secondary' : 'btn-outline')} btn-sm btn-choose-mentor" 
                  style="flex: 1.2;" 
                  ${esgotado && !isConfirmed ? 'disabled' : ''}>
            ${isConfirmed ? '✓ Seu Mentor' : (isSelected ? 'Selecionado' : (esgotado ? 'Esgotado' : 'Quero Esse'))}
          </button>
        </div>
      `;

      card.querySelector('.btn-view-profile').addEventListener('click', () => {
        this.openProfileModal(padrinho);
      });

      card.querySelector('.btn-choose-mentor').addEventListener('click', () => {
        if (!esgotado || isConfirmed) {
          this.selecionarPadrinho(padrinho);
        }
      });

      this.padrinhosGrid.appendChild(card);
    });
  }

  // =========================================================================
  // MODAL DE PERFIL
  // =========================================================================

  openProfileModal(padrinho) {
    this.activeModalPadrinho = padrinho;
    this.modalTitle.textContent = padrinho.nome;
    this.modalPeriodo.textContent = `${padrinho.casaHogwarts} • ${padrinho.areaDestaque}`;
    this.modalAvatar.textContent = padrinho.iniciais;
    this.btnModalChoose.dataset.padrinhoId = padrinho.id;

    const isConfirmed = this.confirmedPadrinho && this.confirmedPadrinho.id === padrinho.id;
    const vagasRestantes = typeof padrinho.vagas_restantes === 'number'
      ? padrinho.vagas_restantes
      : (padrinho.limite_vagas || 5);
    const esgotado = Boolean(padrinho.esgotado || vagasRestantes <= 0);

    if (isConfirmed) {
      this.btnModalChoose.disabled = false;
      this.btnModalChoose.textContent = '✓ Seu Mentor Confirmado';
    } else if (esgotado) {
      this.btnModalChoose.disabled = true;
      this.btnModalChoose.textContent = 'Vagas Esgotadas';
    } else {
      this.btnModalChoose.disabled = false;
      this.btnModalChoose.textContent = 'Escolher Este(a) Mentor(a)';
    }

    this.modalTabs.forEach(t => t.classList.remove('active'));
    this.modalTabs[0].classList.add('active');

    this.renderModalTabContent('conhecer');

    this.profileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeProfileModal() {
    this.profileModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  renderModalTabContent(tabKey) {
    const p = this.activeModalPadrinho;
    if (!p) return;

    let html = '';

    if (tabKey === 'conhecer') {
      const c = p.para_conhecer_voce;
      html = `
        <div class="profile-qa-card">
          <div class="profile-qa-title">Casa de Hogwarts</div>
          <div class="profile-qa-answer">${c.casa_de_hogwarts}</div>
        </div>
        <div class="profile-qa-card">
          <div class="profile-qa-title">O que mais gosta de fazer fora dos estudos</div>
          <div class="profile-qa-answer">${c.o_que_gosta_de_fazer_quando_nao_esta_estudando}</div>
        </div>
        <div class="profile-qa-card">
          <div class="profile-qa-title">Frase ou referência sobre sua personalidade</div>
          <div class="profile-qa-answer">${c.meme_que_representa_sua_personalidade}</div>
        </div>
        <div class="profile-qa-card">
          <div class="profile-qa-title">Como resume seu primeiro período</div>
          <div class="profile-qa-answer">${c.figurinha_que_representou_o_primeiro_periodo}</div>
        </div>
        <div class="profile-qa-card">
          <div class="profile-qa-title">Personalidade marcante para sentar ao lado na aula</div>
          <div class="profile-qa-answer">${c.pessoa_famosa_para_sentir_ao_lado_na_aula}</div>
        </div>
      `;
    } else if (tabKey === 'experiencia') {
      const e = p.experiencia_no_curso;
      html = `
        <div class="profile-qa-card">
          <div class="profile-qa-title">Matéria preferida no primeiro período</div>
          <div class="profile-qa-answer">${e.materia_preferida_no_primeiro_periodo}</div>
        </div>
        <div class="profile-qa-card" style="border-left-color: #ef4444;">
          <div class="profile-qa-title" style="color: #991b1b;">Matéria que mais exigiu dedicação</div>
          <div class="profile-qa-answer">${e.materia_que_mais_testou_a_sanidade}</div>
        </div>
        <div class="profile-qa-card">
          <div class="profile-qa-title">Área da Administração de maior interesse</div>
          <div class="profile-qa-answer">${e.area_da_administracao_que_mais_chama_atencao}</div>
        </div>
        <div class="profile-qa-card" style="border-left-color: var(--warm-gold);">
          <div class="profile-qa-title">Maior aprendizado ao ingressar na universidade</div>
          <div class="profile-qa-answer">${e.maior_choque_de_realidade}</div>
        </div>
      `;
    } else if (tabKey === 'vida') {
      const v = p.vida_universitaria;
      html = `
        <div class="profile-qa-card">
          <div class="profile-qa-title">História engraçada da rotina acadêmica</div>
          <div class="profile-qa-answer">${v.momento_mais_engracado}</div>
        </div>
        <div class="profile-qa-card">
          <div class="profile-qa-title">Momento em que se sentiu verdadeiramente universitário(a)</div>
          <div class="profile-qa-answer">${v.momento_em_que_percebeu_que_virou_universitario}</div>
        </div>
        <div class="profile-qa-card" style="border-left-color: #ef4444;">
          <div class="profile-qa-title" style="color: #991b1b;">O que tornaria a vida acadêmica ainda melhor</div>
          <div class="profile-qa-answer">${v.coisa_que_eliminaria_da_vida_universitaria}</div>
        </div>
      `;
    }

    this.modalBodyContent.innerHTML = html;
  }

  // =========================================================================
  // SELEÇÃO & APRESENTAÇÃO DO CALOURO
  // =========================================================================

  selecionarPadrinho(padrinho) {
    this.selectedPadrinho = padrinho;
    // Seleção em memória para preenchimento.
    // O hero banner e o localStorage SÓ são atualizados após confirmação efetiva do formulário.
    this.renderPadrinhosGrid();
    this.abrirSecaoApresentacao();
  }

  salvarRascunhoFormulario() {
    if (!this.calouroForm) return;
    const formData = new FormData(this.calouroForm);
    const dados = {};
    for (const [key, value] of formData.entries()) {
      dados[key] = value;
    }
    supabaseService.salvarRascunho(dados);
  }

  abrirSecaoApresentacao() {
    if (!this.selectedPadrinho) return;

    this.chosenMentorName.textContent = this.selectedPadrinho.nome;
    this.chosenMentorAvatar.textContent = this.selectedPadrinho.iniciais;
    this.chosenMentorArea.textContent = `${this.selectedPadrinho.periodo || '2º Período'} • ADM`;

    const formHeading = document.getElementById('form-calouro-heading');
    if (formHeading) {
      formHeading.textContent = `Apresente-se para ${this.selectedPadrinho.nome.split(' ')[0]}!`;
    }

    // Restaura dados do rascunho salvo no localStorage ou memória
    const rascunho = supabaseService.obterRascunho() || this.calouroData;
    if (rascunho && this.calouroForm) {
      Object.keys(rascunho).forEach(key => {
        const field = this.calouroForm.elements[key];
        if (field) {
          if (field instanceof RadioNodeList) {
            field.value = rascunho[key];
          } else if (field.type === 'radio') {
            field.checked = (field.value === rascunho[key]);
          } else {
            field.value = rascunho[key];
          }
        }
      });
    }

    this.selectionSection.style.display = 'block';
    this.selectionSection.scrollIntoView({ behavior: 'smooth' });
  }

  updateHeroBanner() {
    this.updateConfirmedUI();
  }

  async handleFormSubmit() {
    const submitBtn = document.getElementById('btn-submit-apadrinhamento');
    const submitText = document.getElementById('btn-submit-text');

    const formData = new FormData(this.calouroForm);
    const nome = formData.get('nome')?.trim() || '';

    // Validação nominal estrita e contingência temporal (ADR-004)
    const statusElegibilidade = validarElegibilidadeCalouro(nome);
    if (!statusElegibilidade.valido) {
      httpErrorHandler.show(403, {
        title: 'Validação de Ingressante UFAPE',
        message: statusElegibilidade.mensagem,
        primaryBtn: {
          text: 'Revisar Nome Completo',
          action: () => {
            if (this.inputNome) {
              this.inputNome.focus();
              this.inputNome.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      });
      return;
    }

    const whatsapp = formData.get('whatsapp')?.trim() || '';
    const instagram = formData.get('instagram')?.trim() || '';
    const canalPreferido = formData.get('canalPreferido') || 'whatsapp';

    const respostas = {
      animacao: formData.get('animacao')?.trim() || '',
      sobreVoce: formData.get('sobreVoce')?.trim() || '',
      expectativaPeriodo: formData.get('expectativaPeriodo')?.trim() || '',
      afinidadeMaterias: formData.get('afinidadeMaterias') || '',
      areaInteresse: formData.get('areaInteresse')?.trim() || '',
      expectativaMentor: formData.get('expectativaMentor')?.trim() || '',
      tipoApoio: formData.get('tipoApoio') || '',
      assuntosAjuda: formData.get('assuntosAjuda')?.trim() || '',
      aprenderMentor: formData.get('aprenderMentor')?.trim() || '',
      mensagem: formData.get('mensagem')?.trim() || '',
      espacoLivre: formData.get('espacoLivre')?.trim() || ''
    };

    this.calouroData = {
      nome,
      whatsapp,
      instagram,
      canalPreferido,
      ...respostas
    };

    // Salva rascunho no localStorage
    supabaseService.salvarRascunho(this.calouroData);

    // Ativa loading no botão
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Gravando vínculo...';
    }

    try {
      const payload = {
        padrinhoId: this.selectedPadrinho.id,
        padrinhoNome: this.selectedPadrinho.nome,
        calouroNome: nome,
        calouroWhatsapp: whatsapp,
        calouroInstagram: instagram,
        canalPreferido: canalPreferido,
        respostas: respostas
      };

      const resultado = await supabaseService.registrarApadrinhamento(payload);

      if (resultado && resultado.success) {
        // Atualiza contadores locais de vagas imediatamente
        const mentorEscolhido = this.padrinhos.find(p => p.id === this.selectedPadrinho.id);
        if (mentorEscolhido) {
          mentorEscolhido.vagas_ocupadas = (mentorEscolhido.vagas_ocupadas || 0) + 1;
          mentorEscolhido.vagas_restantes = Math.max(0, (mentorEscolhido.vagas_restantes || mentorEscolhido.limite_vagas) - 1);
          mentorEscolhido.esgotado = mentorEscolhido.vagas_restantes <= 0;
        }

        this.confirmedPadrinho = this.selectedPadrinho;
        supabaseService.limparRascunho();
        this.saveConfirmedStateToStorage();
        this.updateConfirmedUI();
        this.renderPadrinhosGrid();

        this.selectionSection.style.display = 'none';
        this.connectionSuccessCard.style.display = 'block';

        this.successMentorName.textContent = this.confirmedPadrinho.nome;
        this.successCalouroName.textContent = this.calouroData.nome;

        this.connectionSuccessCard.scrollIntoView({ behavior: 'smooth' });
        this.dispararConfetes();

      } else if (resultado && resultado.code === 'VAGAS_ESGOTADAS') {
        httpErrorHandler.show(403, {
          title: 'Vagas Esgotadas para este Mentor',
          message: resultado.message || 'As vagas para este padrinho/madrinha acabaram de ser preenchidas por outro estudante. Por favor, selecione outro mentor disponível no mural.',
          primaryBtn: {
            text: 'Escolher Outro Mentor',
            action: () => {
              const mural = document.getElementById('mural-padrinhos');
              if (mural) mural.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      } else if (resultado && resultado.code === 'CALOURO_JA_CADASTRADO') {
        httpErrorHandler.show(403, {
          title: 'Você Já Escolheu um Mentor',
          message: 'Constatamos que você já possui uma escolha de padrinho/madrinha registrada no sistema. Caso precise alterar, procure a coordenação do programa.',
          primaryBtn: {
            text: 'Entendido',
            action: () => {}
          }
        });
      } else {
        throw new Error(resultado?.message || 'Falha ao processar apadrinhamento.');
      }

    } catch (err) {
      console.error('[ApadrinhamentoApp] Erro na submissão:', err);
      httpErrorHandler.show(500, {
        title: 'Não foi possível confirmar o apadrinhamento',
        message: 'Ocorreu uma instabilidade momentânea na conexão. <strong>Suas respostas foram salvas no navegador</strong> e não foram perdidas.',
        preserveData: true,
        onRetry: () => this.handleFormSubmit()
      });
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Confirmar Escolha de Padrinho';
      }
    }
  }
}

// Inicializa a aplicação quando o DOM estiver pronto (suporta execução após DOMContentLoaded)
function iniciarApp() {
  if (!window.app) {
    window.app = new ApadrinhamentoApp();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
  iniciarApp();
}
