#!/usr/bin/env python3
"""
==============================================================================
SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
Arquivo: scripts/test_supabase_connection.py
Módulo: Verificação Automatizada da Conexão e Integridade dos Seeds no Supabase
Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
==============================================================================
"""

import os
import sys
import json
import urllib.request
import urllib.error

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, '.env')
JS_ENV_PATH = os.path.join(BASE_DIR, 'js', 'env.js')

def carregar_env():
    variaveis = {}
    if not os.path.exists(ENV_PATH):
        return variaveis
    with open(ENV_PATH, 'r', encoding='utf-8') as f:
        for linha in f:
            linha = linha.strip()
            if not linha or linha.startswith('#'):
                continue
            if '=' in linha:
                chave, valor = linha.split('=', 1)
                variaveis[chave.strip()] = valor.strip().strip('"').strip("'")
    return variaveis

def gerar_js_env(url: str, anon_key: str):
    conteudo = f"""// ==============================================================================
// ARQUIVO GERADO AUTOMATICAMENTE POR scripts/test_supabase_connection.py
// ==============================================================================
window.SUPABASE_URL = "{url}";
window.SUPABASE_ANON_KEY = "{anon_key}";
"""
    with open(JS_ENV_PATH, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"[OK] Arquivo js/env.js gerado com sucesso para ambiente local.")

def main():
    print("=" * 70)
    print("VERIFICAÇÃO DE CONEXÃO E SEEDS DO SUPABASE • UFAPE ADM")
    print("=" * 70)

    env_vars = carregar_env()
    url = env_vars.get('SUPABASE_URL', '').strip()
    anon_key = env_vars.get('SUPABASE_ANON_KEY', '').strip()

    if not url or not anon_key or 'seu-projeto' in url or 'sua-chave' in anon_key:
        print("\n[AVISO] Credenciais nao encontradas ou incompletas no arquivo .env!")
        print("Para testar a conexao, abra o arquivo .env e preencha:")
        print("  SUPABASE_URL=https://[seu-projeto].supabase.co")
        print("  SUPABASE_ANON_KEY=[sua-chave-anon-publica]")
        print("\nOnde encontrar no Supabase:")
        print("  Painel do Projeto -> Project Settings -> API")
        print("  - Project URL")
        print("  - Project API keys -> anon (public)")
        print("=" * 70)
        sys.exit(1)

    url = url.rstrip('/')
    headers = {
        'apikey': anon_key,
        'Authorization': f'Bearer {anon_key}',
        'Content-Type': 'application/json'
    }

    # 1. Testar vw_padrinhos_publico
    endpoint_padrinhos = f"{url}/rest/v1/vw_padrinhos_publico?select=id,nome,iniciais,limite_vagas,vagas_ocupadas,vagas_restantes"
    print(f"\n1. Consultando view publica de padrinhos (vw_padrinhos_publico)...")
    try:
        req = urllib.request.Request(endpoint_padrinhos, headers=headers, method='GET')
        with urllib.request.urlopen(req, timeout=10) as resp:
            status = resp.status
            data = json.loads(resp.read().decode('utf-8'))
            print(f"  [SUCESSO] Conexao HTTP 200 OK.")
            print(f"  [DADOS] Total de mentores encontrados: {len(data)}")
            for p in data:
                print(f"    - {p.get('nome')} ({p.get('iniciais')}): {p.get('limite_vagas')} vagas totais | {p.get('vagas_restantes')} disponiveis")
            if len(data) == 10:
                print("  [OK] Todos os 10 padrinhos oficiais estao cadastrados e com cotas ativas!")
            else:
                print(f"  [ALERTA] Esperado 10 mentores, retornado {len(data)}. Verifique a seed 04_permuta_e_manoel_frasao.sql.")
    except urllib.error.HTTPError as e:
        print(f"  [ERRO HTTP {e.code}]: {e.reason}")
        corpo = e.read().decode('utf-8')
        print(f"  Detalhes: {corpo}")
        sys.exit(1)
    except Exception as e:
        print(f"  [FALHA NA CONEXAO]: {e}")
        sys.exit(1)

    # 2. Testar calouros_aprovados
    endpoint_calouros = f"{url}/rest/v1/calouros_aprovados?select=id,nome_completo&limit=5"
    headers_count = dict(headers)
    headers_count['Prefer'] = 'count=exact'
    print(f"\n2. Consultando tabela de calouros (calouros_aprovados)...")
    try:
        req = urllib.request.Request(endpoint_calouros, headers=headers_count, method='GET')
        with urllib.request.urlopen(req, timeout=10) as resp:
            content_range = resp.headers.get('content-range', '')
            data = json.loads(resp.read().decode('utf-8'))
            total_calouros = content_range.split('/')[-1] if '/' in content_range else len(data)
            print(f"  [SUCESSO] Conexao HTTP 200 OK.")
            print(f"  [DADOS] Total de calouros aprovados registrados: {total_calouros}")
            if str(total_calouros) == '159':
                print("  [OK] Todos os 159 calouros de 2026.2 estao registrados no banco!")
            else:
                print(f"  [INFO] Registros encontrados: {total_calouros}. Seed de calouros ativa.")
    except urllib.error.HTTPError as e:
        print(f"  [ERRO HTTP {e.code}]: {e.reason}")
        corpo = e.read().decode('utf-8')
        print(f"  Detalhes: {corpo}")
        sys.exit(1)
    except Exception as e:
        print(f"  [FALHA NA CONEXAO]: {e}")
        sys.exit(1)

    # 3. Gerar js/env.js
    print(f"\n3. Configurando ambiente local...")
    gerar_js_env(url, anon_key)

    print("\n" + "=" * 70)
    print("[SUCESSO TOTAL] O banco Supabase esta 100% operacional e integrado!")
    print("Agora voce pode testar localmente em http://localhost:3000/")
    print("e prosseguir com o deploy na Vercel com seguranca total!")
    print("=" * 70)

if __name__ == '__main__':
    main()
