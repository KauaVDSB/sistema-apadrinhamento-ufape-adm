/**
 * Dados do Programa de Apadrinhamento Universitário - ADM UFAPE
 * 2º Período acolhendo o 1º Período
 */

export const QUIZ_CONFIG = {
  titulo: "Descubra Seu Padrinho / Madrinha Ideal",
  subtitulo: "Responda a 12 perguntas sobre seu estilo, rotina e expectativas para encontrarmos o veterano do 2º período com maior compatibilidade!",
  dimensoes: [
    { id: "personalidade", nome: "Personalidade", peso: 15 },
    { id: "hobbies_e_interesses", nome: "Hobbies e Interesses", peso: 10 },
    { id: "sociabilidade", nome: "Sociabilidade", peso: 10 },
    { id: "afinidade_humanas_exatas", nome: "Afinidade Acadêmica", peso: 15 },
    { id: "area_da_administracao", nome: "Área da Administração", peso: 15 },
    { id: "organizacao_e_rotina", nome: "Organização e Rotina", peso: 10 },
    { id: "trabalho_em_grupo", nome: "Trabalho em Grupo", peso: 10 },
    { id: "vida_universitaria", nome: "Vida Universitária", peso: 5 },
    { id: "expectativa_sobre_padrinho", nome: "Expectativa do Padrinho", peso: 10 }
  ]
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    dimensaoId: "personalidade",
    categoria: "Personalidade",
    pergunta: "Como você se descreveria melhor?",
    opcoes: [
      { id: "A", texto: "Curioso(a), observador(a) e gosto de aprender coisas novas.", tag: "Analítico & Curioso" },
      { id: "B", texto: "Comunicativo(a), espontâneo(a) e gosto de estar com pessoas.", tag: "Sociável & Expressivo" },
      { id: "C", texto: "Determinado(a), competitivo(a) e gosto de desafios.", tag: "Focado & Líder" },
      { id: "D", texto: "Tranquilo(a), leal e prefiro ambientes mais confortáveis.", tag: "Empático & Paciente" }
    ]
  },
  {
    id: 2,
    dimensaoId: "hobbies_e_interesses",
    categoria: "Hobbies",
    pergunta: "Em um tempo livre, o que mais combina com você?",
    opcoes: [
      { id: "A", texto: "Ler, ouvir música, assistir séries ou ficar em casa.", tag: "Cultural & Tranquilo" },
      { id: "B", texto: "Jogar ou passar um tempo na internet.", tag: "Conectado & Jogos" },
      { id: "C", texto: "Sair para comer, passear ou encontrar amigos.", tag: "Conexão Social" },
      { id: "D", texto: "Fazer um pouco de tudo, dependendo do dia.", tag: "Versátil & Eclético" }
    ]
  },
  {
    id: 3,
    dimensaoId: "sociabilidade",
    categoria: "Sociabilidade",
    pergunta: "Como é sua bateria social?",
    opcoes: [
      { id: "A", texto: "Quanto mais gente, melhor.", tag: "Extroversão Máxima" },
      { id: "B", texto: "Gosto de socializar, mas também preciso do meu tempo sozinho(a).", tag: "Equilibrado(a)" },
      { id: "C", texto: "Prefiro grupos pequenos de pessoas.", tag: "Círculo Seletivo" },
      { id: "D", texto: "Sou mais reservado(a) e demoro um pouco para me soltar.", tag: "Introvertido(a)" }
    ]
  },
  {
    id: 4,
    dimensaoId: "vida_universitaria",
    categoria: "Reação a Dificuldades",
    pergunta: "Quando alguma coisa começa a dar errado, você normalmente...",
    opcoes: [
      { id: "A", texto: "Tento resolver tudo imediatamente.", tag: "Ação Pragmática" },
      { id: "B", texto: "Faço uma piada e tento manter a calma.", tag: "Humor & Resiliência" },
      { id: "C", texto: "Fico preocupado(a), mas continuo fazendo o que preciso.", tag: "Persistência" },
      { id: "D", texto: "Peço ajuda para alguém antes de continuar.", tag: "Cooperação" }
    ]
  },
  {
    id: 5,
    dimensaoId: "afinidade_humanas_exatas",
    categoria: "Afinidade Acadêmica",
    pergunta: "Pensando nas matérias da faculdade, você acha que vai se identificar mais com...",
    opcoes: [
      { id: "A", texto: "Matemática, cálculos e números.", tag: "Cálculo & Finanças" },
      { id: "B", texto: "Pessoas, comportamento e relações humanas.", tag: "Comportamento Humano" },
      { id: "C", texto: "Comunicação, criatividade e marketing.", tag: "Criatividade & Comunicação" },
      { id: "D", texto: "Estratégia, gestão e funcionamento das empresas.", tag: "Visão Sistêmica" },
      { id: "E", texto: "Ainda não faço ideia.", tag: "Mente Aberta" }
    ]
  },
  {
    id: 6,
    dimensaoId: "area_da_administracao",
    categoria: "Área da Administração",
    pergunta: "Entre essas áreas da Administração, qual desperta mais sua curiosidade?",
    opcoes: [
      { id: "A", texto: "Gestão de Pessoas.", tag: "Gestão de Pessoas" },
      { id: "B", texto: "Marketing.", tag: "Marketing" },
      { id: "C", texto: "Finanças.", tag: "Finanças" },
      { id: "D", texto: "Empreendedorismo.", tag: "Empreendedorismo" },
      { id: "E", texto: "Estratégia e gestão empresarial.", tag: "Estratégia Empresarial" },
      { id: "F", texto: "Ainda quero conhecer todas antes de escolher.", tag: "Multidisciplinar" }
    ]
  },
  {
    id: 7,
    dimensaoId: "trabalho_em_grupo",
    categoria: "Trabalho em Grupo",
    pergunta: "Em trabalhos em grupo, você costuma ser a pessoa que...",
    opcoes: [
      { id: "A", texto: "Organiza tudo e divide as tarefas.", tag: "Líder Organizador" },
      { id: "B", texto: "Dá ideias e ajuda na parte criativa.", tag: "Criativo & Inspirador" },
      { id: "C", texto: "Faz sua parte tranquilamente e ajuda quando necessário.", tag: "Mão na Massa" },
      { id: "D", texto: "Tenta manter todo mundo unido e se comunicando.", tag: "Mediador & Diplomata" },
      { id: "E", texto: "Prefere trabalhar sozinho(a), quando possível.", tag: "Foco Autônomo" }
    ]
  },
  {
    id: 8,
    dimensaoId: "organizacao_e_rotina",
    categoria: "Organização",
    pergunta: "Como você imagina sua organização na faculdade?",
    opcoes: [
      { id: "A", texto: "Quero deixar tudo planejado e organizado.", tag: "Planejador Metódico" },
      { id: "B", texto: "Vou tentar me organizar, mas provavelmente vou improvisar algumas vezes.", tag: "Flexível & Realista" },
      { id: "C", texto: "Costumo funcionar melhor quando o prazo começa a chegar.", tag: "Foco sob Pressão" },
      { id: "D", texto: "Organização definitivamente não é meu forte.", tag: "Adaptável" }
    ]
  },
  {
    id: 9,
    dimensaoId: "vida_universitaria",
    categoria: "Dificuldades Acadêmicas",
    pergunta: "Qual dessas situações parece mais desafiadora para você?",
    opcoes: [
      { id: "A", texto: "Uma prova cheia de cálculos.", tag: "Cálculos Exatos" },
      { id: "B", texto: "Uma apresentação na frente da turma.", tag: "Oratória em Público" },
      { id: "C", texto: "Vários trabalhos acumulados na mesma semana.", tag: "Sobrecarga de Prazos" },
      { id: "D", texto: "Um trabalho em grupo com pessoas que não conheço.", tag: "Equipes Novas" },
      { id: "E", texto: "Ainda estou descobrindo meus receios universitários.", tag: "Explorador" }
    ]
  },
  {
    id: 10,
    dimensaoId: "hobbies_e_interesses",
    categoria: "Vida Social",
    pergunta: "Qual seria seu momento ideal após uma semana cansativa de faculdade?",
    opcoes: [
      { id: "A", texto: "Ficar em casa assistindo alguma coisa.", tag: "Descanso Solo" },
      { id: "B", texto: "Jogar ou navegar na internet.", tag: "Descompressão Digital" },
      { id: "C", texto: "Sair para comer alguma coisa com amigos.", tag: "Gastronomia & Conversa" },
      { id: "D", texto: "Conversar com amigos em um ambiente tranquilo.", tag: "Papo Calmo" },
      { id: "E", texto: "Qualquer atividade que desligue da rotina de estudos.", tag: "Desconexão Total" }
    ]
  },
  {
    id: 11,
    dimensaoId: "expectativa_sobre_padrinho",
    categoria: "Expectativa sobre Padrinho",
    pergunta: "Que tipo de padrinho ou madrinha combinaria mais com você?",
    opcoes: [
      { id: "A", texto: "Alguém comunicativo que me ajude a conhecer pessoas.", tag: "Conector" },
      { id: "B", texto: "Alguém tranquilo com quem eu possa conversar quando precisar.", tag: "Ouvinte" },
      { id: "C", texto: "Alguém organizado que me dê dicas sobre matérias e rotina.", tag: "Mentor Prático" },
      { id: "D", texto: "Alguém bem-humorado que deixe minha adaptação à faculdade mais leve.", tag: "Descontraído" },
      { id: "E", texto: "Um pouco de tudo.", tag: "Versátil" }
    ]
  },
  {
    id: 12,
    dimensaoId: "expectativa_sobre_padrinho",
    categoria: "Expectativa Universitária",
    pergunta: "Se você tivesse que escolher uma postura para começar a faculdade, seria...",
    opcoes: [
      { id: "A", texto: "Vou organizar tudo desde o primeiro dia.", tag: "Planejamento Total" },
      { id: "B", texto: "Não sei exatamente o que me espera, mas vai dar certo.", tag: "Confiança Realista" },
      { id: "C", texto: "Quero conhecer todo mundo e aproveitar ao máximo a experiência.", tag: "Vivência Plena" },
      { id: "D", texto: "Espero dominar bem os conteúdos das matérias.", tag: "Dedicação Acadêmica" },
      { id: "E", texto: "Quero descobrir o que realmente gosto dentro da Administração.", tag: "Busca de Vocação" }
    ]
  }
];

export const PADRINHOS = [
  {
    id: 1,
    nome: "Lucas Andrade",
    iniciais: "LA",
    genero: "ele",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Grifinória",
    casaSlug: "grifinoria",
    areaDestaque: "Marketing & Gestão de Pessoas",
    lemas: "Minha bateria social acaba às 22h, mas até lá dou total dedicação e apoio para a turma!",
    resumo: "Divertido, sincero e focado em comportamento humano e comunicação. Adora séries, jogos e tem ótimas histórias sobre o 1º período.",
    respostasEsperadas: {
      1: ["B", "C"],
      2: ["B", "C"],
      3: ["B", "C"],
      4: ["B"],
      5: ["B", "C"],
      6: ["A", "B"],
      7: ["B", "D"],
      8: ["B", "C"],
      9: ["A", "C"],
      10: ["B", "C"],
      11: ["D", "A"],
      12: ["B", "C"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Grifinória",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Gosto de jogar, assistir séries, sair para comer com meus amigos e passar tempo navegando em vídeos e novidades na internet.",
      meme_que_representa_sua_personalidade: "O meme do 'eu simplesmente não existo mais depois das 22h'. Minha bateria social acaba rápido, mas no horário útil dou 100% de energia.",
      figurinha_que_representou_o_primeiro_periodo: "Aquela figurinha do gatinho olhando para o nada com a frase 'não sei mais o que está acontecendo'.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Ryan Reynolds. Acho que eu não prestaria atenção em absolutamente nada da aula, mas com certeza seria divertido."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Introdução à Administração. Foi a matéria que mais me fez ter certeza de que eu tinha escolhido o curso certo.",
      materia_que_mais_testou_a_sanidade: "Matemática. Eu entrava na sala confiante e saía questionando todas as escolhas que fiz na vida.",
      area_da_administracao_que_mais_chama_atencao: "Marketing e Gestão de Pessoas. Gosto muito da parte de comportamento, comunicação e de entender o que faz uma empresa funcionar bem com as pessoas.",
      maior_choque_de_realidade: "Perceber que ninguém vai ficar lembrando você de estudar, entregar trabalho ou organizar sua rotina. Se você deixar tudo para depois, o problema chega com juros."
    },
    vida_universitaria: {
      momento_mais_engracado: "Uma apresentação em que nosso grupo esqueceu completamente quem começaria falando. Ficamos uns cinco segundos olhando um para a cara do outro até alguém começar a rir. Depois disso, ninguém conseguia mais falar sério.",
      momento_em_que_percebeu_que_virou_universitario: "Quando percebi que estava almoçando um salgado às 15h enquanto terminava um trabalho que precisava entregar no mesmo dia.",
      coisa_que_eliminaria_da_vida_universitaria: "Trabalhos em grupo com prazo curto. Principalmente quando cinco pessoas precisam encontrar um horário em comum. É praticamente um desafio de sobrevivência."
    },
    hobbies: ["Jogos Online", "Séries", "Gastronomia com amigos", "Mídias Digitais"],
    habilidades_mentoria: ["Dicas de TGA e Introdução à ADM", "Comunicação e Apresentações", "Como não surtar com prazos"]
  },
  {
    id: 2,
    nome: "Mariana Alves",
    iniciais: "MA",
    genero: "ela",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Corvinal",
    casaSlug: "corvinal",
    areaDestaque: "Gestão de Pessoas & Marketing",
    lemas: "Organizada, atenta e sempre com foco e serenidade para superar os desafios acadêmicos!",
    resumo: "Criativa, equilibrada e atenta aos detalhes. Apaixonada por leitura, organização estética e relações humanas no ambiente de trabalho.",
    respostasEsperadas: {
      1: ["A", "B"],
      2: ["A", "C"],
      3: ["B", "C"],
      4: ["C", "B"],
      5: ["B", "C"],
      6: ["A", "B"],
      7: ["B", "D"],
      8: ["A", "B"],
      9: ["A", "C"],
      10: ["A", "C", "D"],
      11: ["B", "C", "E"],
      12: ["B", "E"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Corvinal",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Gosto de ler, ouvir música, assistir séries, sair para tomar alguma coisa com minhas amigas e organizar referências visuais no Pinterest.",
      meme_que_representa_sua_personalidade: "Aquele meme da pessoa falando 'vai dar tudo certo' enquanto tudo parece caótico. Resume bem minha calma externa em dias de prova.",
      figurinha_que_representou_o_primeiro_periodo: "Uma figurinha com a frase 'cansada, porém seguindo firme'.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Taylor Swift. Provavelmente eu passaria a aula inteira tentando agir com naturalidade enquanto prestaria atenção em tudo."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Gestão de Pessoas. Gostei muito porque envolve comportamento, relações dentro das empresas e entender melhor como as pessoas funcionam em equipe.",
      materia_que_mais_testou_a_sanidade: "Matemática Financeira. No começo eu achava que tinha entendido, aí aparecia uma questão diferente e eu percebia o tamanho do desafio.",
      area_da_administracao_que_mais_chama_atencao: "Gestão de Pessoas e Marketing. Gosto bastante da parte de comunicação, comportamento e estratégias que envolvem entender o público.",
      maior_choque_de_realidade: "Descobrir que você realmente precisa aprender a administrar seu próprio tempo. Tem semana em que parece não ter nada e, de repente, aparecem três trabalhos e duas provas juntas."
    },
    vida_universitaria: {
      momento_mais_engracado: "Durante uma apresentação, uma amiga esqueceu o que ia falar e começou a ler o slide ao pé da letra com entonação dramática. Acabou todo mundo rindo junto.",
      momento_em_que_percebeu_que_virou_universitaria: "Quando estava adiantando trabalho no celular durante o intervalo, lanchando e planejando o estudo da noite.",
      coisa_que_eliminaria_da_vida_universitaria: "Apresentações de seminários marcadas para a mesma semana das provas bimestrais."
    },
    hobbies: ["Leitura", "Música", "Cafeterias", "Design Visual"],
    habilidades_mentoria: ["Organização de rotina sem estresse", "Resumos eficientes de matérias", "Apoio nas primeiras semanas"]
  },
  {
    id: 3,
    nome: "Gabriel Vasconcelos",
    iniciais: "GV",
    genero: "ele",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Sonserina",
    casaSlug: "sonserina",
    areaDestaque: "Finanças & Controladoria",
    lemas: "Se é mensurável, é gerenciável. O foco em números transforma planos em resultados.",
    resumo: "Analítico, determinado e focado no mercado financeiro. Adora desafios lógicos, investimentos e conhece profundamente a estrutura do curso.",
    respostasEsperadas: {
      1: ["A", "C"],
      2: ["B", "A"],
      3: ["C", "B"],
      4: ["A"],
      5: ["A", "D"],
      6: ["C", "E"],
      7: ["A", "C"],
      8: ["A"],
      9: ["D", "B"],
      10: ["B", "A"],
      11: ["C"],
      12: ["A", "D"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Sonserina",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Acompanhar notícias do mercado financeiro, jogar xadrez online, praticar musculação e pesquisar sobre indicadores econômicos.",
      meme_que_representa_sua_personalidade: "O meme clássico do Julius: 'Se eu não comprar, o desconto é de 100%'. Foco e prudência financeira sempre.",
      figurinha_que_representou_o_primeiro_periodo: "Um gráfico oscilando com a legenda: 'Tudo dentro do planejado'.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Warren Buffett ou Bernardinho, referências em foco estratégico e disciplina constante."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Matemática Aplicada. Enquanto muitos achavam pesado, achei gratificante estruturar cálculos e fórmulas de suporte a decisões.",
      materia_que_mais_testou_a_sanidade: "Sociologia das Organizações. Muito texto subjetivo; eu procurava uma lógica objetiva onde existiam múltiplas correntes teóricas.",
      area_da_administracao_que_mais_chama_atencao: "Finanças Corporativas, Controladoria e Análise de Investimentos.",
      maior_choque_de_realidade: "Aprender a orçar o custo do dia a dia acadêmico: passagens, alimentação e livros são a primeira prática real de ADM."
    },
    vida_universitaria: {
      momento_mais_engracado: "Fiz uma planilha detalhada com fórmulas para ratear a conta da confraternização da turma até os centavos e virei o auditor fiscal do período.",
      momento_em_que_percebeu_que_virou_universitario: "Quando comecei a analisar custos e investimentos reais aplicando o que aprendia nas matérias.",
      coisa_que_eliminaria_da_vida_universitaria: "Arquivos compartilhados sem padronização ABNT básica."
    },
    hobbies: ["Xadrez", "Finanças", "Treino de força", "Podcasts de Mercado"],
    habilidades_mentoria: ["Destravar Matemática e Finanças", "Planilhas de Estudos", "Orientação para Estágios"]
  },
  {
    id: 4,
    nome: "Camila Beatriz",
    iniciais: "CB",
    genero: "ela",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Lufa-Lufa",
    casaSlug: "lufalufa",
    areaDestaque: "Gestão de Pessoas & Clima Organizacional",
    lemas: "Ninguém fica para trás! A melhor gestão é aquela construída com acolhimento e respeito.",
    resumo: "Acolhedora por vocação, mediadora nata e sempre com uma palavra de apoio para tranquilizar quem estiver ansioso antes das avaliações.",
    respostasEsperadas: {
      1: ["D", "B"],
      2: ["A", "C"],
      3: ["B", "D"],
      4: ["D", "C"],
      5: ["B"],
      6: ["A"],
      7: ["D", "C"],
      8: ["B"],
      9: ["A", "B"],
      10: ["D", "C"],
      11: ["B", "A"],
      12: ["C", "B"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Lufa-Lufa",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Cozinhar receitas para amigos, cuidar de plantas, caminhar no parque Euclides Dourado e escutar MPB.",
      meme_que_representa_sua_personalidade: "Aquele meme do abraço sincero: 'Vai ficar tudo bem, estamos juntos nessa jornada'.",
      figurinha_que_representou_o_primeiro_periodo: "Figurinha de comemoração: 'Mais um dia de aula vencido com sucesso'.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Fernanda Montenegro, pela sabedoria, serenidade e acolhimento humano."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Comportamento Humano nas Organizações e Introdução à Administração.",
      materia_que_mais_testou_a_sanidade: "Estatística Básica. As distribuições de probabilidade exigiram bastante estudo conjunto na biblioteca.",
      area_da_administracao_que_mais_chama_atencao: "Recursos Humanos, Desenvolvimento de Líderes e Responsabilidade Socioambiental.",
      maior_choque_de_realidade: "A transição de morar perto do campus e gerenciar a própria rotina doméstica e acadêmica simultaneamente."
    },
    vida_universitaria: {
      momento_mais_engracado: "Levei um bolo caseiro para a aula e o professor pausou 15 minutos para todos lancharem porque ninguém produz bem em jejum.",
      momento_em_que_percebeu_que_virou_universitaria: "Quando uma garrafa térmica de café virou item indispensável na mochila para as aulas matinais.",
      coisa_que_eliminaria_da_vida_universitaria: "Falta de comunicação clara nas divisões de tarefas em grupo."
    },
    hobbies: ["Culinária", "Fotografia", "MPB", "Plantas e Jardinagem"],
    habilidades_mentoria: ["Acolhimento para calouros de outras cidades", "Dicas de convivência em grupo", "Inteligência Emocional"]
  },
  {
    id: 5,
    nome: "Matheus Albuquerque",
    iniciais: "MA",
    genero: "ele",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Grifinória",
    casaSlug: "grifinoria",
    areaDestaque: "Empreendedorismo & Inovação",
    lemas: "Ideia sem ação é apenas intenção. O segredo é colocar em prática e aprender rápido!",
    resumo: "Dinâmico, ligado no ecossistema de startups, atlética acadêmica e projetos que conectam a faculdade à prática do mercado.",
    respostasEsperadas: {
      1: ["C", "B"],
      2: ["C", "B"],
      3: ["A"],
      4: ["A", "B"],
      5: ["D", "C"],
      6: ["D"],
      7: ["A", "B"],
      8: ["B", "C"],
      9: ["C"],
      10: ["C", "E"],
      11: ["A", "D"],
      12: ["C", "E"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Grifinória",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Participar de maratonas de inovação, praticar esportes com o pessoal do curso e ler sobre novos modelos de negócios.",
      meme_que_representa_sua_personalidade: "Meme do 'Vamos nessa, o desafio é o que move a gente!'.",
      figurinha_que_representou_o_primeiro_periodo: "Figurinha de comemoração ao enviar o trabalho antes do prazo final com sucesso.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Flávio Augusto ou Marcos Mion, pela energia empreendedora e capacidade de articulação."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Empreendedorismo e Criação de Novos Negócios.",
      materia_que_mais_testou_a_sanidade: "Contabilidade Geral. Fechar balanço patrimonial e entender partidas dobradas foi um verdadeiro teste de paciência.",
      area_da_administracao_que_mais_chama_atencao: "Inovação, Startups, Gestão de Projetos e Desenvolvimento de Marcas.",
      maior_choque_de_realidade: "Perceber que ter boas ideias é o passo inicial; a consistência diária de execução é o que gera valor real."
    },
    vida_universitaria: {
      momento_mais_engracado: "Fizemos uma simulação de vendas no corredor do curso e o coordenador do bacharelado foi nosso primeiro cliente.",
      momento_em_que_percebeu_que_virou_universitario: "Quando criei um grupo de apoio aos colegas para tirar dúvidas de sistemas acadêmicos e prazos.",
      coisa_que_eliminaria_da_vida_universitaria: "Aulas teóricas extensas sem pausas ativas."
    },
    hobbies: ["Esportes", "Inovação", "Podcasts de Negócios", "Eventos Acadêmicos"],
    habilidades_mentoria: ["Como ingressar na Empresa Júnior e Atlética", "Oratória e Pitch", "Metodologias Ágeis"]
  },
  {
    id: 6,
    nome: "Beatriz Rocha",
    iniciais: "BR",
    genero: "ela",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Corvinal",
    casaSlug: "corvinal",
    areaDestaque: "Estratégia Empresarial & Consultoria",
    lemas: "Diagnóstico preciso, planejamento estruturado e execução sem improviso desnecessário.",
    resumo: "Estrategista nata, altamente organizada em ferramentas de produtividade, com visão holística sobre tomada de decisão corporativa.",
    respostasEsperadas: {
      1: ["A", "C"],
      2: ["A", "D"],
      3: ["B", "C"],
      4: ["A", "C"],
      5: ["D", "B"],
      6: ["E"],
      7: ["A", "C"],
      8: ["A"],
      9: ["D", "C"],
      10: ["A", "D"],
      11: ["C", "B"],
      12: ["A", "E"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Corvinal",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Estruturar notas de estudo no Notion, ler biografias de lideranças, degustar cafés especiais e assistir a documentários.",
      meme_que_representa_sua_personalidade: "Meme do raciocínio analítico: ponderando todas as variáveis antes de propor um direcionamento.",
      figurinha_que_representou_o_primeiro_periodo: "Figurinha de uma prancheta organizada com checklist 100% preenchido.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Anitta, pela clareza de visão estratégica e gestão de carreira impecável."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Teoria Geral da Administração (TGA) e Pensamento Estratégico.",
      materia_que_mais_testou_a_sanidade: "Instituições de Direito Público e Privado. O vocabulário jurídico denso exigiu bastante tempo de leitura minuciosa.",
      area_da_administracao_que_mais_chama_atencao: "Planejamento Estratégico, Consultoria de Gestão e Governança Corporativa.",
      maior_choque_de_realidade: "Compreender que as leituras bibliográficas indicadas são fundamentais para fundamentar intervenções em sala."
    },
    vida_universitaria: {
      momento_mais_engracado: "Elaborei um cronograma com código de cores para um projeto em grupo e os colegas acharam que era uma cartela de amostra de tintas.",
      momento_em_que_percebeu_que_virou_universitaria: "Quando comecei a aplicar análise SWOT informal para solucionar impasses do dia a dia.",
      coisa_que_eliminaria_da_vida_universitaria: "Reuniões que poderiam ser resolvidas com um resumo objetivo em texto."
    },
    hobbies: ["Produtividade & Notion", "Cafés Especiais", "Leitura de Estratégia", "Cinema"],
    habilidades_mentoria: ["Estruturação de estudos no Notion", "Metodologia científica e resenhas", "Visão de carreira em Consultoria"]
  },
  {
    id: 7,
    nome: "Pedro Henrique",
    iniciais: "PH",
    genero: "ele",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Lufa-Lufa",
    casaSlug: "lufalufa",
    areaDestaque: "Logística & Cadeia de Suprimentos",
    lemas: "Manter o fluxo contínuo e a cabeça no lugar: problemas complexos se resolvem passo a passo.",
    resumo: "Tranquilo, acolhedor e focado em processos eficientes. Adora tecnologia, logística, jogos e sempre ajuda a integrar a turma com calma.",
    respostasEsperadas: {
      1: ["D", "A"],
      2: ["B", "A"],
      3: ["C", "D"],
      4: ["B", "D"],
      5: ["D", "A"],
      6: ["E", "C"],
      7: ["C", "D"],
      8: ["B", "C"],
      9: ["B", "A"],
      10: ["B", "D"],
      11: ["B", "D"],
      12: ["D", "B"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Lufa-Lufa",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Jogar online com amigos, ouvir música, preparar lanches práticos e acompanhar novidades de tecnologia.",
      meme_que_representa_sua_personalidade: "Meme do cachorro tranquilo tomando chá: 'Mantenha a serenidade que tudo se ajeita'.",
      figurinha_que_representou_o_primeiro_periodo: "Figurinha reflexiva contemplando o horizonte no intervalo das aulas.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Casimiro Miguel, pela descontração e autenticidade ao comentar qualquer situação."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Fundamentos de Economia e Introdução à Logística.",
      materia_que_mais_testou_a_sanidade: "Metodologia Científica. As regras de formatação e citações da ABNT tomaram várias madrugadas.",
      area_da_administracao_que_mais_chama_atencao: "Logística, Gestão de Operações e Cadeia de Suprimentos.",
      maior_choque_de_realidade: "Descobrir que a pontualidade do transporte público e a logística de deslocamento diário ditam o ritmo da faculdade."
    },
    vida_universitaria: {
      momento_mais_engracado: "Tirei um cochilo de 15 minutos na biblioteca e acordei cercado de livros com os colegas registrando a cena.",
      momento_em_que_percebeu_que_virou_universitario: "Quando comemorei encontrar uma mesa livre no restaurante universitário sem fila.",
      coisa_que_eliminaria_da_vida_universitaria: "Seminários não agendados em sextas-feiras no último horário."
    },
    hobbies: ["Jogos Eletrônicos", "Música Lo-Fi", "Tecnologia", "Gastronomia Simples"],
    habilidades_mentoria: ["Rotinas e macetes do campus da UFAPE", "Mapas mentais de matérias", "Manter a tranquilidade antes de provas"]
  },
  {
    id: 8,
    nome: "Larissa Menezes",
    iniciais: "LM",
    genero: "ela",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Sonserina",
    casaSlug: "sonserina",
    areaDestaque: "Marketing Digital & Comunicação Corporativa",
    lemas: "Comunicação assertiva e posicionamento estratégico abrem todas as portas no ambiente profissional.",
    resumo: "Super comunicativa, atenta às redes, branding pessoal e especialista em aproximar pessoas, oportunidades e eventos no curso de ADM.",
    respostasEsperadas: {
      1: ["B", "C"],
      2: ["C", "B"],
      3: ["A"],
      4: ["B", "A"],
      5: ["C", "B"],
      6: ["B"],
      7: ["B", "A"],
      8: ["B", "C"],
      9: ["A"],
      10: ["C", "E"],
      11: ["A", "D"],
      12: ["C", "E"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Sonserina",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Produzir conteúdo para mídias sociais, participar de encontros acadêmicos, fotografia e explorar novos pontos em Garanhuns.",
      meme_que_representa_sua_personalidade: "Meme da animação e entusiasmo: energia renovada para cada novo projeto.",
      figurinha_que_representou_o_primeiro_periodo: "Figurinha animada anunciando a chegada da semana de entregas finais.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Bianca Andrade, pela visão de branding corporativo e estratégias de posicionamento de mercado."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Comunicação Empresarial e Princípios de Marketing.",
      materia_que_mais_testou_a_sanidade: "Matemática Aplicada. As equações e funções exigiram bastante treino intensivo com colegas.",
      area_da_administracao_que_mais_chama_atencao: "Marketing Digital, Branding, Mídias Sociais e Relações Corporativas.",
      maior_choque_de_realidade: "Entender que carisma e comunicação são valiosos, mas decisões sólidas em ADM demandam dados e métricas concretas."
    },
    vida_universitaria: {
      momento_mais_engracado: "Fui registrar um vídeo rápido pelos corredores da universidade e a equipe de apoio entrou na gravação cumprimentando a turma.",
      momento_em_que_percebeu_que_virou_universitaria: "Quando estruturei uma rede colaborativa de caronas solidárias para otimizar os trajetos da turma.",
      coisa_que_eliminaria_da_vida_universitaria: "Professores que demoram a disponibilizar o material complementar no ambiente virtual."
    },
    hobbies: ["Criação de Conteúdo", "Eventos", "Fotografia Mobile", "Comunicação & Tendências"],
    habilidades_mentoria: ["Técnicas de oratória e desenvoltura em público", "Construção de Networking", "Oportunidades de bolsas e projetos"]
  },
  {
    id: 9,
    nome: "Thiago Silveira",
    iniciais: "TS",
    genero: "ele",
    periodo: "2º Período de Administração - UFAPE",
    casaHogwarts: "Corvinal",
    casaSlug: "corvinal",
    areaDestaque: "Gestão Pública & Sustentabilidade",
    lemas: "Administração com propósito: aplicar a ciência da gestão para impactar positivamente a sociedade e o Agreste.",
    resumo: "Consciente, crítico e entusiasmado pelo desenvolvimento regional. Aprecia debates bem embasados, extensão comunitária e boa literatura.",
    respostasEsperadas: {
      1: ["A", "D"],
      2: ["A", "D"],
      3: ["B", "C"],
      4: ["C", "A"],
      5: ["B", "D"],
      6: ["E", "F"],
      7: ["D", "C"],
      8: ["A", "B"],
      9: ["C", "B"],
      10: ["D", "A"],
      11: ["C", "B"],
      12: ["E", "C"]
    },
    para_conhecer_voce: {
      casa_de_hogwarts: "Corvinal",
      o_que_gosta_de_fazer_quando_nao_esta_estudando: "Participar de iniciativas voluntárias, pedalar por Garanhuns, ler autores brasileiros e conversar em cafeterias.",
      meme_que_representa_sua_personalidade: "Meme do pensador clássico com olhar atento e reflexivo sobre a realidade ao redor.",
      figurinha_que_representou_o_primeiro_periodo: "Figurinha clássica do estudante determinado com a mochila organizada.",
      pessoa_famosa_para_sentir_ao_lado_na_aula: "Ariano Suassuna, pela valorização cultural nordestina e profundidade de princípios."
    },
    experiencia_no_curso: {
      materia_preferida_no_primeiro_periodo: "Introdução à Administração e Ciência Política.",
      materia_que_mais_testou_a_sanidade: "Estatística Aplicada. Compreender desvios-padrão e análises de variância exigiu dedicação contínua.",
      area_da_administracao_que_mais_chama_atencao: "Administração Pública, Terceiro Setor, ESG e Desenvolvimento Regional Sustentável.",
      maior_choque_de_realidade: "Compreender a imensidão de oportunidades que uma universidade pública oferece além da sala de aula (pesquisa, extensão e representação)."
    },
    vida_universitaria: {
      momento_mais_engracado: "Fiz uma defesa conceitual longa e detalhada num debate de aula e descobri que o professor esperava apenas um 'sim' ou 'não'.",
      momento_em_que_percebeu_que_virou_universitario: "Quando comecei a carregar ecobag, garrafa de água e cadernos de campo para todas as atividades.",
      coisa_que_eliminaria_da_vida_universitaria: "Aulas sem debates interativos entre os estudantes."
    },
    hobbies: ["Ciclismo", "Literatura Brasileira", "Projetos Sociais", "Cafeterias"],
    habilidades_mentoria: ["Ingresso em Iniciação Científica e Extensão", "Visão ética e sustentável", "Adaptação à vida universitária na UFAPE"]
  }
];
