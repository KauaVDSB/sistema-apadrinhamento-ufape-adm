#!/usr/bin/env python3
"""
==============================================================================
SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
Arquivo: scripts/ingest_data.py
Módulo: Pipeline de Ingestão de Dados (Calouros 2026.2 e Padrinhos Oficiais)
Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
Diretrizes: ADR-002, ADR-003, ADR-004
==============================================================================
"""

import os
import re
import json
import unicodedata
from pypdf import PdfReader

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MATERIAIS_DIR = '/root/Desktop/projects/active/UFAPE/apadrinhamento/materiais'
CALOUROS_DIR = os.path.join(MATERIAIS_DIR, 'listagens_calouros')
VETERANOS_DIR = os.path.join(MATERIAIS_DIR, 'veteranos_e_padrinhos')

def normalizar_texto(texto: str) -> str:
    """Normalização ortográfica Unicode NFD (sem acentos, minúsculas, pontuação limpa)"""
    if not texto:
        return ""
    nfkd = unicodedata.normalize('NFD', texto)
    sem_acento = ''.join(c for c in nfkd if unicodedata.category(c) != 'Mn')
    limpo = re.sub(r'[^a-zA-Z0-9\s]', '', sem_acento)
    return re.sub(r'\s+', ' ', limpo).strip().upper()

def carregar_veteranos_2026_1() -> set:
    """Carrega a ata de 2026.1 para expurgo dos veteranos"""
    ata_path = os.path.join(VETERANOS_DIR, 'Ata Veteranos 2026.1 ADM.txt')
    with open(ata_path, 'r', encoding='utf-8') as f:
        conteudo = f.read()
    match = re.search(r'\[(.*)\]', conteudo, re.DOTALL)
    if not match:
        raise ValueError("Array de veteranos não encontrado na ata.")
    lista_veteranos = json.loads('[' + match.group(1) + ']')
    return {normalizar_texto(v) for v in lista_veteranos}

def extrair_calouros_pdf(veteranos_set: set) -> tuple:
    """
    Extrai todos os calouros de Administração dos 10 editais em PDF da UFAPE.
    Aplica expurgo contra a ata de 2026.1 e deduplica por nome normalizado.
    """
    line_pat = re.compile(r'^\s*(\d+)\s+(\d{3}\*{4}\d{4})\s+([0-9]+(?:\.[0-9]+)?)\s*([A-ZÀ-Ú\s\.\'-]+)$')
    
    calouros_por_nome = {}
    expurgados = []
    
    arquivos_pdf = [
        'Listagem Chamada Regular.pdf',
        '1° Convocacao Lista Espera.pdf',
        '2° Convocacao Lista Espera.pdf',
        '3° Convocacao Lista Espera.pdf',
        '4° Convocacao Lista Espera.pdf',
        '5° Convocacao Lista Espera.pdf',
        '6° Convocacao Lista Espera.pdf',
        '7° Convocacao Lista Espera.pdf',
        '8° Convocacao Lista Espera.pdf',
        '9° Convocacao Lista Espera.pdf'
    ]
    
    for nome_arq in arquivos_pdf:
        caminho = os.path.join(CALOUROS_DIR, nome_arq)
        if not os.path.exists(caminho):
            print(f"[AVISO] Arquivo não encontrado: {caminho}")
            continue
        
        chamada_label = nome_arq.replace('.pdf', '')
        reader = PdfReader(caminho)
        
        for p_idx, page in enumerate(reader.pages):
            texto = page.extract_text()
            if 'ADMINISTRAÇÃO' not in texto.upper():
                continue
            
            for line in texto.split('\n'):
                line_str = line.strip()
                m = line_pat.match(line_str)
                if m:
                    seq, cpf, nota, nome_bruto = m.groups()
                    nome_completo = re.sub(r'\s+', ' ', nome_bruto).strip()
                    nome_norm = normalizar_texto(nome_completo)
                    
                    if nome_norm in veteranos_set:
                        if nome_completo not in [e['nome_completo'] for e in expurgados]:
                            expurgados.append({
                                'nome_completo': nome_completo,
                                'cpf': cpf,
                                'nota': float(nota),
                                'chamada': chamada_label
                            })
                        continue
                    
                    if nome_norm not in calouros_por_nome:
                        calouros_por_nome[nome_norm] = {
                            'nome_completo': nome_completo,
                            'nome_normalizado': nome_norm,
                            'cpf_parcial': cpf,
                            'nota_enem': float(nota),
                            'chamadas': [chamada_label]
                        }
                    else:
                        if chamada_label not in calouros_por_nome[nome_norm]['chamadas']:
                            calouros_por_nome[nome_norm]['chamadas'].append(chamada_label)
    
    calouros_lista = list(calouros_por_nome.values())
    calouros_lista.sort(key=lambda x: x['nome_completo'])
    return calouros_lista, expurgados

def carregar_dados_padrinhos() -> list:
    """
    Retorna os dados oficiais dos 9 padrinhos e madrinhas reais extraídos de Padrinhos e Madrinhas.txt.
    Sem fotos, com iniciais de 2 caracteres, respeito a cotas (Tamires com 4 vagas, demais com 5).
    """
    padrinhos = [
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
                1: ["C", "A"], 2: ["D", "C"], 3: ["B", "C"], 4: ["C", "A"],
                5: ["C", "B"], 6: ["D", "B"], 7: ["B", "C"], 8: ["B", "C"],
                9: ["B", "C"], 10: ["C", "B"], 11: ["C", "D"], 12: ["B", "C"]
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
            "hobbies": ["Prática de Esportes", "Futebol", "Música Nacional", "Resenha Universitária"],
            "habilidades_mentoria": ["Sobrevivência em Matemática", "Dicas de Introdução à Administração", "Apoio e acolhimento prático"]
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
                1: ["A", "B"], 2: ["B", "C"], 3: ["A", "B"], 4: ["A", "C"],
                5: ["A", "C"], 6: ["C", "D"], 7: ["B", "D"], 8: ["B", "A"],
                9: ["A", "C"], 10: ["B", "C"], 11: ["D", "A"], 12: ["B", "C"]
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
            "hobbies": ["Jogos Mobile", "Esportes", "Cantina com Amigos", "Economia"],
            "habilidades_mentoria": ["Introdução à Economia", "Gestão Financeira", "Adaptação ao campus"]
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
                1: ["A", "D"], 2: ["A", "D"], 3: ["C", "B"], 4: ["B", "A"],
                5: ["B", "D"], 6: ["B", "E"], 7: ["C", "A"], 8: ["A", "B"],
                9: ["C", "A"], 10: ["B", "D"], 11: ["C", "B"], 12: ["A", "E"]
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
            "hobbies": ["Desenho & Ilustração", "Animes & Mangás", "Música Brasileira", "Café"],
            "habilidades_mentoria": ["Contabilidade Básica", "Marketing & Criação", "Organização pessoal e horários"]
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
                1: ["A", "C"], 2: ["A", "C"], 3: ["B", "C"], 4: ["A", "B"],
                5: ["A", "B"], 6: ["C", "B"], 7: ["A", "C"], 8: ["A", "C"],
                9: ["A", "C"], 10: ["B", "A"], 11: ["C", "A"], 12: ["A", "E"]
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
            "hobbies": ["Leitura", "Podcasts de Conhecimento", "Finanças", "Projetos Acadêmicos"],
            "habilidades_mentoria": ["Visão Geral de ADM", "Autonomia de Estudos", "Estratégia e Planejamento de Carreira"]
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
                1: ["B", "C"], 2: ["C", "B"], 3: ["A", "B"], 4: ["C", "B"],
                5: ["C", "B"], 6: ["D", "A"], 7: ["B", "C"], 8: ["C", "B"],
                9: ["B", "C"], 10: ["C", "D"], 11: ["A", "D"], 12: ["C", "B"]
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
            "hobbies": ["Gastronomia & Culinária", "Futebol", "Mídias Sociais", "Séries"],
            "habilidades_mentoria": ["Dicas de Contabilidade", "Como lidar com notas e provas", "Companheirismo e motivação"]
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
                1: ["B", "C"], 2: ["C", "B"], 3: ["A", "B"], 4: ["B", "C"],
                5: ["C", "B"], 6: ["B", "D"], 7: ["B", "C"], 8: ["B", "C"],
                9: ["B", "A"], 10: ["A", "C"], 11: ["A", "D"], 12: ["C", "E"]
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
            "hobbies": ["Futebol", "Encontros com Amigos", "Debates Estratégicos", "Esportes"],
            "habilidades_mentoria": ["Filosofia e Ética", "Visão de Negócios e Parcerias", "Socialização no campus"]
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
                1: ["A", "D"], 2: ["A", "D"], 3: ["B", "C"], 4: ["A", "B"],
                5: ["A", "B"], 6: ["A", "D"], 7: ["C", "A"], 8: ["A", "B"],
                9: ["A", "B"], 10: ["B", "C"], 11: ["C", "B"], 12: ["A", "B"]
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
            "hobbies": ["Academia & Musculação", "Séries e Filmes", "Leitura", "Saúde e Bem-Estar"],
            "habilidades_mentoria": ["Introdução à Contabilidade", "Gestão de Pessoas e Logística", "Transição do Ensino Médio"]
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
                1: ["C", "A"], 2: ["A", "C"], 3: ["B", "C"], 4: ["A", "C"],
                5: ["A", "C"], 6: ["C", "D"], 7: ["A", "C"], 8: ["A", "B"],
                9: ["A", "B"], 10: ["B", "A"], 11: ["C", "B"], 12: ["D", "A"]
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
            "hobbies": ["Cinema Clássico", "Futebol", "The Office", "Finanças"],
            "habilidades_mentoria": ["Contabilidade Financeira", "Rigor acadêmico com ética", "Apoio prático para provas"]
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
            "limite_vagas": 4, # COTA ESPECÍFICA DE 4 VAGAS (ADR-003)
            "respostasEsperadas": {
                1: ["B", "D"], 2: ["C", "D"], 3: ["A", "B"], 4: ["B", "A"],
                5: ["B", "C"], 6: ["A", "F"], 7: ["B", "C"], 8: ["C", "B"],
                9: ["B", "C"], 10: ["D", "C"], 11: ["A", "D"], 12: ["C", "B"]
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
            "hobbies": ["Passeios com Amigos", "Música Sertaneja", "Pastel Pós-Prova", "Comunicação"],
            "habilidades_mentoria": ["Gestão de Pessoas e Empatia", "Comunicação com Professores", "Acolhimento aos Calouros"]
        }
    ]
    return padrinhos

def gerar_sql_padrinhos(padrinhos: list) -> str:
    """Gera script SQL para inserção/atualização dos padrinhos reais no Supabase"""
    linhas = [
        "-- ==============================================================================",
        "-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)",
        "-- Arquivo: database/seeds/01_padrinhos_reais.sql",
        "-- Ingestão dos 9 mentores veteranos oficiais (Tamires: cota 4; demais: cota 5)",
        "-- ==============================================================================\n"
    ]
    
    for idx, p in enumerate(padrinhos, start=1):
        hobbies_sql = "ARRAY[" + ", ".join(f"'{h}'" for h in p["hobbies"]) + "]::TEXT[]"
        materias_sql = "ARRAY['" + p["experiencia_no_curso"]["materia_preferida_no_primeiro_periodo"].replace("'", "''") + "']::TEXT[]"
        bio_escaped = p["resumo"].replace("'", "''")
        nome_escaped = p["nome"].replace("'", "''")
        lemas_escaped = p["lemas"].replace("'", "''")
        
        sql = f"""INSERT INTO public.padrinhos (
    nome, iniciais, email_institucional, periodo, estilo_mentoria, bio, 
    sticker_url, hobbies, materias_favoritas, limite_vagas, ativo, ordem_exibicao
) VALUES (
    '{nome_escaped}',
    '{p["iniciais"]}',
    '{p["email_institucional"]}',
    '{p["periodo"]}',
    '{p["areaDestaque"]}',
    '{bio_escaped}',
    'assets/img/padrinhos/padrao.webp',
    {hobbies_sql},
    {materias_sql},
    {p["limite_vagas"]},
    true,
    {idx}
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
"""
        linhas.append(sql)
    
    return "\n".join(linhas)

def gerar_sql_calouros(calouros: list) -> str:
    """Gera script SQL para inserção dos calouros aprovados de 2026.2 no Supabase"""
    linhas = [
        "-- ==============================================================================",
        "-- SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)",
        "-- Arquivo: database/seeds/02_calouros_aprovados.sql",
        f"-- Ingestão dos {len(calouros)} calouros oficiais de Administração (2026.2)",
        "-- ==============================================================================\n"
    ]
    
    for c in calouros:
        nome_esc = c['nome_completo'].replace("'", "''")
        norm_esc = c['nome_normalizado'].replace("'", "''")
        chamada_esc = ", ".join(c['chamadas']).replace("'", "''")
        
        sql = f"""INSERT INTO public.calouros_aprovados (
    nome_completo, nome_normalizado, curso, semestre_ingresso, chamada_edital
) VALUES (
    '{nome_esc}',
    '{norm_esc}',
    'Administração',
    '2026.2',
    '{chamada_esc}'
) ON CONFLICT (nome_normalizado) DO NOTHING;"""
        linhas.append(sql)
        
    return "\n".join(linhas)

def gerar_js_calouros_list(calouros: list) -> str:
    """Gera módulo JS com a lista normalizada para validação instantânea no frontend"""
    lista_simplificada = [
        {
            "n": c["nome_completo"],
            "u": c["nome_normalizado"],
            "c": c["chamadas"][0]
        }
        for c in calouros
    ]
    
    json_str = json.dumps(lista_simplificada, ensure_ascii=False, indent=2)
    return f"""/**
 * Base Oficial de Calouros Aprovados • Bacharelado em Administração (UFAPE 2026.2)
 * Total de estudantes auditados: {len(calouros)} calouros
 * Sanitizado e livre de veteranos de 2026.1
 */

export const CALOUROS_APROVADOS_2026_2 = {json_str};

export const CALOUROS_NORMALIZADOS_SET = new Set(
  CALOUROS_APROVADOS_2026_2.map(c => c.u)
);
"""

def main():
    print("[1/5] Carregando ata de veteranos 2026.1...")
    veteranos = carregar_veteranos_2026_1()
    print(f"      Total de veteranos carregados: {len(veteranos)}")
    
    print("[2/5] Extraindo candidatos de Administração dos 10 PDFs...")
    calouros, expurgados = extrair_calouros_pdf(veteranos)
    print(f"      Veteranos identificados e expurgados: {len(expurgados)}")
    for exp in expurgados:
        print(f"        -> EXPURGADO: {exp['nome_completo']} ({exp['chamada']})")
    print(f"      Calouros válidos para 2026.2: {len(calouros)}")
    
    print("[3/5] Carregando dados oficiais dos 9 padrinhos e madrinhas...")
    padrinhos = carregar_dados_padrinhos()
    print(f"      Total de mentores carregados: {len(padrinhos)}")
    
    print("[4/5] Gerando artefatos de banco de dados (SQL Seeds)...")
    os.makedirs(os.path.join(BASE_DIR, 'database', 'seeds'), exist_ok=True)
    
    sql_padrinhos = gerar_sql_padrinhos(padrinhos)
    with open(os.path.join(BASE_DIR, 'database', 'seeds', '01_padrinhos_reais.sql'), 'w', encoding='utf-8') as f:
        f.write(sql_padrinhos)
    print("      -> database/seeds/01_padrinhos_reais.sql gerado com sucesso!")
    
    sql_calouros = gerar_sql_calouros(calouros)
    with open(os.path.join(BASE_DIR, 'database', 'seeds', '02_calouros_aprovados.sql'), 'w', encoding='utf-8') as f:
        f.write(sql_calouros)
    print("      -> database/seeds/02_calouros_aprovados.sql gerado com sucesso!")
    
    print("[5/5] Gerando módulo de validação de frontend (JS)...")
    js_calouros = gerar_js_calouros_list(calouros)
    with open(os.path.join(BASE_DIR, 'js', 'calouros-data.js'), 'w', encoding='utf-8') as f:
        f.write(js_calouros)
    print("      -> js/calouros-data.js gerado com sucesso!")
    
    print("\n✅ Ingestão e geração de artefatos concluída com sucesso!")

if __name__ == '__main__':
    main()
