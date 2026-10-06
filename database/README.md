# Guia de Configuração do Banco de Dados (Supabase)
### Sistema de Apadrinhamento Acadêmico • Bacharelado em Administração (UFAPE)

Este guia orienta a criação do projeto no Supabase, execução do schema SQL, ativação de Row Level Security (RLS) e obtenção das credenciais de conexão para o frontend.

---

## Passo 1: Criar o Projeto no Supabase

1. Acesse o console oficial: [supabase.com/dashboard](https://supabase.com/dashboard)
2. Faça login com sua conta (GitHub ou e-mail);
3. Clique em **"New Project"**;
4. Preencha as configurações:
   * **Organization:** Selecione sua organização pessoal;
   * **Name:** `sistema-apadrinhamento-ufape-adm` (ou nome de sua preferência);
   * **Database Password:** Gere uma senha forte e salve em local seguro;
   * **Region:** Selecione `South America (São Paulo) - sa-east-1` (menor latência para o Brasil);
   * **Pricing Plan:** Free Plan (suficiente para nossa volumetria);
5. Clique em **"Create new project"** e aguarde 1 a 2 minutos até o provisionamento do cluster.

---

## Passo 2: Executar o Script de Modelagem (`schema.sql`)

1. No menu lateral esquerdo do Supabase, clique no ícone **SQL Editor**;
2. Clique no botão **"New query"**;
3. Abra o arquivo local [`database/schema.sql`](schema.sql), copie todo o seu conteúdo e cole no editor do Supabase;
4. Clique no botão **"Run"** (ou atalho `Ctrl + Enter` / `Cmd + Enter`);
5. Verifique a mensagem de sucesso: `Success. No rows returned`.

---

## Passo 3: Obter as Credenciais da API para a Aplicação

1. No menu lateral esquerdo do Supabase, clique no ícone **Project Settings** (engrenagem);
2. Navegue até a aba **API**;
3. Em **Project API keys**, copie:
   * **Project URL:** `https://xxxxxxxxxxxxxxxxxxxx.supabase.co`
   * **Project API key (`anon` / `public`):** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. **IMPORTANTE:** Nunca compartilhe nem comite a chave `service_role` (esta possui permissão de superusuário e ignora RLS).

---

## Passo 4: Como Cadastrar Padrinhos e Madrinhas com Segurança (Sem Expor Dados no Git)

Para cadastrar os veteranos sem versionar dados pessoais no repositório público:
1. No console do Supabase, acesse **Table Editor** > tabela `padrinhos`;
2. Clique em **"Insert row"**;
3. Preencha os campos:
   * `nome`: Nome completo do mentor (ex.: `Heloísa Pereira Barreto`)
   * `iniciais`: 2 caracteres (ex.: `HB`)
   * `email_institucional`: E-mail institucional do mentor (usado para o login)
   * `instagram`: `@usuario` (opcional)
   * `periodo`: `2º Semestre` (ou período atual)
   * `estilo_mentoria`: Resumo do estilo (ex.: `Acolhimento e rotina acadêmica`)
   * `bio`: Pequena apresentação
   * `sticker_url`: Caminho da imagem local (ex.: `assets/img/padrinhos/hb.webp`)
   * `hobbies`: Array de texto (ex.: `{"Leitura", "Gestão", "Café"}`)
   * `materias_favoritas`: Array de texto
   * `limite_vagas`: **4** para a madrinha especial; **5** para os demais veteranos;
   * `ordem_exibicao`: Ordem numérica de exibição no catálogo.
4. Salve o registro.

---

## Passo 5: Criar o Usuário Administrador da Coordenação

1. Acesse **Authentication** > **Users** no Supabase e clique em **"Add User"** > **"Create User"**;
2. Cadastre o e-mail de administração e uma senha segura;
3. Copie o `User UID` gerado;
4. No **SQL Editor**, execute o comando abaixo substituindo com o UUID e e-mail:
```sql
INSERT INTO public.user_roles (user_id, email, role)
VALUES ('SEU_UUID_AQUI', 'seu.email@ufape.edu.br', 'admin');
```
Pronto! Este usuário terá privilégios plenos de acesso ao painel `/admin/` e exportação.
