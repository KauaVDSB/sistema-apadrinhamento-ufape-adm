/**
 * Quiz Engine & Algoritmo de Compatibilidade (Match Ponderado)
 * ADM UFAPE - Apadrinhamento Universitário
 */

import { QUIZ_CONFIG, QUIZ_QUESTIONS, PADRINHOS } from './data.js';

export class QuizEngine {
  constructor() {
    this.questions = QUIZ_QUESTIONS;
    this.dimensions = QUIZ_CONFIG.dimensoes;
    this.padrinhos = PADRINHOS;
  }

  /**
   * Avalia a afinidade entre uma resposta dada pelo calouro e as características do padrinho para uma pergunta específica.
   * Retorna nota de 0 a 3.
   * 3: Alta afinidade (escolha primária do padrinho)
   * 2: Afinidade moderada (opção secundária ou compatível)
   * 1: Baixa afinidade (neutro)
   * 0: Pouca ou nenhuma afinidade
   */
  avaliarPontuacaoPergunta(perguntaId, respostaCalouro, padrinho) {
    const respostasEsperadas = padrinho.respostasEsperadas[perguntaId] || [];
    
    // Se a resposta é idêntica à primeira prioridade do padrinho
    if (respostasEsperadas.length > 0 && respostasEsperadas[0] === respostaCalouro) {
      return 3;
    }
    // Se a resposta é uma das opções aceitas/afins pelo perfil
    if (respostasEsperadas.includes(respostaCalouro)) {
      return 2;
    }

    // Regras semânticas de afinidade cruzada
    const regraCruzada = this.avaliarRegraSemantica(perguntaId, respostaCalouro, padrinho);
    if (regraCruzada !== null) {
      return regraCruzada;
    }

    return 1;
  }

  avaliarRegraSemantica(perguntaId, resposta, padrinho) {
    // Pergunta 6: Área de ADM
    if (perguntaId === 6) {
      if (resposta === "F") return 2; // Calouro quer conhecer todas, veterano sempre acolhe
      if (padrinho.areaDestaque.toLowerCase().includes("marketing") && resposta === "B") return 3;
      if (padrinho.areaDestaque.toLowerCase().includes("gestão de pessoas") && resposta === "A") return 3;
      if (padrinho.areaDestaque.toLowerCase().includes("finanças") && resposta === "C") return 3;
      if (padrinho.areaDestaque.toLowerCase().includes("empreendedorismo") && resposta === "D") return 3;
      if (padrinho.areaDestaque.toLowerCase().includes("estratégia") && resposta === "E") return 3;
      if (padrinho.areaDestaque.toLowerCase().includes("logística") && (resposta === "E" || resposta === "C")) return 2;
    }

    // Pergunta 5: Afinidade de matérias
    if (perguntaId === 5) {
      if (resposta === "E") return 2; // Ainda não sabe, padrinho guia
    }

    // Pergunta 11: Expectativa sobre o padrinho
    if (perguntaId === 11) {
      if (resposta === "E") return 3; // Um pouco de tudo combina com todos
    }

    // Pergunta 12: Expectativa universitária
    if (perguntaId === 12) {
      if (resposta === "B") return 2; // "Não sei o que estou fazendo, mas vai dar certo" acolhe super bem
    }

    return null;
  }

  /**
   * Calcula o match para todos os padrinhos dado o mapa de respostas do calouro { [perguntaId]: 'A' | 'B' ... }
   */
  calcularMatches(respostasCalouro) {
    const totalQuestoesRespondidas = Object.keys(respostasCalouro).length;
    if (totalQuestoesRespondidas === 0) return [];

    // Mapear perguntas por dimensão
    const dimQuestoes = {};
    this.dimensions.forEach(dim => {
      dimQuestoes[dim.id] = this.questions.filter(q => q.dimensaoId === dim.id);
    });

    const resultados = this.padrinhos.map(padrinho => {
      let pontuacaoPonderadaTotal = 0;
      let somaPesosValidos = 0;
      const detalheDimensoes = [];

      this.dimensions.forEach(dim => {
        const questoesDestaDim = dimQuestoes[dim.id] || [];
        const questoesRespondidas = questoesDestaDim.filter(q => respostasCalouro[q.id] !== undefined);

        if (questoesRespondidas.length > 0) {
          let somaPontosDim = 0;
          let maxPontosDim = questoesRespondidas.length * 3;

          questoesRespondidas.forEach(q => {
            const resposta = respostasCalouro[q.id];
            const pontos = this.avaliarPontuacaoPergunta(q.id, resposta, padrinho);
            somaPontosDim += pontos;
          });

          const aproveitamentoDim = (somaPontosDim / maxPontosDim); // 0 a 1
          pontuacaoPonderadaTotal += aproveitamentoDim * dim.peso;
          somaPesosValidos += dim.peso;

          detalheDimensoes.push({
            dimensaoId: dim.id,
            nome: dim.nome,
            peso: dim.peso,
            aproveitamentoPercentual: Math.round(aproveitamentoDim * 100),
            pontosObtidos: somaPontosDim,
            pontosPossiveis: maxPontosDim
          });
        }
      });

      // Percentual final normalizado
      const matchPercentualBruto = somaPesosValidos > 0 
        ? (pontuacaoPonderadaTotal / somaPesosValidos) * 100 
        : 50;

      // Suavização estética para protótipo de afinidade (mínimo de 60% para valorizar acolhimento positivo)
      const matchPercentual = Math.min(99, Math.max(62, Math.round(matchPercentualBruto)));

      // Extrair afinidades principais em comum
      const principaisAfinidades = this.gerarPrincipaisAfinidades(respostasCalouro, padrinho, detalheDimensoes);

      return {
        padrinho,
        matchPercentual,
        principaisAfinidades,
        detalheDimensoes
      };
    });

    // Ordenar do maior match para o menor
    resultados.sort((a, b) => b.matchPercentual - a.matchPercentual);

    return resultados;
  }

  /**
   * Identifica os pontos fortes em comum entre o calouro e o veterano
   */
  gerarPrincipaisAfinidades(respostasCalouro, padrinho, detalheDimensoes) {
    const afinidades = [];

    // Afinidade por Área da Administração
    const respArea = respostasCalouro[6];
    if (respArea) {
      if (respArea === "A" && padrinho.areaDestaque.toLowerCase().includes("gestão de pessoas")) {
        afinidades.push("Grande afinidade em Gestão de Pessoas, Liderança e Equipes");
      } else if (respArea === "B" && padrinho.areaDestaque.toLowerCase().includes("marketing")) {
        afinidades.push("Interesse conjunto por Marketing, Criatividade e Comunicação");
      } else if (respArea === "C" && padrinho.areaDestaque.toLowerCase().includes("finanças")) {
        afinidades.push("Foco alinhado em Finanças, Métricas e Análise de Mercado");
      } else if (respArea === "D" && padrinho.areaDestaque.toLowerCase().includes("empreendedorismo")) {
        afinidades.push("Espírito empreendedor e vontade de criar novos projetos");
      } else if (respArea === "E" && padrinho.areaDestaque.toLowerCase().includes("estratégia")) {
        afinidades.push("Pensamento estratégico e visão corporativa estruturada");
      } else if (respArea === "F") {
        afinidades.push("Visão aberta para descobrir e vivenciar múltiplos campos de ADM");
      }
    }

    // Afinidade por Sociabilidade & Bateria Social
    const respSoc = respostasCalouro[3];
    if (respSoc === "B") {
      afinidades.push("Preferência mútua por equilíbrio entre vida social e tempo pessoal");
    } else if (respSoc === "A") {
      afinidades.push("Comunicação vibrante e facilidade para networking no campus");
    } else if (respSoc === "C" || respSoc === "D") {
      afinidades.push("Estilo empático, acolhedor e focado em conexões de amizade verdadeiras");
    }

    // Afinidade de Rotina e Organização
    const respOrg = respostasCalouro[8];
    if (respOrg === "A" || respOrg === "B") {
      afinidades.push("Visão realista sobre organização de tempo e prazos na faculdade");
    } else {
      afinidades.push("Sintonia para lidar com a pressão dos trabalhos com leveza e bom humor");
    }

    // Afinidade de Casa de Hogwarts ou Estilo Pessoal
    const respPers = respostasCalouro[1];
    if (respPers === "A") {
      afinidades.push("Perfil analítico e curioso para aprender novidades do curso");
    } else if (respPers === "B") {
      afinidades.push("Personalidade comunicativa e calorosa com a turma");
    } else if (respPers === "C") {
      afinidades.push("Determinação diante de desafios acadêmicos e projetos");
    } else if (respPers === "D") {
      afinidades.push("Postura leal, tranquila e colaborativa em equipe");
    }

    // Hobbies e descompressão pós-aula
    const respRole = respostasCalouro[10];
    if (respRole === "A" || respRole === "B") {
      afinidades.push("Rolê ideal compartilhado: descompressão tranquila e recarga de energia");
    } else if (respRole === "C" || respRole === "D") {
      afinidades.push("Gosto mútuo por lanches, cafés e boas conversas com a galera");
    }

    // Se faltarem afinidades, usar genéricas baseadas no padrinho
    if (afinidades.length < 3) {
      afinidades.push(`Sintonia com a experiência de ${padrinho.nome.split(' ')[0]} no 1º período`);
      afinidades.push(`Acolhimento especial para dicas de rotina e sobrevivência acadêmica na UFAPE`);
    }

    // Retorna as 3 mais expressivas
    return afinidades.slice(0, 3);
  }
}
