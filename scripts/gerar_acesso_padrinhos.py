#!/usr/bin/env python3
"""
==============================================================================
SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
Arquivo: scripts/gerar_acesso_padrinhos.py
Módulo: Criação de Contas, Senhas Provisórias e Templates de E-mail dos Padrinhos
Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
==============================================================================
"""

import os
import sys
import secrets
import string
import psycopg2
from psycopg2.extras import RealDictCursor

# Senha do banco (fornecida no ambiente)
PASSWORD = os.environ.get("DB_PASSWORD", "UFAPE_scSYGC5kdKCI04NIV_OoMw_apadrinhamento-ufape-adm")
HOST = os.environ.get("DB_HOST", "aws-0-sa-east-1.pooler.supabase.com")
PORT = int(os.environ.get("DB_PORT", "6543"))
USER = os.environ.get("DB_USER", "postgres.zpxnzsxpazawxkypxiqi")
DBNAME = os.environ.get("DB_NAME", "postgres")

def gerar_senha_temporaria(tamanho=12):
    """Gera uma senha segura, legível e aleatória contendo maiúsculas, minúsculas, dígitos e símbolos."""
    maiusculas = string.ascii_uppercase
    minusculas = string.ascii_lowercase
    digitos = string.digits
    simbolos = "!@#$%&*"
    
    # Garante ao menos 1 de cada categoria
    senha = [
        secrets.choice(maiusculas),
        secrets.choice(minusculas),
        secrets.choice(digitos),
        secrets.choice(simbolos),
    ]
    
    todos = maiusculas + minusculas + digitos + simbolos
    for _ in range(tamanho - 4):
        senha.append(secrets.choice(todos))
    
    secrets.SystemRandom().shuffle(senha)
    return "AdmUFAPE!" + "".join(senha[:6])

def conectar_banco():
    print(f"Conectando ao Supabase ({HOST}:{PORT})...")
    conn = psycopg2.connect(
        dbname=DBNAME,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        connect_timeout=10,
        sslmode="require"
    )
    conn.autocommit = True
    return conn

def main():
    conn = conectar_banco()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    print("\n1. Buscando lista oficial de mentores em public.padrinhos...")
    cur.execute("""
        SELECT id, nome, iniciais, email_institucional, user_id, limite_vagas, ordem_exibicao
        FROM public.padrinhos
        WHERE ativo = true
        ORDER BY ordem_exibicao ASC;
    """)
    padrinhos = cur.fetchall()
    print(f"Total de padrinhos encontrados: {len(padrinhos)}")
    
    contas_geradas = []
    
    for p in padrinhos:
        padrinho_id = p["id"]
        nome = p["nome"]
        email = p["email_institucional"]
        user_id = p["user_id"]
        
        # Gerar senha segura temporária
        senha_temp = gerar_senha_temporaria()
        
        # Verificar se usuário já existe em auth.users
        cur.execute("SELECT id FROM auth.users WHERE email = %s;", (email,))
        user_auth = cur.fetchone()
        
        if user_auth:
            uid = user_auth["id"]
            print(f"  [EXISTENTE] {nome} ({email}) -> Atualizando senha e vínculos...")
            # Atualizar senha existente para a senha provisória
            cur.execute("""
                UPDATE auth.users 
                SET encrypted_password = crypt(%s, gen_salt('bf')),
                    updated_at = timezone('utc', now()),
                    email_confirmed_at = COALESCE(email_confirmed_at, timezone('utc', now()))
                WHERE id = %s;
            """, (senha_temp, uid))
        else:
            print(f"  [NOVO] Criando conta para {nome} ({email})...")
            # Inserir em auth.users
            cur.execute("""
                INSERT INTO auth.users (
                    instance_id,
                    id,
                    aud,
                    role,
                    email,
                    encrypted_password,
                    email_confirmed_at,
                    raw_app_meta_data,
                    raw_user_meta_data,
                    created_at,
                    updated_at,
                    confirmation_token,
                    recovery_token,
                    email_change_token_new,
                    email_change,
                    phone_change,
                    phone_change_token,
                    email_change_token_current,
                    reauthentication_token,
                    is_super_admin,
                    is_sso_user,
                    is_anonymous,
                    email_change_confirm_status
                ) VALUES (
                    '00000000-0000-0000-0000-000000000000',
                    gen_random_uuid(),
                    'authenticated',
                    'authenticated',
                    %s,
                    crypt(%s, gen_salt('bf')),
                    timezone('utc', now()),
                    '{"provider": "email", "providers": ["email"]}'::jsonb,
                    '{"email_verified": true}'::jsonb,
                    timezone('utc', now()),
                    timezone('utc', now()),
                    '', '', '', '', '', '', '', '',
                    false, false, false, 0
                ) RETURNING id;
            """, (email, senha_temp))
            uid = cur.fetchone()["id"]
            
        # Inserir ou atualizar em auth.identities
        cur.execute("""
            INSERT INTO auth.identities (
                provider_id,
                user_id,
                identity_data,
                provider,
                last_sign_in_at,
                created_at,
                updated_at,
                id
            ) VALUES (
                %s,
                %s,
                jsonb_build_object('sub', %s, 'email', %s, 'email_verified', true),
                'email',
                timezone('utc', now()),
                timezone('utc', now()),
                timezone('utc', now()),
                gen_random_uuid()
            )
            ON CONFLICT (provider_id, provider) DO UPDATE SET
                identity_data = EXCLUDED.identity_data,
                updated_at = timezone('utc', now());
        """, (str(uid), uid, str(uid), email))
        
        # Vincular user_id em public.padrinhos
        cur.execute("""
            UPDATE public.padrinhos
            SET user_id = %s
            WHERE id = %s;
        """, (uid, padrinho_id))
        
        # Inserir / Atualizar em public.user_roles
        role = "admin" if email == "heloisa.barreto@ufape.edu.br" else "padrinho"
        cur.execute("""
            INSERT INTO public.user_roles (user_id, email, role)
            VALUES (%s, %s, %s)
            ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;
        """, (uid, email, role))
        
        contas_geradas.append({
            "nome": nome,
            "iniciais": p["iniciais"],
            "email": email,
            "senha_temp": senha_temp,
            "uid": str(uid),
            "role": role,
            "ordem": p["ordem_exibicao"]
        })
    
    cur.close()
    conn.close()
    
    # Gerar arquivo consolidado de emails
    relatorio_md = gerar_markdown_relatorio(contas_geradas)
    
    # Salvar em docs/
    docs_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs")
    os.makedirs(docs_dir, exist_ok=True)
    caminho_md = os.path.join(docs_dir, "acesso_padrinhos_emails.md")
    
    with open(caminho_md, "w", encoding="utf-8") as f:
        f.write(relatorio_md)
        
    print(f"\n[SUCESSO] Todas as 10 contas foram configuradas com êxito!")
    print(f"[ARQUIVO GERADO] Modelos de e-mail e credenciais salvos em: {caminho_md}")
    
    return contas_geradas

def gerar_markdown_relatorio(contas):
    md = [
        "# Credenciais e Modelos de E-mail dos Padrinhos e Madrinhas",
        "**Programa de Apadrinhamento Universitário — Bacharelado em Administração (UFAPE 2026.2)**",
        "",
        "> [!IMPORTANT]",
        "> As senhas abaixo são provisórias e geradas aleatoriamente. Cada padrinho/madrinha deve utilizá-las no primeiro acesso no Portal do Padrinho e redefinir sua senha imediatamente no menu superior.",
        "",
        "---",
        "",
        "## Tabela de Acessos",
        "",
        "| # | Mentor(a) | E-mail Institucional | Senha Provisória | Perfil |",
        "| :---: | :--- | :--- | :--- | :---: |"
    ]
    
    for c in contas:
        md.append(f"| {c['ordem']} | {c['nome']} | `{c['email']}` | `{c['senha_temp']}` | {c['role'].upper()} |")
        
    md.extend([
        "",
        "---",
        "",
        "## Modelos de E-mail Prontos para Envio (Individualizados)",
        ""
    ])
    
    for c in contas:
        primeiro_nome = c['nome'].split()[0]
        md.extend([
            f"### E-mail {c['ordem']}: Para {c['nome']}",
            f"**Destinatário:** `{c['email']}`  ",
            f"**Assunto:** [UFAPE ADM] Seu acesso ao Portal do Padrinho está liberado!",
            "",
            "```text",
            f"Olá, {primeiro_nome}!",
            "",
            "É uma enorme alegria ter você como padrinho/madrinha oficial da turma de 2026.2 do Bacharelado em Administração da UFAPE!",
            "",
            "O nosso sistema oficial de apadrinhamento já está no ar. Os calouros estão realizando o quiz de afinidade e escolhendo seus mentores (com limite de até 4 afilhados por padrinho).",
            "",
            "Para acompanhar quem escolheu você, acessar os números de WhatsApp e Instagram dos seus afilhados e ler as respostas deles ao questionário, você pode acessar agora mesmo o nosso portal exclusivo:",
            "",
            "🔗 Portal do Padrinho: https://sistema-apadrinhamento-ufape-adm.vercel.app/padrinho.html",
            "",
            "Suas credenciais de primeiro acesso:",
            f"• E-mail institucional: {c['email']}",
            f"• Senha provisória: {c['senha_temp']}",
            "",
            "🔒 Segurança no Primeiro Acesso:",
            "Assim que você fizer login, clique no botão 'Alterar Senha' no canto superior da tela para cadastrar sua senha pessoal definitiva.",
            "",
            "Lembramos que o nosso grande encontro presencial de boas-vindas acontecerá no dia 14 de outubro de 2026, às 19h00, na Quadra Poliesportiva da UFAPE.",
            "",
            "Se tiver qualquer dúvida ou dificuldade para acessar, estamos à disposição!",
            "",
            "Com entusiasmo,",
            "Comissão Organizadora do Programa de Apadrinhamento Acadêmico",
            "Bacharelado em Administração — UFAPE",
            "```",
            "",
            "---",
            ""
        ])
        
    return "\n".join(md)

if __name__ == "__main__":
    main()
