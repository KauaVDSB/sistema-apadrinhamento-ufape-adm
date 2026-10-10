-- ==============================================================================
-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
-- Arquivo: database/seeds/03_permissions_grants.sql
-- Finalidade: Concessão de permissões para as roles públicas da API PostgREST (anon / authenticated)
-- ==============================================================================

-- 1. Garante acesso de uso ao schema public
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Permite leitura anônima da view pública de padrinhos (catálogo com cotas dinâmicas)
GRANT SELECT ON public.vw_padrinhos_publico TO anon, authenticated;
GRANT SELECT ON public.padrinhos TO anon, authenticated;

-- 3. Permite leitura pública da lista de calouros aprovados para validação
GRANT SELECT ON public.calouros_aprovados TO anon, authenticated;

-- 4. Permite inserção e leitura de apadrinhamentos (restringidos por RLS)
GRANT SELECT, INSERT ON public.apadrinhamentos TO anon, authenticated;
GRANT SELECT ON public.user_roles TO anon, authenticated;

-- 5. Permite execução de funções de verificação e apadrinhamento
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.registrar_apadrinhamento(UUID, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, TEXT) TO anon, authenticated;

-- 5. Confirmação
DO $$
BEGIN
    RAISE NOTICE 'Permissões de API concedidas com sucesso para anon e authenticated.';
END $$;
