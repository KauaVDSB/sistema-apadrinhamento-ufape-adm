-- ==============================================================================
-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
-- Arquivo: database/seeds/01_padrinhos_reais.sql
-- Ingestão dos 11 mentores veteranos oficiais (40 vagas no total)
-- ==============================================================================

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Adelmo Felix',
    'AF',
    'adelmo.felix@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Economia & Gestão Geral',
    'Praticante de esportes e focado no crescimento acadêmico. Enfrentou a matemática aplicada com garra e acolhe com energia positiva.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Prática de Esportes', 'Futebol', 'Música Nacional', 'Resenha Universitária']::TEXT[],
    ARRAY['Introdução à Administração.']::TEXT[],
    4,
    true,
    1
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Anderson Daniel',
    'AD',
    'anderson.daniel@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Gestão Financeira & Economia',
    'Espirituoso, gamer e focado em finanças. Acredita no equilíbrio entre o foco nas matérias de economia e as amizades da cantina.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Jogos Mobile', 'Esportes', 'Cantina com Amigos', 'Economia']::TEXT[],
    ARRAY['Introdução à Economia.']::TEXT[],
    4,
    true,
    2
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Cibele Leite',
    'CL',
    'cibele.leite@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Empreendedorismo, Marketing & Contabilidade',
    'Criativa, desenhista e atenta aos detalhes. Apaixonada por marketing, contabilidade introdutória e animes.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Desenho & Ilustração', 'Animes & Mangás', 'Música Brasileira', 'Café']::TEXT[],
    ARRAY['Introdução à Contabilidade.']::TEXT[],
    4,
    true,
    3
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Heloísa Barreto',
    'HB',
    'heloisa.barreto@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Gestão Financeira & Estratégia',
    'Idealizadora do programa de apadrinhamento e líder nata. Leitora voraz, apaixonada pelo mercado financeiro e por autonomia acadêmica.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Leitura', 'Podcasts de Conhecimento', 'Finanças', 'Projetos Acadêmicos']::TEXT[],
    ARRAY['Introdução à Administração.']::TEXT[],
    4,
    true,
    4
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Joice Vitoria',
    'JV',
    'joice.vitoria@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Contabilidade & Gestão',
    'Espontânea, determinada e apaixonada por culinária. Sincera sobre os percalços de cálculo e sempre disposta a estender a mão aos novos alunos.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Gastronomia & Culinária', 'Futebol', 'Mídias Sociais', 'Séries']::TEXT[],
    ARRAY['Contabilidade e Introdução à Administração.']::TEXT[],
    4,
    true,
    5
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Jones Nascimento',
    'JN',
    'jones.nascimento@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Estratégia Interempresarial & Filosofia',
    'Sociável, boleiro e focado em estratégia corporativa. Adora debater ética empresarial e aproveitar os bons momentos com os amigos.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Futebol', 'Encontros com Amigos', 'Debates Estratégicos', 'Esportes']::TEXT[],
    ARRAY['Filosofia e Ética Geral.']::TEXT[],
    4,
    true,
    6
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Renaly Andrade',
    'RA',
    'renaly.andrade@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Gestão de Pessoas & Logística',
    'Dedicada, fã de academia e séries. Tem grande afinidade com contabilidade introdutória, logística e desenvolvimento de equipes.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Academia & Musculação', 'Séries e Filmes', 'Leitura', 'Saúde e Bem-Estar']::TEXT[],
    ARRAY['Introdução à Contabilidade.']::TEXT[],
    4,
    true,
    7
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Richard Silva',
    'RS',
    'richard.cssilva@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Finanças Corporativas & Contabilidade',
    'Reflexivo, cinéfilo e focado no domínio prático das finanças. Valoriza o mérito do estudo sincero e o bom humor entre colegas.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Cinema Clássico', 'Futebol', 'The Office', 'Finanças']::TEXT[],
    ARRAY['Contabilidade Geral.']::TEXT[],
    4,
    true,
    8
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Tamires Ferreira',
    'TF',
    'tamires.ferreira@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Gestão de Pessoas & Introdução à ADM',
    'Sociável, alegre e empática. Tem uma cota de 4 vagas e muita energia para orientar na adaptação à rotina da UFAPE.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Passeios com Amigos', 'Música Sertaneja', 'Pastel Pós-Prova', 'Comunicação']::TEXT[],
    ARRAY['Introdução à Administração.']::TEXT[],
    4,
    true,
    9
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;

INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    'Manoel Frasão',
    'MF',
    'manoel.araujoneto@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Empreendedorismo & Setor Bancário',
    'Gamer, leitor e parceiro de resenhas. Venceu os desafios de cálculo e adora empreendedorismo e o mercado financeiro.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Jogos & Games', 'Leitura', 'Rolê com Amigos', 'Empreendedorismo']::TEXT[],
    ARRAY['Introdução a Economia.']::TEXT[],
    4,
    true,
    10
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ordem_exibicao = EXCLUDED.ordem_exibicao;
