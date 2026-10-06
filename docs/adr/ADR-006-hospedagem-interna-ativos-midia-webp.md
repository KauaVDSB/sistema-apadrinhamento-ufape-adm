# ADR-006: Hospedagem Local de Memes/Stickers e Otimização WebP

* **Status:** Aprovado
* **Data:** 06/10/2026
* **Autor:** Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
* **Contexto:** Plataforma de Acolhimento e Apadrinhamento de Calouros • Administração UFAPE 2026.2

---

## 1. Contexto & Problema

Na apresentação individual dos veteranos, cada padrinho ou madrinha selecionou uma figurinha/meme que sintetiza de forma bem-humorada seu estilo e personalidade universitária. 

Embora o Supabase disponha de funcionalidade de *Object Storage* (baldes S3), a utilização de storage em nuvem externo para um conjunto reduzido de mentores (aproximadamente 10 a 15) traria desvantagens:
1. Múltiplos handshakes TLS e consultas DNS adicionais para domínios de terceiros;
2. Risco de indisponibilidade ou latência elevada em conexões móveis lentas;
3. Potencial upload de arquivos não padronizados em dimensões e formatos pesados (PNGs e JPEGs sem compressão).

## 2. Decisão Arquitetural

Decidiu-se pela **Hospedagem Interna de Mídias Estáticas Otimizadas em Formato WebP**:

1. **Armazenamento no Próprio Repositório:** Os ativos residem localmente em `assets/img/padrinhos/`, sendo servidos pela mesma infraestrutura de borda (Edge Network) da Vercel que entrega o HTML/CSS/JS da aplicação;
2. **Conversão & Padronização para WebP:**
   * Todas as mídias são convertidas para `.webp` com compressão perceptual (taxa de redução típica de 60% a 80% em relação a PNG/JPEG equivalente);
   * Resolução padronizada para limites máximos de 512x512 pixels (adequado para alta densidade em telas Retina sem desperdício de bytes);
3. **Carregamento Otimizado no Frontend:** Uso do atributo nativo `loading="lazy"` e dimensões explícitas `width` e `height` para prevenir *Cumulative Layout Shift* (CLS).

## 3. Justificativas Técnicas & Acadêmicas

* **Zero Overhead de Conexão:** Imagens distribuídas com cabeçalhos de cache agressivos diretamente pela CDN da Vercel;
* **Economia de Franquia Móvel:** O peso total somado de todas as figurinhas não ultrapassa 1.5 MB, garantindo carregamento instantâneo mesmo sob sinal móvel instável;
* **Simplicidade de Governança:** Sem necessidade de gerenciamento de permissões de buckets de storage externos.

## 4. Consequências

* **Positivas:** Renderização imediata dos cards de padrinhos sem falhas de carregamento;
* **Mitigações:** Script auxiliar automatizado para conversão em lote das imagens fornecidas pelos padrinhos antes do deploy final.
