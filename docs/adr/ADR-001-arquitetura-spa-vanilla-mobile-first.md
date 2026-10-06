# ADR-001: Arquitetura Frontend SPA Vanilla & Abordagem Mobile-First

* **Status:** Aprovado
* **Data:** 06/10/2026
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

O público-alvo da plataforma é composto majoritariamente por discentes ingressantes no Bacharelado em Administração da UFAPE, que acessam a aplicação diretamente de seus smartphones em redes móveis (3G/4G/Wi-Fi institucional). 

Adoções de frameworks com bundlers pesados (como React/Next.js ou Angular desnecessariamente complexos) poderiam introduzir latências de hidratação, pacotes JavaScript volumosos (acima de centenas de kilobytes) e complexidade de build pipeline incompatível com o prazo iminente de divulgação (até quarta-feira, 07-08/10/2026).

## 2. Decisão Arquitetural

Decidiu-se pela construção de uma **Single Page Application (SPA) baseada em Padrões Nativos da Web (Vanilla Web Standards)**:
1. **HTML5 Semântico:** Estrutura acessível com tags semânticas para suporte a leitores de tela e navegadores móveis;
2. **CSS3 Puro com Variáveis Customizadas:** Ausência de bibliotecas de componentes externas; estilização sob medida utilizando a paleta institucional aprovada (`#0E2A47` Azul Primário, `#1E4C7C` Azul Secundário, `#C9A227` Dourado Accent) e design rigorosamente **Mobile-First**;
3. **JavaScript Modular (ES6+):** Programação assíncrona com `fetch`, `async/await`, separação clara entre motor de quiz (`quiz-engine.js`), catálogo (`data.js`) e gerenciador de estado e persistência (`app.js`).

## 3. Justificativas Técnicas & Acadêmicas

* **Zero-Bundle Overhead:** Tempo de carregamento (*First Contentful Paint*) inferior a 200ms em conexões móveis convencionais;
* **Confiabilidade & Compatibilidade:** Ausência de incompatibilidades de versões de bibliotecas e quebras de hidratação em navegadores embarcados (como WebView do Instagram/WhatsApp);
* **Facilidade de Manutenção & Auditoria:** Código limpo e transparente, ideal para fins de comprovação de boas práticas de engenharia de software para Atividades Curriculares Complementares (ACC).

## 4. Consequências

* **Positivas:** Performance máxima, consumo ínfimo de dados dos estudantes, simplicidade no deploy estático na Vercel.
* **Mitigações:** Para evitar código espaguete, adotou-se arquitetura orientada a módulos com isolamento de responsabilidades no diretório `js/`.
