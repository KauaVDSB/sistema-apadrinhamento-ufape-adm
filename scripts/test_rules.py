#!/usr/bin/env python3
"""
==============================================================================
SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
Arquivo: scripts/test_rules.py
Módulo: Testes Automatizados de Regras de Negócio e Cotas
Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
Diretrizes: ADR-002, ADR-003, ADR-004
==============================================================================
"""

import os
import sys
import json
import re
from datetime import datetime, timezone, timedelta

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.ingest_data import (
    carregar_veteranos_2026_1,
    extrair_calouros_pdf,
    carregar_dados_padrinhos,
    normalizar_texto
)

def test_cotas_padrinhos():
    print("[TESTE 1] Verificacao de Cotas dos Mentores (10 Mentores com 4 vagas cada)...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_js_path = os.path.join(base_dir, "js", "data.js")
    with open(data_js_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    match = re.search(r"export const PADRINHOS = (\[.*?\]);", content, re.DOTALL)
    assert match, "PADRINHOS array nao encontrado em js/data.js"
    padrinhos = json.loads(match.group(1))
    assert len(padrinhos) == 10, f"Esperado 10 padrinhos, obtido {len(padrinhos)}"
    
    manoel = next((p for p in padrinhos if "MANOEL" in p["nome"].upper()), None)
    assert manoel is not None, "Mentor Manoel Frasão não encontrado em js/data.js"
    
    for p in padrinhos:
        assert p["limite_vagas"] == 4, f"Cota de {p['nome']} deve ser 4, obtido {p['limite_vagas']}"
        assert len(p["iniciais"]) == 2, f"Iniciais de {p['nome']} devem ter 2 letras: {p['iniciais']}"
    
    total_vagas = sum(p["limite_vagas"] for p in padrinhos)
    assert total_vagas == 40, f"Total de vagas deve ser 40 (10*4), obtido {total_vagas}"
    print(f"  [OK] Cotas aprovadas: 10 mentores com 4 vagas cada (Total: {total_vagas} vagas)")

def test_purga_veteranos():
    print("[TESTE 2] Auditoria da Purga de Veteranos de 2026.1...")
    veteranos = carregar_veteranos_2026_1()
    calouros, expurgados = extrair_calouros_pdf(veteranos)
    
    assert len(veteranos) == 36, f"Ata deve conter 36 veteranos, obtido {len(veteranos)}"
    assert len(expurgados) == 35, f"Esperado 35 veteranos expurgados das listas, obtido {len(expurgados)}"
    
    nomes_calouros_norm = {c["nome_normalizado"] for c in calouros}
    intersecao = nomes_calouros_norm.intersection(veteranos)
    assert len(intersecao) == 0, f"Nenhum veterano pode estar nos calouros validos! Encontrados: {intersecao}"
    print(f"  [OK] Purga 100% integra: 35 veteranos expurgados e 0 vazamentos na base final")

def test_base_calouros_e_homonimos():
    print("[TESTE 3] Auditoria de Unicidade e Homonimos de 2026.2...")
    veteranos = carregar_veteranos_2026_1()
    calouros, _ = extrair_calouros_pdf(veteranos)
    
    assert len(calouros) == 159, f"Esperado 159 calouros validos, obtido {len(calouros)}"
    
    nomes_vistos = set()
    for c in calouros:
        n = c["nome_normalizado"]
        assert n not in nomes_vistos, f"Nome duplicado detectado: {n}"
        nomes_vistos.add(n)
        assert len(n) >= 5, f"Nome muito curto: {n}"
    
    print(f"  [OK] Base de 159 calouros aprovados auditada com unicidade nominal absoluta")

def test_validacao_nominal_simulada():
    print("[TESTE 4] Simulacao de Validacao Nominal no Frontend...")
    veteranos = carregar_veteranos_2026_1()
    calouros, _ = extrair_calouros_pdf(veteranos)
    calouros_set = {c["nome_normalizado"] for c in calouros}
    
    # 1. Calouro valido da lista
    nome_teste_valido = "ADRIANO VANDERLEI DE OLIVEIRA JUNIOR"
    assert normalizar_texto(nome_teste_valido) in calouros_set, "Calouro valido deve ser reconhecido"
    
    # 2. Com acentuacao e minusculas
    nome_com_acento = "adriano vanderlei de oliveira júnior"
    assert normalizar_texto(nome_com_acento) in calouros_set, "Normalizacao deve tolerar acentos e minusculas"
    
    # 3. Veterano da ata de 2026.1
    veterano_teste = "HELOISA PEREIRA BARRETO"
    assert normalizar_texto(veterano_teste) not in calouros_set, "Veterano nao pode ser aceito como calouro"
    
    # 4. Nome ficticio
    nome_fake = "FULANO DE TAL DA SILVA INVENTADO"
    assert normalizar_texto(nome_fake) not in calouros_set, "Nome ficticio nao pode estar na base oficial"
    print("  [OK] Validacao nominal comporta todos os cenarios com sucesso")

def test_contrato_frontend_e_seguranca():
    print("[TESTE 5] Auditoria de Seguranca UX e Contratos do Frontend...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    index_path = os.path.join(base_dir, "index.html")
    app_js_path = os.path.join(base_dir, "js", "app.js")
    css_path = os.path.join(base_dir, "css", "styles.css")
    
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()
    with open(app_js_path, "r", encoding="utf-8") as f:
        js = f.read()
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
        
    # 1. Zero exposicao de WhatsApp calouro -> mentor antes da cerimonia
    assert "btn-whatsapp-share" not in html, "Botao de WhatsApp nao pode estar no HTML"
    assert "api.whatsapp.com/send" not in js, "Chamadas diretas de WhatsApp nao devem existir no fluxo de apadrinhamento"
    
    # 2. Aviso de Primeiro Encontro na Cerimonia presente
    assert "Primeiro Encontro no Workshop & Cerimônia Oficial" in html, "Aviso da cerimonia deve estar no card de sucesso"
    
    # 3. Elementos dinamicos de boas-vindas e lembrete
    assert 'id="nav-action-btn"' in html, "Botao do header deve ter ID nav-action-btn"
    assert 'id="calouro-reminder-bar"' in html, "Barra de lembrete deve ter ID calouro-reminder-bar"
    assert 'id="hero-selected-banner"' in html, "Hero banner deve ter ID hero-selected-banner"
    
    # 4. Estilos de badge de cotas
    assert ".card-quota-badge" in css, "CSS deve conter estilos para .card-quota-badge"
    assert ".quota-exhausted" in css, "CSS deve conter estilos para .quota-exhausted"
    
    # 5. Garantia de isolamento entre selecao em memoria e confirmacao
    assert "saveConfirmedStateToStorage" in js, "js/app.js deve persistir apenas padrinhos confirmados"
    assert "confirmedPadrinho" in js, "js/app.js deve gerenciar confirmedPadrinho isoladamente de selectedPadrinho"
    
    # 6. Ausencia de botoes de demonstracao rapida (demo)
    assert "demo-lucas-btn" not in html, "Botoes demo nao devem estar no HTML"
    assert "simularRespostasPara" not in js, "Metodos de simulacao demo nao devem existir em app.js"
    
    # 7. Modal de Permuta e Fluxo de Troca Unica
    assert 'id="permuta-modal"' in html, "Modal de permuta deve existir no HTML"
    assert "permutou" in js, "js/app.js deve gerenciar controle de permuta"
    assert "tentarSelecionarPadrinho" in js, "js/app.js deve validar selecao com tentarSelecionarPadrinho"
    
    # 8. Link Oficial Even3 e Dados do Evento
    assert "even3.com.br/workshop-adm-785501" in html, "Link do Even3 deve estar presente no HTML"
    assert "14 de outubro" in html, "Data do evento oficial deve constar no HTML"
    
    print("  [OK] Contrato do Frontend e UX 100% aderente as diretrizes de privacidade, suspense e regras de negocio")

def main():
    print("=" * 70)
    print("SUITE DE TESTES AUTOMATIZADOS - APADRINHAMENTO UFAPE ADM")
    print("=" * 70)
    
    try:
        test_cotas_padrinhos()
        test_purga_veteranos()
        test_base_calouros_e_homonimos()
        test_validacao_nominal_simulada()
        test_contrato_frontend_e_seguranca()
        print("=" * 70)
        print("[SUCESSO] TODOS OS 5 TESTES PASSARAM COM EXITO!")
        print("=" * 70)
    except AssertionError as err:
        print(f"\n[FALHA] NO TESTE: {err}")
        sys.exit(1)

if __name__ == '__main__':
    main()
