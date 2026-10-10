-- ==============================================================================
-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
-- Arquivo: database/schema.sql
-- Versão do Schema: 1.0.0 (SemVer)
-- Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
-- Diretrizes: ADR-002 (RBAC / RLS / LGPD) e ADR-003 (Anti-Race Condition / RPC)
-- ==============================================================================

-- 1. EXTENSÕES & CONFIGURAÇÕES INICIAIS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Função utilitária em banco para normalização ortográfica (Unicode / Diacríticos)
CREATE OR REPLACE FUNCTION public.normalizar_texto(p_texto TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$
    SELECT lower(
        regexp_replace(
            translate(
                COALESCE(p_texto, ''),
                'áàâãäéèêëíìîïóòôõöúùûüçñÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ',
                'aaaaaeeeeiiiiooooouuuucnaaaaaeeeeiiiiooooouuuucn'
            ),
            '[^a-z0-9\s]', '', 'g'
        )
    );
$$;

-- ==============================================================================
-- 2. TABELAS PRINCIPAIS
-- ==============================================================================

-- 2.1. Papéis de Usuários (RBAC)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'padrinho', 'coordenador')),
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.user_roles IS 'Controle de papéis administrativos e de coordenação do sistema.';

-- 2.2. Mentores (Padrinhos e Madrinhas)
-- Nota: Padrinhos NÃO possuem telefone cadastrado. O contato é fornecido pelo calouro.
CREATE TABLE IF NOT EXISTS public.padrinhos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE,
    nome TEXT NOT NULL,
    iniciais VARCHAR(2) NOT NULL, -- Exatamente 2 caracteres (ex.: HB)
    email_institucional TEXT UNIQUE NOT NULL,
    instagram TEXT,
    periodo TEXT NOT NULL DEFAULT '2º Semestre',
    estilo_mentoria TEXT,
    bio TEXT,
    sticker_url TEXT DEFAULT 'assets/img/padrinhos/padrao.webp',
    hobbies TEXT[] DEFAULT ARRAY[]::TEXT[],
    materias_favoritas TEXT[] DEFAULT ARRAY[]::TEXT[],
    limite_vagas INT NOT NULL DEFAULT 5 CHECK (limite_vagas > 0),
    ativo BOOLEAN NOT NULL DEFAULT true,
    ordem_exibicao INT DEFAULT 0,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.padrinhos IS 'Cadastro de mentores veteranos com cotas e dados de apresentação anônima.';
COMMENT ON COLUMN public.padrinhos.iniciais IS 'Monograma de 2 caracteres baseado no nome/email institucional.';
COMMENT ON COLUMN public.padrinhos.limite_vagas IS 'Cota máxima de afilhados (Padrão 5; Madrinha pré-designada 4).';

-- 2.3. Calouros Aprovados (Listagem Oficial da UFAPE 2026.2 Sanitizada)
CREATE TABLE IF NOT EXISTS public.calouros_aprovados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_completo TEXT NOT NULL,
    nome_normalizado TEXT NOT NULL UNIQUE,
    curso TEXT NOT NULL DEFAULT 'Administração',
    semestre_ingresso TEXT NOT NULL DEFAULT '2026.2',
    chamada_edital TEXT DEFAULT 'Chamada Regular / Espera',
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_calouros_aprovados_norm 
ON public.calouros_aprovados(nome_normalizado);

COMMENT ON TABLE public.calouros_aprovados IS 'Base oficial de ingressantes da UFAPE para validação nominal de acesso.';

-- 2.4. Vínculos de Apadrinhamento (Registros Efetivos)
CREATE TABLE IF NOT EXISTS public.apadrinhamentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    padrinho_id UUID NOT NULL REFERENCES public.padrinhos(id) ON DELETE RESTRICT,
    calouro_nome TEXT NOT NULL,
    calouro_nome_normalizado TEXT NOT NULL,
    calouro_whatsapp TEXT,
    calouro_instagram TEXT,
    canal_preferido TEXT NOT NULL CHECK (canal_preferido IN ('whatsapp', 'instagram', 'tanto_faz')),
    respostas JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_origem TEXT,
    user_agent TEXT,
    permutou BOOLEAN NOT NULL DEFAULT false,
    padrinho_anterior_id UUID REFERENCES public.padrinhos(id),
    trocado_em TIMESTAMPTZ,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uk_calouro_unico_apadrinhamento UNIQUE (calouro_nome_normalizado)
);

CREATE INDEX IF NOT EXISTS idx_apadrinhamentos_padrinho_id 
ON public.apadrinhamentos(padrinho_id);

COMMENT ON TABLE public.apadrinhamentos IS 'Associações confirmadas de calouros aos padrinhos, respostas e contatos informados pelos calouros.';

-- ==============================================================================
-- 3. VIEWS DE CONSULTA SEGURA (ABSTRAÇÃO & LGPD)
-- ==============================================================================

-- 3.1. Catálogo Público de Padrinhos (Sem dados de contato privados)
CREATE OR REPLACE VIEW public.vw_padrinhos_publico AS
SELECT 
    p.id,
    p.nome,
    p.iniciais,
    p.periodo,
    p.estilo_mentoria,
    p.bio,
    p.sticker_url,
    p.hobbies,
    p.materias_favoritas,
    p.limite_vagas,
    p.ordem_exibicao,
    COALESCE(count(a.id), 0)::INT AS vagas_ocupadas,
    GREATEST(0, p.limite_vagas - COALESCE(count(a.id), 0))::INT AS vagas_restantes,
    (COALESCE(count(a.id), 0) >= p.limite_vagas) AS esgotado
FROM public.padrinhos p
LEFT JOIN public.apadrinhamentos a ON a.padrinho_id = p.id
WHERE p.ativo = true
GROUP BY p.id, p.nome, p.iniciais, p.periodo, p.estilo_mentoria, p.bio, 
         p.sticker_url, p.hobbies, p.materias_favoritas, p.limite_vagas, p.ordem_exibicao
ORDER BY p.ordem_exibicao ASC, p.nome ASC;

COMMENT ON VIEW public.vw_padrinhos_publico IS 'Visão pública anonimizada dos mentores com status dinâmico de vagas.';

-- 3.2. Dashboard Consolidado para a Coordenação (Admin Only)
CREATE OR REPLACE VIEW public.vw_dashboard_admin AS
SELECT 
    p.id AS padrinho_id,
    p.nome AS padrinho_nome,
    p.iniciais AS padrinho_iniciais,
    p.email_institucional,
    p.limite_vagas,
    COALESCE(count(a.id), 0)::INT AS total_afilhados,
    ROUND((COALESCE(count(a.id), 0)::NUMERIC / p.limite_vagas::NUMERIC) * 100, 1) AS percentual_ocupacao,
    jsonb_agg(
        CASE WHEN a.id IS NOT NULL THEN
            jsonb_build_object(
                'apadrinhamento_id', a.id,
                'calouro_nome', a.calouro_nome,
                'canal_preferido', a.canal_preferido,
                'calouro_whatsapp', a.calouro_whatsapp,
                'calouro_instagram', a.calouro_instagram,
                'criado_em', a.criado_em,
                'respostas', a.respostas
            )
        ELSE NULL END
    ) FILTER (WHERE a.id IS NOT NULL) AS afilhados
FROM public.padrinhos p
LEFT JOIN public.apadrinhamentos a ON a.padrinho_id = p.id
GROUP BY p.id, p.nome, p.iniciais, p.email_institucional, p.limite_vagas;

COMMENT ON VIEW public.vw_dashboard_admin IS 'Visão executiva analítica para o painel de coordenação (/admin/).';

-- ==============================================================================
-- 4. POLÍTICAS DE ROW LEVEL SECURITY (RLS) - CONFORMIDADE LGPD (ADR-002)
-- ==============================================================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.padrinhos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calouros_aprovados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apadrinhamentos ENABLE ROW LEVEL SECURITY;

-- 4.0. Função Auxiliar Segura de Verificação de Administrador (Previne Recursão Infinita em RLS)
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = p_user_id AND role IN ('admin', 'coordenador')
    );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO anon, authenticated;

-- 4.1. Políticas para user_roles
CREATE POLICY "Usuário lê seu próprio role ou admin"
ON public.user_roles FOR SELECT
TO authenticated
USING (
    user_id = auth.uid() OR public.is_admin(auth.uid())
);

-- 4.2. Políticas para padrinhos
-- Leitura pública dos metadados via view pública ou SELECT direto
CREATE POLICY "Padrinhos - Leitura pública de metadados"
ON public.padrinhos FOR SELECT
TO anon, authenticated
USING (ativo = true);

-- Padrinho autenticado pode atualizar seu próprio perfil
CREATE POLICY "Padrinho atualiza seu próprio registro"
ON public.padrinhos FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Admin possui permissão total sobre a tabela padrinhos
CREATE POLICY "Admin gerencia todos os padrinhos"
ON public.padrinhos FOR ALL
TO authenticated
USING (
    public.is_admin(auth.uid())
);

-- 4.3. Políticas para calouros_aprovados
-- Calouro ou frontend anônimo pode consultar a lista para verificação
CREATE POLICY "Consulta de verificação de calouro aprovado"
ON public.calouros_aprovados FOR SELECT
TO anon, authenticated
USING (true);

-- Admin gerencia a base de aprovados
CREATE POLICY "Admin gerencia lista de calouros aprovados"
ON public.calouros_aprovados FOR ALL
TO authenticated
USING (
    public.is_admin(auth.uid())
);

-- 4.4. Políticas para apadrinhamentos (ISOLAMENTO ESTRITO LGPD)
-- Padrinho logado enxerga APENAS seus afilhados diretos
CREATE POLICY "Padrinho visualiza exclusivamente seus afilhados"
ON public.apadrinhamentos FOR SELECT
TO authenticated
USING (
    padrinho_id IN (SELECT id FROM public.padrinhos WHERE user_id = auth.uid())
    OR
    public.is_admin(auth.uid())
);

-- Inserção é permitida
CREATE POLICY "Permitir inserção de novo apadrinhamento"
ON public.apadrinhamentos FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- ==============================================================================
-- 5. FUNÇÕES TRANSACIONAIS ANTI-RACE CONDITION E CONSULTA SEGURA (ADR-002 / ADR-003)
-- ==============================================================================

-- 5.1. Consulta segura do status do calouro (Multi-dispositivo / LGPD Safe)
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

COMMENT ON FUNCTION public.consultar_status_calouro IS 'Permite consulta pública e segura de status de calouro sem expor contatos sensíveis.';

-- 5.2. Procedimento de Registro e Permuta Única com Lock Pessimista
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
SECURITY DEFINER -- Executa com privilégios de integridade no banco
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

COMMENT ON FUNCTION public.registrar_apadrinhamento IS 'Procedimento atômico com bloqueio pessimista para registro concorrente seguro de afilhados.';

-- ==============================================================================
-- 6. TRIGGERS DE MANUTENÇÃO
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.trigger_atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = timezone('utc', now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_padrinhos_timestamp
BEFORE UPDATE ON public.padrinhos
FOR EACH ROW
EXECUTE FUNCTION public.trigger_atualizar_timestamp();

-- ==============================================================================
-- 7. CONCESSÃO DE PERMISSÕES PARA API POSTGREST (ANON / AUTHENTICATED)
-- ==============================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.vw_padrinhos_publico TO anon, authenticated;
GRANT SELECT ON public.padrinhos TO anon, authenticated;
GRANT SELECT ON public.calouros_aprovados TO anon, authenticated;
GRANT SELECT, INSERT ON public.apadrinhamentos TO anon, authenticated;
GRANT SELECT ON public.user_roles TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.registrar_apadrinhamento(UUID, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, TEXT) TO anon, authenticated;
