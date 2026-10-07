/**
 * ==============================================================================
 * SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
 * Arquivo: build.js
 * Finalidade: Script de Build automatizado para Vercel / CI/CD
 * Injeta variáveis de ambiente em js/env.js durante a compilação
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || '';
const anonKey = process.env.SUPABASE_ANON_KEY || '';

const content = `// ==============================================================================
// ARQUIVO GERADO AUTOMATICAMENTE DURANTE O BUILD DA VERCEL / LOCAL
// NÃO EDITAR DIRETAMENTE - DEFINA AS VARIÁVEIS NO .ENV OU NO PAINEL DA VERCEL
// ==============================================================================
window.SUPABASE_URL = "${url}";
window.SUPABASE_ANON_KEY = "${anonKey}";
`;

const targetPath = path.join(__dirname, 'js', 'env.js');

try {
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('✓ [BUILD] js/env.js gerado com sucesso para implantação na Vercel.');
  if (url) {
    console.log(`✓ [BUILD] SUPABASE_URL configurada: ${url.replace(/(https?:\/\/)(.{4}).+(.{4}\.supabase\.co)/, '$1$2***$3')}`);
  } else {
    console.warn('⚠ [BUILD] AVISO: SUPABASE_URL não encontrada no ambiente de build.');
  }
} catch (err) {
  console.error('✗ [BUILD] Falha ao escrever js/env.js:', err);
  process.exit(1);
}
