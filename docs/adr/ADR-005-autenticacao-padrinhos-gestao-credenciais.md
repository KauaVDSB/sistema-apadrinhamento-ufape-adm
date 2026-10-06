# ADR-005: Estratégia de Autenticação dos Padrinhos e Ciclo de Credenciais

* **Status:** Aprovado
* **Data:** 06/10/2026
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

Veteranos (padrinhos e madrinhas) necessitam de acesso a um portal restrito (`/padrinho/`) para visualizar as informações de contato e as respostas detalhadas de seus afilhados. Para manter a conformidade com a LGPD e mitigar riscos de segurança:
* Não se pode permitir que senhas fracas ou padronizadas permaneçam em uso;
* Links mágicos (*magic links*) sem senha poderiam ser bloqueados por filtros institucionais de spam ou apresentar falhas de abertura em WebViews de mensageiros;
* É necessário fornecer um meio simples e seguro para que cada padrinho receba suas credenciais e possa alterá-las para sua própria senha pessoal.

## 2. Decisão Arquitetural

Decidiu-se pela adoção do **Modelo de Pré-Cadastro Institucional com Credenciais Criptografadas e Atualização Obrigatória**:

1. **Pré-Cadastro com E-mails Institucionais:** Todos os mentores são previamente cadastrados no Supabase Auth utilizando seus e-mails institucionais da UFAPE (`@ufape.edu.br` ou correspondentes);
2. **Geração de Senhas Iniciais Aleatórias & Hashing:** Geração de chaves temporárias de alta entropia (mínimo 14 caracteres com letras, números e símbolos), armazenadas com hashing criptográfico seguro (Bcrypt / Argon2) pelo motor do Supabase Auth;
3. **Template de E-mail Institucional em HTML:** Disparo de e-mail com layout acadêmico sóbrio apresentando:
   * Instruções de acesso ao portal `/padrinho/`;
   * E-mail e senha temporária;
   * Link único de primeiro acesso e redefinição de senha;
   * **Prazo limite de ativação:** Validade do link de primeiro acesso fixada até **10/10/2026**;
4. **Interface de Redefinição no Portal:** O portal `/padrinho/` disponibiliza formulário para troca de senha a qualquer momento, persistindo a nova credencial via API `supabase.auth.updateUser({ password: novaSenha })`.

## 3. Justificativas Técnicas & Conformidade LGPD

* **Garantia de Identidade:** O uso do e-mail institucional comprova o vínculo com a universidade e a legitimidade da atuação como mentor;
* **Proteção contra Acesso Indevido:** Exige autenticação individual para acesso à listagem de calouros e previne interceptação em massa de contatos;
* **Autonomia e Controle:** Cada padrinho assume a responsabilidade pela sua própria credencial a partir do momento em que redefine a senha temporária.

## 4. Consequências

* **Positivas:** Alto nível de conformidade com segurança da informação, experiência de login previsível e sem bloqueios de firewall institucional;
* **Mitigações:** O script de envio dos e-mails será mantido em ambiente local protegido e executado pelo desenvolvedor responsável, sem exposição de credenciais no repositório.
