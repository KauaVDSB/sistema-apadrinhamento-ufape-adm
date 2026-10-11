-- ==============================================================================
-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
-- Arquivo: database/seeds/05_ajuste_11_padrinhos.sql
-- Objetivo:
--   1. Ajustar cotas para 3 vagas: Adelmo Felix, Jones Nascimento e Tamires Silvestre
--   2. Inserir a 11ª mentora: Ana Alícia Lúcio da Silva (3 vagas)
--   3. Total geral: 7 mentores com 4 vagas + 4 mentores com 3 vagas = 40 vagas oficiais
-- ==============================================================================

-- 1. ATUALIZAÇÃO DAS COTAS DOS MENTORES EXISTENTES (3 VAGAS)
UPDATE public.padrinhos 
SET limite_vagas = 3 
WHERE email_institucional IN (
    'adelmo.felix@ufape.edu.br',
    'jones.nascimento@ufape.edu.br',
    'tamires.ferreira@ufape.edu.br'
);

-- 2. INSERÇÃO DA 11ª MENTORA: ANA ALÍCIA LÚCIO DA SILVA (3 VAGAS)
INSERT INTO public.padrinhos (
    nome, 
    iniciais, 
    email_institucional, 
    periodo, 
    estilo_mentoria, 
    bio, 
    sticker_url, 
    hobbies, 
    materias_favoritas, 
    limite_vagas, 
    ativo, 
    ordem_exibicao
) VALUES (
    'Ana Alícia Lúcio da Silva',
    'AL',
    'alicia.lucio@ufape.edu.br',
    '2º Período de Administração - UFAPE',
    'Finanças & Contabilidade',
    'Focada na área financeira e contabilidade introdutória. Pratica esportes, assiste séries e acolhe os calouros com determinação e bom humor.',
    'assets/img/padrinhos/padrao.webp',
    ARRAY['Assistir Séries', 'Praticar Esportes', 'Conversas com Amigos', 'Música']::TEXT[],
    ARRAY['Introdução à Contabilidade.']::TEXT[],
    3,
    true,
    11
) ON CONFLICT (email_institucional) DO UPDATE SET
    nome = EXCLUDED.nome,
    iniciais = EXCLUDED.iniciais,
    periodo = EXCLUDED.periodo,
    estilo_mentoria = EXCLUDED.estilo_mentoria,
    bio = EXCLUDED.bio,
    limite_vagas = EXCLUDED.limite_vagas,
    hobbies = EXCLUDED.hobbies,
    materias_favoritas = EXCLUDED.materias_favoritas,
    ativo = EXCLUDED.ativo,
    ordem_exibicao = EXCLUDED.ordem_exibicao;
