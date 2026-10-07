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
    "nome": "Adelmo Felix de Brito Leite",
    "iniciais": "AF",
    "genero": "ele",
    "email_institucional": "adelmo.felix@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Lufa-Lufa",
    "casaSlug": "lufalufa",
    "areaDestaque": "Economia & Gestão Geral",
    "lemas": "Determinado e parceiro: o aprendizado é construído passo a passo com dedicação!",
    "resumo": "Praticante de esportes e focado no crescimento acadêmico. Enfrentou a matemática aplicada com garra e acolhe com energia positiva.",
    "limite_vagas": 5,
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
      "figurinha_que_representou_o_primeiro_periodo": "Não sou muito de usar figurinhas (foco no papo direto!).",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Mano Brown (Racionais MC's)."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Administração.",
      "materia_que_mais_testou_a_sanidade": "Matemática Aplicada.",
      "area_da_administracao_que_mais_chama_atencao": "Economia.",
      "maior_choque_de_realidade": "Matemática é cruel, mas com estudo em grupo a gente vence!"
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
    "nome": "Anderson Daniel Oliveira Leite",
    "iniciais": "AD",
    "genero": "ele",
    "email_institucional": "anderson.daniel@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Lufa-Lufa",
    "casaSlug": "lufalufa",
    "areaDestaque": "Gestão Financeira & Economia",
    "lemas": "A universidade é bem mais tranquila e proveitosa quando você encontra bons amigos e o ritmo certo!",
    "resumo": "Espirituoso, gamer e focado em finanças. Acredita no equilíbrio entre o foco nas matérias de economia e as amizades da cantina.",
    "limite_vagas": 5,
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
      "momento_mais_engracado": "Comemorar o aniversário de dois amigos na cantina com a turma toda.",
      "momento_em_que_percebeu_que_virou_universitario": "Todas as provas caindo exatamente na mesma semana.",
      "coisa_que_eliminaria_da_vida_universitaria": "Projetos de extensão com prazos acumulados."
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
    "nome": "Maria Cibele da Silva Leite",
    "iniciais": "MC",
    "genero": "ela",
    "email_institucional": "cibele.leite@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Corvinal",
    "casaSlug": "corvinal",
    "areaDestaque": "Empreendedorismo, Marketing & Contabilidade",
    "lemas": "Administrar o curso é aprender primeiro a administrar a própria vida e a rotina!",
    "resumo": "Criativa, desenhista e atenta aos detalhes. Apaixonada por marketing, contabilidade introdutória e animes.",
    "limite_vagas": 5,
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
      "meme_que_representa_sua_personalidade": "Meme reflexivo sobre organização e rotina universitária.",
      "figurinha_que_representou_o_primeiro_periodo": "Figurinha fofa de superação acadêmica.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Ana Caetano (duo Anavitória)."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Contabilidade.",
      "materia_que_mais_testou_a_sanidade": "Matemática aplicada à Administração.",
      "area_da_administracao_que_mais_chama_atencao": "Empreendedorismo e Marketing.",
      "maior_choque_de_realidade": "Descobrir que além de aprender Administração, eu precisava administrar minha própria vida, prazos e rotina com autonomia."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Nos primeiros dias de aula acabei saindo da sala para andar um pouco e quase me perdi no campus da UFAPE.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando usei a farda de Administração da UFAPE pela primeira vez e caiu a ficha real de ser universitária.",
      "coisa_que_eliminaria_da_vida_universitaria": "Seminários em grupo obrigatórios."
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
    "nome": "Heloísa Pereira Barreto",
    "iniciais": "HB",
    "genero": "ela",
    "email_institucional": "heloisa.barreto@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Corvinal",
    "casaSlug": "corvinal",
    "areaDestaque": "Gestão Financeira & Estratégia",
    "lemas": "Curiosidade intelectual sem limites: se alguém escreveu, eu vou estudar até entender tudo!",
    "resumo": "Idealizadora do programa de apadrinhamento e líder nata. Leitora voraz, apaixonada pelo mercado financeiro e por autonomia acadêmica.",
    "limite_vagas": 5,
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
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Ler livros envolventes e aprender coisas novas e aleatórias sobre o mundo.",
      "meme_que_representa_sua_personalidade": "Clóvis de Barros Filho: 'Como pode um cara escrever uma coisa que eu não entenda? Não tem como. Eu vou ler até entender!'",
      "figurinha_que_representou_o_primeiro_periodo": "Figurinha de determinação nos estudos.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Emma Watson (inteligente, engajada e incrível para debater ideias)."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Administração.",
      "materia_que_mais_testou_a_sanidade": "Introdução à Economia.",
      "area_da_administracao_que_mais_chama_atencao": "Área Financeira e Estratégia.",
      "maior_choque_de_realidade": "Perceber que a universidade exige autonomia total. Ninguém fica cobrando ou lembrando, é você por você mesmo construindo sua história."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "O professor faltou e a turma convenceu todo mundo pelo WhatsApp que era algo imperdível só para ver o pessoal chegando na sala vazia!",
      "momento_em_que_percebeu_que_virou_universitario": "Quando me peguei reclamando que tinha matéria demais para estudar e sem saber nem por onde começar.",
      "coisa_que_eliminaria_da_vida_universitaria": "Trabalhos em grupo com membros que somem."
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
    "nome": "Joice Vitoria Gonçalves Silva",
    "iniciais": "JV",
    "genero": "ela",
    "email_institucional": "joice.vitoria@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Sonserina",
    "casaSlug": "sonserina",
    "areaDestaque": "Contabilidade & Gestão",
    "lemas": "Foco nos objetivos e resiliência total para superar qualquer desafio de cálculo!",
    "resumo": "Espontânea, determinada e apaixonada por culinária. Sincera sobre os percalços de cálculo e sempre disposta a estender a mão aos novos alunos.",
    "limite_vagas": 5,
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
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Cozinhar pratos especiais.",
      "meme_que_representa_sua_personalidade": "Qualquer meme do IShowSpeed com energia a 1000%.",
      "figurinha_que_representou_o_primeiro_periodo": "😱 (O susto com as notas do período)",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Cristiano Ronaldo (SIUUU!)."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Contabilidade e Introdução à Administração.",
      "materia_que_mais_testou_a_sanidade": "Matemática / Cálculo 1.",
      "area_da_administracao_que_mais_chama_atencao": "Contabilidade.",
      "maior_choque_de_realidade": "Cálculo 1 na universidade é de verdade!"
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Dar risada dos próprios perrengues na cantina com a turma.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando o desafio de cálculo me fez correr atrás de monitoria com toda a força.",
      "coisa_que_eliminaria_da_vida_universitaria": "Cálculo 1 da grade obrigatória."
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
    "nome": "Jones Vitor dos Santos Nascimento",
    "iniciais": "JN",
    "genero": "ele",
    "email_institucional": "jones.nascimento@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Grifinória",
    "casaSlug": "grifinoria",
    "areaDestaque": "Estratégia Interempresarial & Filosofia",
    "lemas": "O ambiente universitário é feito de amizades sólidas e visão estratégica de futuro!",
    "resumo": "Sociável, boleiro e focado em estratégia corporativa. Adora debater ética empresarial e aproveitar os bons momentos com os amigos.",
    "limite_vagas": 5,
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
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Jogar futebol ou sair com os amigos.",
      "meme_que_representa_sua_personalidade": "A criança chorando comemorando vitória nos acréscimos.",
      "figurinha_que_representou_o_primeiro_periodo": "Figurinha de resenha da turma.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Yuri Alberto."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Filosofia e Ética Geral.",
      "materia_que_mais_testou_a_sanidade": "Cálculo e Matemática.",
      "area_da_administracao_que_mais_chama_atencao": "Sistema estratégico e relacionamento entre empresas.",
      "maior_choque_de_realidade": "Ter que sentar e estudar de verdade todos os dias."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "As resenhas e risadas incontroláveis no intervalo com os parceiros de sala.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando cheguei nas provas e pensei: 'Agora é com a gente!'",
      "coisa_que_eliminaria_da_vida_universitaria": "Matemática excessiva."
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
    "nome": "Renaly Ferreira de Andrade",
    "iniciais": "RF",
    "genero": "ela",
    "email_institucional": "renaly.andrade@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Corvinal",
    "casaSlug": "corvinal",
    "areaDestaque": "Gestão de Pessoas & Logística",
    "lemas": "Dedicação aos estudos e cuidado com o bem-estar: equilíbrio é a chave da graduação!",
    "resumo": "Dedicada, fã de academia e séries. Tem grande afinidade com contabilidade introdutória, logística e desenvolvimento de equipes.",
    "limite_vagas": 5,
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
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Ir à academia e maratonar minhas séries favoritas.",
      "meme_que_representa_sua_personalidade": "Aquele clássico dos ETs se abraçando em sintonia.",
      "figurinha_que_representou_o_primeiro_periodo": "A figurinha de desespero simpático com os prazos.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Algum gênio da matemática 🧮 para tirar dúvidas na hora!"
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Contabilidade.",
      "materia_que_mais_testou_a_sanidade": "Cálculo 1.",
      "area_da_administracao_que_mais_chama_atencao": "Gestão de Pessoas e Logística.",
      "maior_choque_de_realidade": "A transição direta do ensino médio para a rotina intensa da universidade."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Sobreviver aos momentos tensos de prova e rir aliviada depois.",
      "momento_em_que_percebeu_que_virou_universitario": "Quando comecei a deixar os trabalhos para a última hora por causa da rotina cheia.",
      "coisa_que_eliminaria_da_vida_universitaria": "Cálculo 1, sem pensar duas vezes."
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
    "nome": "Richard Charles Silvestre da Silva",
    "iniciais": "RC",
    "genero": "ele",
    "email_institucional": "richard.cssilva@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Lufa-Lufa",
    "casaSlug": "lufalufa",
    "areaDestaque": "Finanças Corporativas & Contabilidade",
    "lemas": "O aprendizado justo é aquele incitado pelo esforço, gerando constante perfeição de conhecimento. Passar sem aprender é perder tempo!",
    "resumo": "Reflexivo, cinéfilo e focado no domínio prático das finanças. Valoriza o mérito do estudo sincero e o bom humor entre colegas.",
    "limite_vagas": 5,
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
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Assistir a grandes filmes, jogar futebol e descansar.",
      "meme_que_representa_sua_personalidade": "Cenas épicas de The Office.",
      "figurinha_que_representou_o_primeiro_periodo": "Figurinha reflexiva de superação.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Robert De Niro."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Contabilidade Geral.",
      "materia_que_mais_testou_a_sanidade": "Matemática aplicada à Administração e Contabilidade.",
      "area_da_administracao_que_mais_chama_atencao": "Finanças Corporativas.",
      "maior_choque_de_realidade": "O verdadeiro aprendizado exige esforço autêntico; a graduação requer dedicação séria e diária."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Quando bati o carro levemente e o grupo da turma transformou o ocorrido em resenha coletiva.",
      "momento_em_que_percebeu_que_virou_universitario": "Durante a semana clássica de provas com conteúdos densos.",
      "coisa_que_eliminaria_da_vida_universitaria": "O estresse desnecessário pré-prova."
    },
    "hobbies": [
      "Cinema Clássico",
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
    "nome": "Tamires Ferreira Rodrigues da Silva",
    "iniciais": "TF",
    "genero": "ela",
    "email_institucional": "tamires.ferreira@ufape.edu.br",
    "periodo": "2º Período de Administração - UFAPE",
    "casaHogwarts": "Grifinória",
    "casaSlug": "grifinoria",
    "areaDestaque": "Gestão de Pessoas & Introdução à ADM",
    "lemas": "Acolhimento caloroso e amizade verdadeira: dividindo a sala com pessoas incríveis e construindo pontes!",
    "resumo": "Sociável, alegre e empática. Tem uma cota especial de 4 vagas e muita energia para orientar na adaptação à rotina da UFAPE.",
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
      "o_que_gosta_de_fazer_quando_nao_esta_estudando": "Sair com os amigos para passear e conversar.",
      "meme_que_representa_sua_personalidade": "Confundir o cachorro com uma pedra na rua por falta de atenção.",
      "figurinha_que_representou_o_primeiro_periodo": "Menininho chorando de emoção com o final do semestre.",
      "pessoa_famosa_para_sentir_ao_lado_na_aula": "Zezé Di Camargo (para dar um show ao vivo na sala!)."
    },
    "experiencia_no_curso": {
      "materia_preferida_no_primeiro_periodo": "Introdução à Administração.",
      "materia_que_mais_testou_a_sanidade": "Introdução à Economia.",
      "area_da_administracao_que_mais_chama_atencao": "Gestão de Pessoas.",
      "maior_choque_de_realidade": "Descobrir que os professores da UFAPE são super compreensíveis e acolhedores quando a gente conversa."
    },
    "vida_universitaria": {
      "momento_mais_engracado": "Sair com os amigos pós-prova direto para comer pastel na feira e esquecer as questões difíceis.",
      "momento_em_que_percebeu_que_virou_universitario": "Dividir a sala diariamente com pessoas super inteligentes e dedicadas.",
      "coisa_que_eliminaria_da_vida_universitaria": "Provas longas e cansativas."
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
  }
];

// Alias para retrocompatibilidade
export const PADRINHOS_DATA = PADRINHOS;
