/**
 * ==============================================================================
 * SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
 * Arquivo: js/supabase-client.js
 * Módulo: Cliente de Conexão com Supabase (PostgREST / Auth / RPC)
 * Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
 * ==============================================================================
 */

import { PADRINHOS } from './data.js';

// Configuração de Credenciais do Supabase
// Injetadas em runtime via window.SUPABASE_URL e window.SUPABASE_ANON_KEY (ex: Vercel / index.html)
// Nenhuma credencial ou URL padrão fica exposta no repositório público.
export const SUPABASE_CONFIG = {
  url: window.SUPABASE_URL || '',
  anonKey: window.SUPABASE_ANON_KEY || ''
};

class SupabaseService {
  constructor() {
    this.client = null;
    this.initialized = false;
    this.initClient();
  }

  /**
   * Inicializa o cliente do Supabase via CDN global ou import
   */
  initClient() {
    try {
      if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
        if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
          this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
          this.initialized = true;
        }
      }
    } catch (err) {
      console.warn('[SupabaseService] Falha ao inicializar SDK do Supabase. Operando em modo híbrido:', err);
      this.initialized = false;
    }
  }

  /**
   * Verifica se o cliente está configurado com credenciais válidas
   */
  isConfigured() {
    return Boolean(this.initialized && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
  }

  /**
   * Obtém a lista de padrinhos com cotas e status atualizados
   * Consulta a view pública vw_padrinhos_publico
   */
  async getPadrinhos() {
    if (!this.isConfigured()) {
      // Fallback gracioso para a base estática do data.js
      return PADRINHOS;
    }

    try {
      const { data, error } = await this.client
        .from('vw_padrinhos_publico')
        .select('*');

      if (error) throw error;
      if (!data || data.length === 0) return PADRINHOS;

      return data;
    } catch (err) {
      console.warn('[SupabaseService] Erro ao buscar padrinhos do Supabase. Usando fallback local:', err);
      return PADRINHOS;
    }
  }

  /**
   * Executa a Stored Procedure registrar_apadrinhamento com trava pessimista
   * Previne race conditions e respeita as cotas (ADR-003)
   */
  async registrarApadrinhamento(payload) {
    if (!this.isConfigured()) {
      // Simulação em ambiente de desenvolvimento local sem banco
      console.info('[SupabaseService - Modo Simulado Local] Payload recebido:', payload);
      await new Promise(r => setTimeout(r, 600)); // Simula latência de rede
      return {
        success: true,
        code: 'APADRINHAMENTO_CONFIRMADO',
        apadrinhamento_id: 'simulado-' + Date.now(),
        padrinho_nome: payload.padrinhoNome || 'Padrinho Selecionado',
        modoSimulado: true
      };
    }

    try {
      const { data, error } = await this.client.rpc('registrar_apadrinhamento', {
        p_padrinho_id: payload.padrinhoId,
        p_calouro_nome: payload.calouroNome,
        p_calouro_whatsapp: payload.calouroWhatsapp,
        p_calouro_instagram: payload.calouroInstagram || '',
        p_canal_preferido: payload.canalPreferido,
        p_respostas: payload.respostas,
        p_ip_origem: null,
        p_user_agent: navigator.userAgent
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('[SupabaseService] Erro ao executar RPC registrar_apadrinhamento:', err);
      throw err;
    }
  }

  /**
   * Salva rascunho das respostas do calouro no localStorage (tolerância a falhas)
   */
  salvarRascunho(dados) {
    try {
      localStorage.setItem('calouro_form_draft', JSON.stringify({
        dados,
        atualizado_em: Date.now()
      }));
    } catch (e) {
      console.warn('Não foi possível salvar rascunho local:', e);
    }
  }

  /**
   * Recupera o rascunho salvo do localStorage
   */
  obterRascunho() {
    try {
      const item = localStorage.getItem('calouro_form_draft');
      if (!item) return null;
      return JSON.parse(item).dados;
    } catch (e) {
      return null;
    }
  }

  /**
   * Limpa o rascunho após confirmação com sucesso
   */
  limparRascunho() {
    try {
      localStorage.removeItem('calouro_form_draft');
    } catch (e) {}
  }
}

export const supabaseService = new SupabaseService();
