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
    "id": 1,
    "nome": "Adelmo Felix",
    "iniciais": "AF",
    "genero": "ele",
    "email_institucional": "adelmo.felix@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Lufa-Lufa",
    "casaSlug": "lufalufa",
    "areaDestaque": "Economia & Gestão Geral",
    "lemas": "Determinado e parceiro: o aprendizado é construído passo a passo com dedicação!",
    "resumo": "Praticante de esportes e focado no crescimento acadêmico. Enfrentou a matemática aplicada com garra e acolhe com energia positiva.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "C",
        "A"
      ],
      "2": [
        "D",
        "C"
      ],
      "3": [
        "B",
        "C"
      ],
      "4": [
        "C",
        "A"
      ],
      "5": [
        "C",
        "B"
      ],
      "6": [
        "D",
        "B"
      ],
      "7": [
        "B",
        "C"
      ],
      "8": [
        "B",
        "C"
      ],
      "9": [
        "B",
        "C"
      ],
      "10": [
        "C",
        "B"
      ],
      "11": [
        "C",
        "D"
      ],
      "12": [
        "B",
        "C"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Lufa-Lufa",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Praticar esportes.",
      "meme_que_representa_sua_personalidade": "Agostinho Carrara da Grande Família, falando que todas as classes odeiam ele.",
      "figurinha_que_representou_o_primeiro_periodo": "Não sou de usar figurinhas.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Mano Brown (Racionais MC's)."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Administração.",
      "materia_que_mais_testou_a_sanidade": "Matemática Aplicada.",
      "area_da_administracao_que_mais_chama_atencao": "Economia.",
      "maior_choque_de_realidade": "Matemática é cruel..."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Contar os décimos das notas, tipo contando migalhas para ver se passo.",
      "momento_em_que_percebeu_que_virou_universitario": "Apresentação de seminário e entregas de trabalhos com prazos apertados.",
      "coisa_que_eliminaria_da_vida_universitaria": "Aula na sexta-feira à noite."
    },
    "hobbies": [
      "Prática de Esportes",
      "Futebol",
      "Música Nacional",
      "Resenha Universitária"
    ],
    "habilidades_mentoria": [
      "Sobrevivência em Matemática",
      "Dicas de Introdução à Administração",
      "Apoio e acolhimento prático"
    ]
  },
  {
    "id": 2,
    "nome": "Anderson Daniel",
    "iniciais": "AD",
    "genero": "ele",
    "email_institucional": "anderson.daniel@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Lufa-Lufa",
    "casaSlug": "lufalufa",
    "areaDestaque": "Gestão Financeira & Economia",
    "lemas": "A universidade é bem mais tranquila e proveitosa quando você encontra bons amigos e o ritmo certo!",
    "resumo": "Espirituoso, gamer e focado em finanças. Acredita no equilíbrio entre o foco nas matérias de economia e as amizades da cantina.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "A",
        "B"
      ],
      "2": [
        "B",
        "C"
      ],
      "3": [
        "A",
        "B"
      ],
      "4": [
        "A",
        "C"
      ],
      "5": [
        "A",
        "C"
      ],
      "6": [
        "C",
        "D"
      ],
      "7": [
        "B",
        "D"
      ],
      "8": [
        "B",
        "A"
      ],
      "9": [
        "A",
        "C"
      ],
      "10": [
        "B",
        "C"
      ],
      "11": [
        "D",
        "A"
      ],
      "12": [
        "B",
        "C"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Lufa-Lufa",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Jogar esportes e jogos no celular.",
      "meme_que_representa_sua_personalidade": "Averiguando possível resenha.",
      "figurinha_que_representou_o_primeiro_periodo": "Eu tenho o sabimento na palma das minhas mãos.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Papa Leão XIV."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Economia.",
      "materia_que_mais_testou_a_sanidade": "Matemática aplicada à Administração.",
      "area_da_administracao_que_mais_chama_atencao": "Gestão Financeira.",
      "maior_choque_de_realidade": "Que a faculdade é bem mais tranquila e livre do que a escola."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Comemorar o aniversário de dois amigos na cantina.",
      "momento_em_que_percebeu_que_virou_universitario": "Todas as provas caindo exatamente na mesma semana.",
      "coisa_que_eliminaria_da_vida_universitaria": "Projeto de extensão com prazos acumulados."
    },
    "hobbies": [
      "Jogos Mobile",
      "Esportes",
      "Cantina com Amigos",
      "Economia"
    ],
    "habilidades_mentoria": [
      "Introdução à Economia",
      "Gestão Financeira",
      "Adaptação ao campus"
    ]
  },
  {
    "id": 3,
    "nome": "Cibele Leite",
    "iniciais": "CL",
    "genero": "ela",
    "email_institucional": "cibele.leite@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Corvinal",
    "casaSlug": "corvinal",
    "areaDestaque": "Empreendedorismo, Marketing & Contabilidade",
    "lemas": "Administrar o curso é aprender primeiro a administrar a própria vida e a rotina!",
    "resumo": "Criativa, desenhista e atenta aos detalhes. Apaixonada por marketing, contabilidade introdutória e animes.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "A",
        "D"
      ],
      "2": [
        "A",
        "D"
      ],
      "3": [
        "C",
        "B"
      ],
      "4": [
        "B",
        "A"
      ],
      "5": [
        "B",
        "D"
      ],
      "6": [
        "B",
        "E"
      ],
      "7": [
        "C",
        "A"
      ],
      "8": [
        "A",
        "B"
      ],
      "9": [
        "C",
        "A"
      ],
      "10": [
        "B",
        "D"
      ],
      "11": [
        "C",
        "B"
      ],
      "12": [
        "A",
        "E"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Corvinal",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Desenhar, ouvir música e assistir anime.",
      "meme_que_representa_sua_personalidade": "Não informado.",
      "figurinha_que_representou_o_primeiro_periodo": "Não informada.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Ana Caetano (duo Anavitória)."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Contabilidade.",
      "materia_que_mais_testou_a_sanidade": "Matemática aplicada à Administração.",
      "area_da_administracao_que_mais_chama_atencao": "Empreendedorismo e Marketing.",
      "maior_choque_de_realidade": "Descobrir que além de aprender Administração, eu também precisava aprender a administrar minha própria vida, meus prazos e minha falta de organização. A faculdade exige muito mais organização e responsabilidade do que eu imaginava."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Um momento engraçado foi que nos primeiros dias de aula acabei saindo da sala pra andar um pouco e quase me perdi no campus.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando usei a farda de Administração pela primeira vez me fez cair a real que realmente tinha me tornado uma universitária.",
      "coisa_que_eliminaria_da_vida_universitaria": "Eliminaria os seminários. Com certeza."
    },
    "hobbies": [
      "Desenho & Ilustração",
      "Animes & Mangás",
      "Música Brasileira",
      "Café"
    ],
    "habilidades_mentoria": [
      "Contabilidade Básica",
      "Marketing & Criação",
      "Organização pessoal e horários"
    ]
  },
  {
    "id": 4,
    "nome": "Heloísa Barreto",
    "iniciais": "HB",
    "genero": "ela",
    "email_institucional": "heloisa.barreto@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Corvinal",
    "casaSlug": "corvinal",
    "areaDestaque": "Gestão Financeira & Estratégia",
    "lemas": "Curiosidade intelectual sem limites: se alguém escreveu, eu vou estudar até entender tudo!",
    "resumo": "Idealizadora do programa de apadrinhamento e líder nata. Leitora voraz, apaixonada pelo mercado financeiro e por autonomia acadêmica.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "A",
        "C"
      ],
      "2": [
        "A",
        "C"
      ],
      "3": [
        "B",
        "C"
      ],
      "4": [
        "A",
        "B"
      ],
      "5": [
        "A",
        "B"
      ],
      "6": [
        "C",
        "B"
      ],
      "7": [
        "A",
        "C"
      ],
      "8": [
        "A",
        "C"
      ],
      "9": [
        "A",
        "C"
      ],
      "10": [
        "B",
        "A"
      ],
      "11": [
        "C",
        "A"
      ],
      "12": [
        "A",
        "E"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Corvinal",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Gosto de ler e aprender coisas aleatórias.",
      "meme_que_representa_sua_personalidade": "Clóvis de Barros Filho: \"Como pode um cara escrever uma coisa que eu não entenda? Não tem como. Eu vou ler aquela merda até entender!\"",
      "figurinha_que_representou_o_primeiro_periodo": "Figurinha enviada à coordenação (em processamento).",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Emma Watson. Acho ela muito inteligente, interessante e seria muito legal conversar com ela sobre estudos, livros e vários outros assuntos."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Administração.",
      "materia_que_mais_testou_a_sanidade": "Introdução à Economia.",
      "area_da_administracao_que_mais_chama_atencao": "A área financeira.",
      "maior_choque_de_realidade": "Perceber que a faculdade exige muito mais autonomia e organização do que eu imaginava. Ninguém fica lembrando você do que precisa fazer, então acaba sendo muito mais você por você mesmo."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "O dia em que o professor de Filosofia faltou e uma galera foi para a aula sem saber. Aí a gente começou a falar no grupo da sala que estava acontecendo uma coisa importante para fazer o pessoal ir também. Quando chegavam lá, descobriam que tinham caído no trote que a gente inventou kkkkkkkkk.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando eu me vi reclamando que tinha coisa demais para estudar e, ao mesmo tempo, sem saber nem por onde começar.",
      "coisa_que_eliminaria_da_vida_universitaria": "Trabalho em grupo, sem pensar duas vezes."
    },
    "hobbies": [
      "Leitura",
      "Podcasts de Conhecimento",
      "Finanças",
      "Projetos Acadêmicos"
    ],
    "habilidades_mentoria": [
      "Visão Geral de ADM",
      "Autonomia de Estudos",
      "Estratégia e Planejamento de Carreira"
    ]
  },
  {
    "id": 5,
    "nome": "Joice Vitoria",
    "iniciais": "JV",
    "genero": "ela",
    "email_institucional": "joice.vitoria@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Sonserina",
    "casaSlug": "sonserina",
    "areaDestaque": "Contabilidade & Gestão",
    "lemas": "Foco nos objetivos e resiliência total para superar qualquer desafio de cálculo!",
    "resumo": "Espontânea, determinada e apaixonada por culinária. Sincera sobre os percalços de cálculo e sempre disposta a estender a mão aos novos alunos.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "B",
        "C"
      ],
      "2": [
        "C",
        "B"
      ],
      "3": [
        "A",
        "B"
      ],
      "4": [
        "C",
        "B"
      ],
      "5": [
        "C",
        "B"
      ],
      "6": [
        "D",
        "A"
      ],
      "7": [
        "B",
        "C"
      ],
      "8": [
        "C",
        "B"
      ],
      "9": [
        "B",
        "C"
      ],
      "10": [
        "C",
        "D"
      ],
      "11": [
        "A",
        "D"
      ],
      "12": [
        "C",
        "B"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Sonserina",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Cozinhar.",
      "meme_que_representa_sua_personalidade": "Qualquer um do IShowSpeed com energia a 1000%.",
      "figurinha_que_representou_o_primeiro_periodo": "😱",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Cristiano Ronaldo."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Contabilidade e Administração.",
      "materia_que_mais_testou_a_sanidade": "Matemática.",
      "area_da_administracao_que_mais_chama_atencao": "Contabilidade.",
      "maior_choque_de_realidade": "Cálculo I."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Dar risada dos próprios perrengues acadêmicos na cantina com a turma.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando reprovei em Cálculo I.",
      "coisa_que_eliminaria_da_vida_universitaria": "Cálculo I."
    },
    "hobbies": [
      "Gastronomia & Culinária",
      "Futebol",
      "Mídias Sociais",
      "Séries"
    ],
    "habilidades_mentoria": [
      "Dicas de Contabilidade",
      "Como lidar com notas e provas",
      "Companheirismo e motivação"
    ]
  },
  {
    "id": 6,
    "nome": "Jones Nascimento",
    "iniciais": "JN",
    "genero": "ele",
    "email_institucional": "jones.nascimento@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Grifinória",
    "casaSlug": "grifinoria",
    "areaDestaque": "Estratégia Interempresarial & Filosofia",
    "lemas": "O ambiente universitário é feito de amizades sólidas e visão estratégica de futuro!",
    "resumo": "Sociável, boleiro e focado em estratégia corporativa. Adora debater ética empresarial e aproveitar os bons momentos com os amigos.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "B",
        "C"
      ],
      "2": [
        "C",
        "B"
      ],
      "3": [
        "A",
        "B"
      ],
      "4": [
        "B",
        "C"
      ],
      "5": [
        "C",
        "B"
      ],
      "6": [
        "B",
        "D"
      ],
      "7": [
        "B",
        "C"
      ],
      "8": [
        "B",
        "C"
      ],
      "9": [
        "B",
        "A"
      ],
      "10": [
        "A",
        "C"
      ],
      "11": [
        "A",
        "D"
      ],
      "12": [
        "C",
        "E"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Grifinória",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Jogar bola ou sair com os amigos.",
      "meme_que_representa_sua_personalidade": "O da criança chorando porque o Corinthians foi campeão.",
      "figurinha_que_representou_o_primeiro_periodo": "Não informada.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Yuri Alberto."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Filosofia e Ética.",
      "materia_que_mais_testou_a_sanidade": "Cálculo.",
      "area_da_administracao_que_mais_chama_atencao": "A parte do sistema estratégico do relacionamento entre as empresas.",
      "maior_choque_de_realidade": "Ter que estudar."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Os momentos com meus amigos da sala.",
      "momento_em_que_percebeu_que_virou_universitario": "\"Agora fudeu\"",
      "coisa_que_eliminaria_da_vida_universitaria": "Matemática."
    },
    "hobbies": [
      "Futebol",
      "Encontros com Amigos",
      "Debates Estratégicos",
      "Esportes"
    ],
    "habilidades_mentoria": [
      "Filosofia e Ética",
      "Visão de Negócios e Parcerias",
      "Socialização no campus"
    ]
  },
  {
    "id": 7,
    "nome": "Renaly Andrade",
    "iniciais": "RA",
    "genero": "ela",
    "email_institucional": "renaly.andrade@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Corvinal",
    "casaSlug": "corvinal",
    "areaDestaque": "Gestão de Pessoas & Logística",
    "lemas": "Dedicação aos estudos e cuidado com o bem-estar: equilíbrio é a chave da graduação!",
    "resumo": "Dedicada, fã de academia e séries. Tem grande afinidade com contabilidade introdutória, logística e desenvolvimento de equipes.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "A",
        "D"
      ],
      "2": [
        "A",
        "D"
      ],
      "3": [
        "B",
        "C"
      ],
      "4": [
        "A",
        "B"
      ],
      "5": [
        "A",
        "B"
      ],
      "6": [
        "A",
        "D"
      ],
      "7": [
        "C",
        "A"
      ],
      "8": [
        "A",
        "B"
      ],
      "9": [
        "A",
        "B"
      ],
      "10": [
        "B",
        "C"
      ],
      "11": [
        "C",
        "B"
      ],
      "12": [
        "A",
        "B"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Corvinal 💙",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Ir à academia e assistir minhas séries.",
      "meme_que_representa_sua_personalidade": "Aquele dos ET se abraçando.",
      "figurinha_que_representou_o_primeiro_periodo": "A figurinha de desespero.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Algum gênio da matemática. 🧮"
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Contabilidade.",
      "materia_que_mais_testou_a_sanidade": "Cálculo 1.",
      "area_da_administracao_que_mais_chama_atencao": "Gestão de Pessoas e Logística.",
      "maior_choque_de_realidade": "A rotina. Saí direto do ensino médio e foi um choque conciliar tudo."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Não consigo lembrar de nenhum. Foi tudo um pouco tenso.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando comecei a deixar os trabalhos para a última hora por conta da rotina.",
      "coisa_que_eliminaria_da_vida_universitaria": "Cálculo 1. Com certeza."
    },
    "hobbies": [
      "Academia & Musculação",
      "Séries e Filmes",
      "Leitura",
      "Saúde e Bem-Estar"
    ],
    "habilidades_mentoria": [
      "Introdução à Contabilidade",
      "Gestão de Pessoas e Logística",
      "Transição do Ensino Médio"
    ]
  },
  {
    "id": 8,
    "nome": "Richard Silva",
    "iniciais": "RS",
    "genero": "ele",
    "email_institucional": "richard.cssilva@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Lufa-Lufa",
    "casaSlug": "lufalufa",
    "areaDestaque": "Finanças Corporativas & Contabilidade",
    "lemas": "O aprendizado justo é aquele incitado pelo esforço, gerando constante perfeição de conhecimento. Passar sem aprender é perder tempo!",
    "resumo": "Reflexivo, cinéfilo e focado no domínio prático das finanças. Valoriza o mérito do estudo sincero e o bom humor entre colegas.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "C",
        "A"
      ],
      "2": [
        "A",
        "C"
      ],
      "3": [
        "B",
        "C"
      ],
      "4": [
        "A",
        "C"
      ],
      "5": [
        "A",
        "C"
      ],
      "6": [
        "C",
        "D"
      ],
      "7": [
        "A",
        "C"
      ],
      "8": [
        "A",
        "B"
      ],
      "9": [
        "A",
        "B"
      ],
      "10": [
        "B",
        "A"
      ],
      "11": [
        "C",
        "B"
      ],
      "12": [
        "D",
        "A"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Lufa-Lufa",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Assistir filmes, jogar futebol e dormir.",
      "meme_que_representa_sua_personalidade": "The Office.",
      "figurinha_que_representou_o_primeiro_periodo": "Não informada.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Robert De Niro."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Contabilidade.",
      "materia_que_mais_testou_a_sanidade": "Matemática aplicada à adm e contabilidade.",
      "area_da_administracao_que_mais_chama_atencao": "Finanças.",
      "maior_choque_de_realidade": "O aprendizado justo é aquele incitado pelo esforço, o que gera uma constante perfeita de conhecimento. Passar sem aprender é perder tempo!"
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Quando eu bati o carro e ficaram tirando onda no grupo da turma.",
      "momento_em_que_percebeu_que_virou_universitario": "Período de provas.",
      "coisa_que_eliminaria_da_vida_universitaria": "O estresse, com certeza."
    },
    "hobbies": [
      "Cinema & Séries",
      "Futebol",
      "The Office",
      "Finanças"
    ],
    "habilidades_mentoria": [
      "Contabilidade Financeira",
      "Rigor acadêmico com ética",
      "Apoio prático para provas"
    ]
  },
  {
    "id": 9,
    "nome": "Tamires Ferreira",
    "iniciais": "TF",
    "genero": "ela",
    "email_institucional": "tamires.ferreira@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Grifinória",
    "casaSlug": "grifinoria",
    "areaDestaque": "Gestão de Pessoas & Introdução à ADM",
    "lemas": "Acolhimento caloroso e amizade verdadeira: dividindo a sala com pessoas incríveis e construindo pontes!",
    "resumo": "Sociável, alegre e empática. Tem 4 vagas e muita energia para orientar na adaptação à rotina da UFAPE.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "B",
        "D"
      ],
      "2": [
        "C",
        "D"
      ],
      "3": [
        "A",
        "B"
      ],
      "4": [
        "B",
        "A"
      ],
      "5": [
        "B",
        "C"
      ],
      "6": [
        "A",
        "F"
      ],
      "7": [
        "B",
        "C"
      ],
      "8": [
        "C",
        "B"
      ],
      "9": [
        "B",
        "C"
      ],
      "10": [
        "D",
        "C"
      ],
      "11": [
        "A",
        "D"
      ],
      "12": [
        "C",
        "B"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Grifinória",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Sair com amigos.",
      "meme_que_representa_sua_personalidade": "Confundir o cachorro com uma pedra na rua.",
      "figurinha_que_representou_o_primeiro_periodo": "Menininho chorando.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Zezé Di Camargo, pra fazer um show ao vivo."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Administração.",
      "materia_que_mais_testou_a_sanidade": "Introdução à Economia.",
      "area_da_administracao_que_mais_chama_atencao": "Gestão de Pessoas.",
      "maior_choque_de_realidade": "Professores super compreensíveis."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Sair com amigo(a)s pós-prova pra comer pastel.",
      "momento_em_que_percebeu_que_virou_universitario": "Dividir a sala com pessoas super inteligentes.",
      "coisa_que_eliminaria_da_vida_universitaria": "Provas!"
    },
    "hobbies": [
      "Passeios com Amigos",
      "Música Sertaneja",
      "Pastel Pós-Prova",
      "Comunicação"
    ],
    "habilidades_mentoria": [
      "Gestão de Pessoas e Empatia",
      "Comunicação com Professores",
      "Acolhimento aos Calouros"
    ]
  },
  {
    "id": 10,
    "nome": "Manoel Frasão",
    "iniciais": "MF",
    "genero": "ele",
    "email_institucional": "manoel.araujoneto@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Sonserina",
    "casaSlug": "sonserina",
    "areaDestaque": "Empreendedorismo & Setor Bancário",
    "lemas": "Apaixonado por inovação e novos negócios: superando os cálculos e construindo oportunidades!",
    "resumo": "Gamer, leitor e parceiro de resenhas. Venceu os desafios de cálculo e adora empreendedorismo e o mercado financeiro.",
    "limite_vagas": 4,
    "respostasEsperadas": {
      "1": [
        "C",
        "A"
      ],
      "2": [
        "B",
        "A"
      ],
      "3": [
        "A",
        "B"
      ],
      "4": [
        "B",
        "A"
      ],
      "5": [
        "D",
        "A"
      ],
      "6": [
        "D",
        "C"
      ],
      "7": [
        "A",
        "C"
      ],
      "8": [
        "B",
        "A"
      ],
      "9": [
        "A",
        "C"
      ],
      "10": [
        "B",
        "C"
      ],
      "11": [
        "D",
        "E"
      ],
      "12": [
        "C",
        "E"
      ]
    },
    "para_conhecer_voce": {
      "casa_de_hogwarts": "Sonserina",
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Gosto de jogar, ler e gosto muito de sair com meu amigos, são os melhores momentos que tenho.",
      "meme_que_representa_sua_personalidade": "\"O capitalismo só vai acabar quando nós, o povo soviético saímos apedrejando todos os carros que tiverem na rua. E eu quero todo mundo parando de trabalhar nessa porra!\"",
      "figurinha_que_representou_o_primeiro_periodo": "Não informada.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Major RD."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Com certeza Introdução a Economia, me ajudou muito a entender vários conceitos que me apareceram no dia a dia.",
      "materia_que_mais_testou_a_sanidade": "Matemática Aplicada a ADM (cálculo I).",
      "area_da_administracao_que_mais_chama_atencao": "Sou apaixonado por empreendedorismo, mas gosto de setor bancário também.",
      "maior_choque_de_realidade": "A diferença de dedicação que você tem que ter, em comparação ao ensino médio."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Uma crise de riso depois de um colega tirar um tablet GIGANTE pra tirar uma foto do quadro.",
      "momento_em_que_percebeu_que_virou_universitario": "No meu curso anterior, quando fiz minha primeira prova de Geometria Analítica e acabei tirando 2.",
      "coisa_que_eliminaria_da_vida_universitaria": "A falta de oportunidades de projetos, visitas técnicas, estágios e etc."
    },
    "hobbies": [
      "Jogos & Games",
      "Leitura",
      "Rolê com Amigos",
      "Empreendedorismo"
    ],
    "habilidades_mentoria": [
      "Introdução à Economia",
      "Empreendedorismo & Finanças",
      "Superação em Cálculo"
    ]
  }
];

// Alias para retrocompatibilidade
export const PADRINHOS_DATA = PADRINHOS;
