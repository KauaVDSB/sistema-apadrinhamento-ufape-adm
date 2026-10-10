-- ==============================================================================
-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
-- Arquivo: database/seeds/04_permuta_e_manoel_frasao.sql
-- Objetivo:
--   1. Adicionar colunas de controle de permuta (permutou BOOLEAN) em public.apadrinhamentos
--   2. Atualizar cotas dos mentores para 4 vagas cada e cadastrar Manoel Frasão (Total: 40 vagas)
--   3. Criar função segura consultar_status_calouro para validação multi-dispositivo
--   4. Atualizar Stored Procedure registrar_apadrinhamento com validação atômica de permuta
-- ==============================================================================

-- 1. ESTRUTURA PARA REGISTRO DE PERMUTA
ALTER TABLE public.apadrinhamentos 
ADD COLUMN IF NOT EXISTS permutou BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.apadrinhamentos 
ADD COLUMN IF NOT EXISTS padrinho_anterior_id UUID REFERENCES public.padrinhos(id);

ALTER TABLE public.apadrinhamentos 
ADD COLUMN IF NOT EXISTS trocado_em TIMESTAMPTZ;

-- 2. CADASTRO / ATUALIZAÇÃO DOS 10 PADRINHOS COM 4 VAGAS CADA
-- ==============================================================================
-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
-- Arquivo: database/seeds/01_padrinhos_reais.sql
-- Ingestão dos 10 mentores veteranos oficiais (Cota padronizada de 4 vagas cada: 40 vagas no total)
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


-- 3. FUNÇÃO SEGURA DE CONSULTA DE STATUS DO CALOURO (MULTI-DISPOSITIVO / LGPD SAFE)
CREATE OR REPLACE FUNCTION public.consultar_status_calouro(p_nome TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_norm TEXT;
    v_rec RECORD;
BEGIN
    v_norm := public.normalizar_texto(p_nome);
    IF v_norm IS NULL OR length(v_norm) < 3 THEN
        RETURN jsonb_build_object('cadastrado', false);
    END IF;

    SELECT a.id, a.padrinho_id, p.nome AS padrinho_nome, COALESCE(a.permutou, false) AS permutou
    INTO v_rec
    FROM public.apadrinhamentos a
    JOIN public.padrinhos p ON p.id = a.padrinho_id
    WHERE a.calouro_nome_normalizado = v_norm;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'cadastrado', true,
            'apadrinhamento_id', v_rec.id,
            'padrinho_id', v_rec.padrinho_id,
            'padrinho_nome', v_rec.padrinho_nome,
            'permutou', v_rec.permutou
        );
    ELSE
        RETURN jsonb_build_object('cadastrado', false);
    END IF;
END;
$$;

-- 4. STORED PROCEDURE ATUALIZADA COM REGRA DE 1 PERMUTA E CONCORRÊNCIA ATÔMICA
CREATE OR REPLACE FUNCTION public.registrar_apadrinhamento(
    p_padrinho_id UUID,
    p_calouro_nome TEXT,
    p_calouro_whatsapp TEXT,
    p_calouro_instagram TEXT,
    p_canal_preferido TEXT,
    p_respostas JSONB,
    p_ip_origem TEXT DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_limite_maximo INT;
    v_vagas_atuais INT;
    v_calouro_normalizado TEXT;
    v_existente_id UUID;
    v_padrinho_existente_id UUID;
    v_ja_permutou BOOLEAN;
    v_novo_id UUID;
    v_padrinho_nome TEXT;
BEGIN
    -- 1. Normalizar nome do calouro
    v_calouro_normalizado := public.normalizar_texto(p_calouro_nome);
    
    IF v_calouro_normalizado IS NULL OR length(v_calouro_normalizado) < 3 THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'NOME_INVALIDO',
            'message', 'Por favor, informe seu nome completo válido.'
        );
    END IF;

    -- 2. Verificar se o calouro já possui cadastro prévio
    SELECT id, padrinho_id, COALESCE(permutou, false)
    INTO v_existente_id, v_padrinho_existente_id, v_ja_permutou
    FROM public.apadrinhamentos
    WHERE calouro_nome_normalizado = v_calouro_normalizado;

    IF v_existente_id IS NOT NULL THEN
        -- Caso 2.1: Tentou selecionar exatamente o mesmo padrinho já confirmado
        IF v_padrinho_existente_id = p_padrinho_id THEN
            RETURN jsonb_build_object(
                'success', false,
                'code', 'MESMO_PADRINHO',
                'message', 'Você já possui vínculo confirmado com este(a) padrinho/madrinha.'
            );
        END IF;

        -- Caso 2.2: Já usou a única troca permitida (permutou = true)
        IF v_ja_permutou THEN
            RETURN jsonb_build_object(
                'success', false,
                'code', 'LIMITE_PERMUTAS_ATINGIDO',
                'message', 'Você já utilizou sua única permuta (troca) de padrinho permitida pelo regulamento do programa.'
            );
        END IF;

        -- Caso 2.3: Permuta válida (permutou = false). Lock pessimista no padrinho destino
        SELECT limite_vagas, nome INTO v_limite_maximo, v_padrinho_nome
        FROM public.padrinhos
        WHERE id = p_padrinho_id AND ativo = true
        FOR UPDATE;

        IF NOT FOUND THEN
            RETURN jsonb_build_object(
                'success', false,
                'code', 'PADRINHO_NAO_ENCONTRADO',
                'message', 'O mentor selecionado não foi encontrado ou está inativo.'
            );
        END IF;

        -- Contagem atômica de vagas ocupadas do padrinho destino
        SELECT count(*)::INT INTO v_vagas_atuais
        FROM public.apadrinhamentos
        WHERE padrinho_id = p_padrinho_id;

        IF v_vagas_atuais >= v_limite_maximo THEN
            RETURN jsonb_build_object(
                'success', false,
                'code', 'VAGAS_ESGOTADAS',
                'message', format('As vagas para %s acabaram de ser preenchidas. Por favor, selecione outro mentor disponível.', v_padrinho_nome)
            );
        END IF;

        -- Executa a permuta atômica
        UPDATE public.apadrinhamentos
        SET padrinho_anterior_id = padrinho_id,
            padrinho_id = p_padrinho_id,
            permutou = true,
            trocado_em = timezone('utc', now()),
            calouro_whatsapp = COALESCE(NULLIF(trim(p_calouro_whatsapp), ''), calouro_whatsapp),
            calouro_instagram = COALESCE(NULLIF(trim(p_calouro_instagram), ''), calouro_instagram),
            canal_preferido = COALESCE(NULLIF(p_canal_preferido, ''), canal_preferido),
            respostas = COALESCE(p_respostas, respostas),
            ip_origem = COALESCE(p_ip_origem, ip_origem),
            user_agent = COALESCE(p_user_agent, user_agent)
        WHERE id = v_existente_id;

        RETURN jsonb_build_object(
            'success', true,
            'code', 'PERMUTA_REALIZADA',
            'permuta', true,
            'apadrinhamento_id', v_existente_id,
            'padrinho_nome', v_padrinho_nome,
            'permutou', true,
            'message', format('Sua permuta para %s foi realizada com sucesso! Lembramos que esta foi sua única troca permitida.', v_padrinho_nome)
        );
    END IF;

    -- 3. Lock Pessimista de Linha (Row-Level Lock) no padrinho selecionado para novo cadastro
    SELECT limite_vagas, nome INTO v_limite_maximo, v_padrinho_nome
    FROM public.padrinhos
    WHERE id = p_padrinho_id AND ativo = true
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'PADRINHO_NAO_ENCONTRADO',
            'message', 'O mentor selecionado não foi encontrado ou está inativo.'
        );
    END IF;

    -- 4. Contagem atômica de vagas ocupadas sob o bloqueio da transação
    SELECT count(*)::INT INTO v_vagas_atuais
    FROM public.apadrinhamentos
    WHERE padrinho_id = p_padrinho_id;

    -- 5. Validação da Cota Máxima (4 vagas por mentor)
    IF v_vagas_atuais >= v_limite_maximo THEN
        RETURN jsonb_build_object(
            'success', false,
            'code', 'VAGAS_ESGOTADAS',
            'message', format('As vagas para %s acabaram de ser preenchidas. Por favor, selecione outro mentor disponível.', v_padrinho_nome)
        );
    END IF;

    -- 6. Inserção atômica do vínculo inicial
    INSERT INTO public.apadrinhamentos (
        padrinho_id,
        calouro_nome,
        calouro_nome_normalizado,
        calouro_whatsapp,
        calouro_instagram,
        canal_preferido,
        respostas,
        ip_origem,
        user_agent,
        permutou
    )
    VALUES (
        p_padrinho_id,
        trim(p_calouro_nome),
        v_calouro_normalizado,
        trim(p_calouro_whatsapp),
        trim(p_calouro_instagram),
        p_canal_preferido,
        COALESCE(p_respostas, '{}'::jsonb),
        p_ip_origem,
        p_user_agent,
        false
    )
    RETURNING id INTO v_novo_id;

    -- 7. Retorno com confirmação
    RETURN jsonb_build_object(
        'success', true,
        'code', 'APADRINHAMENTO_CONFIRMADO',
        'permuta', false,
        'apadrinhamento_id', v_novo_id,
        'padrinho_nome', v_padrinho_nome,
        'permutou', false,
        'message', format('Apadrinhamento confirmado com sucesso com %s!', v_padrinho_nome)
    );
END;
$$;

-- 5. PERMISSÕES E GRANTS
GRANT EXECUTE ON FUNCTION public.registrar_apadrinhamento(UUID, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consultar_status_calouro(TEXT) TO anon, authenticated;
GRANT SELECT ON public.vw_padrinhos_publico TO anon, authenticated;
GRANT SELECT ON public.padrinhos TO anon, authenticated;
GRANT SELECT ON public.calouros_aprovados TO anon, authenticated;
