-- ==============================================================================
-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
-- Arquivo: database/seeds/02_calouros_aprovados.sql
-- Ingestão dos 159 calouros oficiais de Administração (2026.2)
-- ==============================================================================

INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ADRIANO VANDERLEI DE OLIVEIRA JUNIOR',
    'ADRIANO VANDERLEI DE OLIVEIRA JUNIOR',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ALEX AMORIM LAURENTINO',
    'ALEX AMORIM LAURENTINO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ALEXANDRE JORGE SILVA BARROS JUNIOR',
    'ALEXANDRE JORGE SILVA BARROS JUNIOR',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ALFREDO DOS SANTOS OLIVEIRA',
    'ALFREDO DOS SANTOS OLIVEIRA',
    'Administração',
    '2026.2',
    '7° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ALINE STEFANE VIEIRA DE OLIVEIRA',
    'ALINE STEFANE VIEIRA DE OLIVEIRA',
    'Administração',
    '2026.2',
    '6° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ALLEF FRANKLIN SILVESTRE DE OLIVEIRA',
    'ALLEF FRANKLIN SILVESTRE DE OLIVEIRA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'AMANDA TENORIO SOUTO',
    'AMANDA TENORIO SOUTO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'AMAURI DOS SANTOS SILVA',
    'AMAURI DOS SANTOS SILVA',
    'Administração',
    '2026.2',
    '8° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ANA CLARA SILVA DE CARVALHO',
    'ANA CLARA SILVA DE CARVALHO',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ANA PAULA DA COSTA SANTOS',
    'ANA PAULA DA COSTA SANTOS',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ANA VITORIA ARAUJO LIMA',
    'ANA VITORIA ARAUJO LIMA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ANDERSON FELIPE MACIEL NUNES',
    'ANDERSON FELIPE MACIEL NUNES',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ANDRIELLY BESERRA DA SILVA',
    'ANDRIELLY BESERRA DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ARIEL DE SOUZA OLIVEIRA MARQUES CAVALCANTI',
    'ARIEL DE SOUZA OLIVEIRA MARQUES CAVALCANTI',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ARTHUR GUILHERME VIANA ZUMBA',
    'ARTHUR GUILHERME VIANA ZUMBA',
    'Administração',
    '2026.2',
    '5° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'BIANCA ALVES DE LIMA',
    'BIANCA ALVES DE LIMA',
    'Administração',
    '2026.2',
    '5° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'BIANCA DE FARIAS LIMA',
    'BIANCA DE FARIAS LIMA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'CAMILLE VITORIA DE OLIVEIRA SILVA',
    'CAMILLE VITORIA DE OLIVEIRA SILVA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'CARINA DOS SANTOS PEIXOTO',
    'CARINA DOS SANTOS PEIXOTO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'CARLOS ANDRE SILVA DE ARAUJO',
    'CARLOS ANDRE SILVA DE ARAUJO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'CARLOS KAIKY OLIVEIRA BALBINO',
    'CARLOS KAIKY OLIVEIRA BALBINO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'CAUA SPINELLI CAVALCANTE',
    'CAUA SPINELLI CAVALCANTE',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'CICERA NICOLLE DA COSTA PAZ',
    'CICERA NICOLLE DA COSTA PAZ',
    'Administração',
    '2026.2',
    '6° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'COSME DE SOUZA MONTEIRO NETO',
    'COSME DE SOUZA MONTEIRO NETO',
    'Administração',
    '2026.2',
    '9° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DANDARA KEISY CARVALHO DA SILVA',
    'DANDARA KEISY CARVALHO DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DANILO RAIMUNDO DA SILVA',
    'DANILO RAIMUNDO DA SILVA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DANILO ROGERIO BEZERRA BARBOSA',
    'DANILO ROGERIO BEZERRA BARBOSA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DAVI FAUSTINO DA SILVA',
    'DAVI FAUSTINO DA SILVA',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DAVID SAMUEL MACHADO SILVA',
    'DAVID SAMUEL MACHADO SILVA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DIEGO ISRAEL DA SILVA',
    'DIEGO ISRAEL DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DILMAR JOSE SANTOS DE MELO',
    'DILMAR JOSE SANTOS DE MELO',
    'Administração',
    '2026.2',
    '8° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'DORGIVAL LIMA DE SOUZA JUNIOR',
    'DORGIVAL LIMA DE SOUZA JUNIOR',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'EDIELSON SANTOS LEITE',
    'EDIELSON SANTOS LEITE',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'EDILSON TRAJANO DA SILVA',
    'EDILSON TRAJANO DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ELISANDRO BARRETO DOS SANTOS',
    'ELISANDRO BARRETO DOS SANTOS',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ERICA PATRICIA SILVA PEREIRA',
    'ERICA PATRICIA SILVA PEREIRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'EVELIN RAQUEL DA ROCHA MOURA',
    'EVELIN RAQUEL DA ROCHA MOURA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'EVELYN LUANE DA COSTA MENDES',
    'EVELYN LUANE DA COSTA MENDES',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'EVILASIO CORDEIRO DOS SANTOS NETO',
    'EVILASIO CORDEIRO DOS SANTOS NETO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'FABIANA TENORIO DE MELO',
    'FABIANA TENORIO DE MELO',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'FILIPE BISPO BEZERRA DA SILVA',
    'FILIPE BISPO BEZERRA DA SILVA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'FLAVIA MARIA DOS SANTOS VASCONCELOS',
    'FLAVIA MARIA DOS SANTOS VASCONCELOS',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'FRANCIELLE LETICIA LOURENCO DA SILVA',
    'FRANCIELLE LETICIA LOURENCO DA SILVA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GABRIEL ALBUQUERQUE DE SOUZA',
    'GABRIEL ALBUQUERQUE DE SOUZA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GABRIEL ANGELO MELO',
    'GABRIEL ANGELO MELO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GABRIEL MARQUES DA SILVA',
    'GABRIEL MARQUES DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GABRIELA NAYARA ALVES PEREIRA',
    'GABRIELA NAYARA ALVES PEREIRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GABRIELA NORONHA DE OLIVEIRA',
    'GABRIELA NORONHA DE OLIVEIRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GEAN CICERO DE MELO CORDEIRO',
    'GEAN CICERO DE MELO CORDEIRO',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GEISYANE APARECIDA DE OLIVEIRA MARTINS',
    'GEISYANE APARECIDA DE OLIVEIRA MARTINS',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GEOVANNA VICTORIA DE MELO SILVA',
    'GEOVANNA VICTORIA DE MELO SILVA',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GUILHERME CAVALCANTE VALERIO',
    'GUILHERME CAVALCANTE VALERIO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'GUSTAVO CAVALCANTE DO NASCIMENTO',
    'GUSTAVO CAVALCANTE DO NASCIMENTO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'HEITOR VIEIRA FERREIRA',
    'HEITOR VIEIRA FERREIRA',
    'Administração',
    '2026.2',
    '5° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'IASMIN SANTOS DO NASCIMENTO',
    'IASMIN SANTOS DO NASCIMENTO',
    'Administração',
    '2026.2',
    '7° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'IASMYM CALADO CAVALCANTE',
    'IASMYM CALADO CAVALCANTE',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'IONNA NAIRA GOMES BEZERRA',
    'IONNA NAIRA GOMES BEZERRA',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ISMAEL HENRIQUE ALVES CINTRA',
    'ISMAEL HENRIQUE ALVES CINTRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'IVANYR MOURA BELARMINO',
    'IVANYR MOURA BELARMINO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JACK RAYA SILVA DE ALMEIDA',
    'JACK RAYA SILVA DE ALMEIDA',
    'Administração',
    '2026.2',
    '5° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JAEDSON FELIX DE SOUZA SANTOS',
    'JAEDSON FELIX DE SOUZA SANTOS',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JASMYNNE SOUZA TORQUATO DE ALBUQUERQUE',
    'JASMYNNE SOUZA TORQUATO DE ALBUQUERQUE',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JAZYEL LUCAS DA SILVA CUSTODIO',
    'JAZYEL LUCAS DA SILVA CUSTODIO',
    'Administração',
    '2026.2',
    '8° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JEAN CARLOS DA SILVA LEITE',
    'JEAN CARLOS DA SILVA LEITE',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JEFFERSON CORREIA DOS SANTOS',
    'JEFFERSON CORREIA DOS SANTOS',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JEFFERSON SEVERINO CARLOS DA SILVA',
    'JEFFERSON SEVERINO CARLOS DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JENIFFER CAROLAYNE FERREIRA MARQUES',
    'JENIFFER CAROLAYNE FERREIRA MARQUES',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JESSICA PATRICIA TORRES SANTOS',
    'JESSICA PATRICIA TORRES SANTOS',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JHULIANO NICOLAS FREITAS VALENTE',
    'JHULIANO NICOLAS FREITAS VALENTE',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO EMANUEL DA SILVA ALVES',
    'JOAO EMANUEL DA SILVA ALVES',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO GABRIEL LIMA MELO CORDEIRO',
    'JOAO GABRIEL LIMA MELO CORDEIRO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO GUILHERME SANTOS DE ARAUJO',
    'JOAO GUILHERME SANTOS DE ARAUJO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO HENRIQUE OLIVEIRA DA SILVA',
    'JOAO HENRIQUE OLIVEIRA DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO LOPES DA SILVA',
    'JOAO LOPES DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO VITOR DA SILVA',
    'JOAO VITOR DA SILVA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO VITOR OLIVEIRA DA SILVA',
    'JOAO VITOR OLIVEIRA DA SILVA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOAO VITOR SOBRAL',
    'JOAO VITOR SOBRAL',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOEMERSON DA SILVA FERREIRA',
    'JOEMERSON DA SILVA FERREIRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JONATAS PEREIRA DA SILVA',
    'JONATAS PEREIRA DA SILVA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOSE HENRIQUE JUCA SAMPAIO FILHO',
    'JOSE HENRIQUE JUCA SAMPAIO FILHO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOSE MATEUS GOMES DA SILVA',
    'JOSE MATEUS GOMES DA SILVA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOSE MATHEUS DE LIMA GOMES',
    'JOSE MATHEUS DE LIMA GOMES',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOSE ORLANDO ALVES DE MENEZES NETO',
    'JOSE ORLANDO ALVES DE MENEZES NETO',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOSE RODRIGO DOS SANTOS',
    'JOSE RODRIGO DOS SANTOS',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOSE SALES NETO',
    'JOSE SALES NETO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOYCE KELLY SILVA DE OLIVEIRA',
    'JOYCE KELLY SILVA DE OLIVEIRA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JOYCE MAYANE DA SILVA CUSTODIO',
    'JOYCE MAYANE DA SILVA CUSTODIO',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'JULIANNE CIBELLY OLIVEIRA ROCHA',
    'JULIANNE CIBELLY OLIVEIRA ROCHA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'KAUA ENRIQUE RAMOS DA SILVA',
    'KAUA ENRIQUE RAMOS DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'KAUE MONTEIRO LIMA',
    'KAUE MONTEIRO LIMA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'KEMILY VITORIA DE BRITO SANTOS',
    'KEMILY VITORIA DE BRITO SANTOS',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'KEYVID WILLIAN MARQUES CAVALCANTE VITAL',
    'KEYVID WILLIAN MARQUES CAVALCANTE VITAL',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LAIS EMANUELE ALMEIDA DA ROCHA E SILVA',
    'LAIS EMANUELE ALMEIDA DA ROCHA E SILVA',
    'Administração',
    '2026.2',
    '6° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LARA RAYSSA SOUZA NEVES',
    'LARA RAYSSA SOUZA NEVES',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LARISSA RAFAELY SANTOS DE SOUZA',
    'LARISSA RAFAELY SANTOS DE SOUZA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LARISSA TEIXEIRA DA SILVA',
    'LARISSA TEIXEIRA DA SILVA',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LAURA LAISSA BARROS DE LIMA',
    'LAURA LAISSA BARROS DE LIMA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LAURA MYLENA DOS SANTOS LIMA',
    'LAURA MYLENA DOS SANTOS LIMA',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LAVINIA EDUARDA DE MELO DOS SANTOS',
    'LAVINIA EDUARDA DE MELO DOS SANTOS',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LEANDRA TENORIO DA SILVA',
    'LEANDRA TENORIO DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LEONARDO ALVES DE OLIVEIRA',
    'LEONARDO ALVES DE OLIVEIRA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LEONARDO DE OLIVEIRA FREIRE',
    'LEONARDO DE OLIVEIRA FREIRE',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LETICIA VITORIA DA SILVA MARINHO',
    'LETICIA VITORIA DA SILVA MARINHO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LI REJANE ALVES DE ARAUJO OLIVEIRA',
    'LI REJANE ALVES DE ARAUJO OLIVEIRA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LUCAS DE SOUZA VILELA',
    'LUCAS DE SOUZA VILELA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LUIZ FELIPE BEZERRA DE SOUZA',
    'LUIZ FELIPE BEZERRA DE SOUZA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'LUIZ GUSTAVO CRISTOVAO DA SILVA',
    'LUIZ GUSTAVO CRISTOVAO DA SILVA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MANOEL ISIDORIO DA SILVA NETO',
    'MANOEL ISIDORIO DA SILVA NETO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARCUS VINICIUS DE MORAES ALMEIDA',
    'MARCUS VINICIUS DE MORAES ALMEIDA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA EDUARDA GONCALVES DE ASSIS',
    'MARIA EDUARDA GONCALVES DE ASSIS',
    'Administração',
    '2026.2',
    '5° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA EDUARDA VERISSIMO LEITE',
    'MARIA EDUARDA VERISSIMO LEITE',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA ELOIZA SANTOS NASCIMENTO',
    'MARIA ELOIZA SANTOS NASCIMENTO',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA EMILIA FREITAS MACHADO',
    'MARIA EMILIA FREITAS MACHADO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA EVELYN DE NORONHA',
    'MARIA EVELYN DE NORONHA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA FERNANDA OLIVEIRA DA SILVA',
    'MARIA FERNANDA OLIVEIRA DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA GEOVANNA BARRETO OLIVEIRA',
    'MARIA GEOVANNA BARRETO OLIVEIRA',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA GISLAINE RAIMUNDA DA CONCEICAO',
    'MARIA GISLAINE RAIMUNDA DA CONCEICAO',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA JOELMA DA SILVA COSTA',
    'MARIA JOELMA DA SILVA COSTA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA JULIA SAMARA PEREIRA DE ARAUJO',
    'MARIA JULIA SAMARA PEREIRA DE ARAUJO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA LARYSSA YAKIANNE CAVALCANTI DE AZEVEDO',
    'MARIA LARYSSA YAKIANNE CAVALCANTI DE AZEVEDO',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA RAFAELA DA SILVA VIEIRA',
    'MARIA RAFAELA DA SILVA VIEIRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIA VITORIA BRAZ DA SILVA',
    'MARIA VITORIA BRAZ DA SILVA',
    'Administração',
    '2026.2',
    '5° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIANE COSTA FERREIRA SURUAGY',
    'MARIANE COSTA FERREIRA SURUAGY',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARIANNY SOUSA MELO CAVALCANTE',
    'MARIANNY SOUSA MELO CAVALCANTE',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARILIA ALEXANDRE GOMES DOS SANTOS',
    'MARILIA ALEXANDRE GOMES DOS SANTOS',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MARTA ALVES DE ALBUQUERQUE',
    'MARTA ALVES DE ALBUQUERQUE',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'MATEUS GABRIEL SILVA DE ALBUQUERQUE',
    'MATEUS GABRIEL SILVA DE ALBUQUERQUE',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'NAIRA HELOISA GOMES VIANA',
    'NAIRA HELOISA GOMES VIANA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'NAYARA RAFAELA DAS NEVES SILVA',
    'NAYARA RAFAELA DAS NEVES SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'NILTON CAMPOS COUTO NETO',
    'NILTON CAMPOS COUTO NETO',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'PEDRO VICTOR FIGUEIREDO DE GOES',
    'PEDRO VICTOR FIGUEIREDO DE GOES',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'PEDRO ZAQUE OLIVEIRA DOS SANTOS',
    'PEDRO ZAQUE OLIVEIRA DOS SANTOS',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'REBECA CELESTINA CAVALCANTE RIBEIRO',
    'REBECA CELESTINA CAVALCANTE RIBEIRO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'RENATO HENRIQUE DE ALMEIDA SALLES',
    'RENATO HENRIQUE DE ALMEIDA SALLES',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'RHUAN DA ROSA SILVA',
    'RHUAN DA ROSA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'ROBSON CARRILHO FERREIRA',
    'ROBSON CARRILHO FERREIRA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'RODRIGO VITAL GOUVEIA DE SOUSA',
    'RODRIGO VITAL GOUVEIA DE SOUSA',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'SARAH DO NASCIMENTO ARAUJO',
    'SARAH DO NASCIMENTO ARAUJO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'SARAH RAYANE RODRIGUES SALLES',
    'SARAH RAYANE RODRIGUES SALLES',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'SHAIANNY SOUSA DE MELO',
    'SHAIANNY SOUSA DE MELO',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'SHARLLYS MOREIRA DOS SANTOS',
    'SHARLLYS MOREIRA DOS SANTOS',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'SHWENK BARBOSA DA SILVA',
    'SHWENK BARBOSA DA SILVA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'SILVIA NAELLY CINTRA MANSO',
    'SILVIA NAELLY CINTRA MANSO',
    'Administração',
    '2026.2',
    '3° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'TACIANA MARQUES GONCALVES',
    'TACIANA MARQUES GONCALVES',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'TALITA DE GODOY GONZAGA',
    'TALITA DE GODOY GONZAGA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'TARCILA VITORIA DE LIMA PIMENTEL',
    'TARCILA VITORIA DE LIMA PIMENTEL',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'THAIS MARQUES GONCALVES',
    'THAIS MARQUES GONCALVES',
    'Administração',
    '2026.2',
    '2° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'THALLYS MANOEL SANTOS ESPINDOLA',
    'THALLYS MANOEL SANTOS ESPINDOLA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'THALLYS MICHEL DE COUTO LIMA',
    'THALLYS MICHEL DE COUTO LIMA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'THIAGO BATISTA BEZERRA',
    'THIAGO BATISTA BEZERRA',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'THIAGO FERREIRA ALVES DA SILVA',
    'THIAGO FERREIRA ALVES DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'VITOR LUIS FERREIRA DOS SANTOS',
    'VITOR LUIS FERREIRA DOS SANTOS',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'VITORIA ISABELLY GALDINO DA SILVA',
    'VITORIA ISABELLY GALDINO DA SILVA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'VITORIA RENATA SILVA DE LIMA MUNIZ',
    'VITORIA RENATA SILVA DE LIMA MUNIZ',
    'Administração',
    '2026.2',
    '9° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'WELLINGTON FERREIRA DO AMARAL',
    'WELLINGTON FERREIRA DO AMARAL',
    'Administração',
    '2026.2',
    '4° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'WHILMA KARINE MARINHO',
    'WHILMA KARINE MARINHO',
    'Administração',
    '2026.2',
    '1° Convocacao Lista Espera'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'YASMIM ARAUJO DE AGUIAR',
    'YASMIM ARAUJO DE AGUIAR',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'YASMIN DA SILVA OLIVEIRA',
    'YASMIN DA SILVA OLIVEIRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;
INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    'YURI MATHEUS CAVALCANTI DE SIQUEIRA',
    'YURI MATHEUS CAVALCANTI DE SIQUEIRA',
    'Administração',
    '2026.2',
    'Listagem Chamada Regular'
) ON CONFLICT (nome_normalizado) DO NOTHING;