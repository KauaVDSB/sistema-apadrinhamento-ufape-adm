/**
 * ==============================================================================
 * SISTEMA DE APADRINHAMENTO ACADÊMICO • BACHARELADO EM ADMINISTRAÇÃO (UFAPE)
 * Arquivo: js/calouros-validator.js
 * Módulo: Validação Nominal e Contingência Temporal (ADR-004)
 * Autor: Kauã Vinicius dos Santos Barbosa (BCC / UFAPE)
 * ==============================================================================
 */

import { CALOUROS_APROVADOS_2026_2, CALOUROS_NORMALIZADOS_SET } from './calouros-data.js';

// Data limite de contingência: 12 de Outubro de 2026 às 00:00 (Horário de Brasília)
export const DATA_LIBERACAO_GERAL = new Date('2026-10-12T00:00:00-03:00').getTime();

/**
 * Normaliza um nome ortograficamente (Unicode NFD, sem diacríticos, sem pontuação, maiúsculas)
 */
export function normalizarNome(nome) {
  if (!nome || typeof nome !== 'string') return '';
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

/**
 * Valida se o calouro está apto a escolher padrinho/madrinha
 * @param {string} nomeDigitado 
 * @returns {object} { valido: boolean, motivo: string, calouro: object|null, contingenciaAtiva: boolean }
 */
export function validarElegibilidadeCalouro(nomeDigitado) {
  const agora = Date.now();
  const contingenciaAtiva = agora >= DATA_LIBERACAO_GERAL;
  const nomeNorm = normalizarNome(nomeDigitado);

  if (!nomeNorm || nomeNorm.length < 5) {
    return {
      valido: false,
      motivo: 'DIGITACAO_INCOMPLETA',
      mensagem: 'Por favor, informe seu nome completo conforme consta no edital da UFAPE.',
      calouro: null,
      contingenciaAtiva
    };
  }

  // 1. Verificação nominal na base oficial de calouros 2026.2
  const calouroEncontrado = CALOUROS_APROVADOS_2026_2.find(c => c.u === nomeNorm);

  if (calouroEncontrado) {
    return {
      valido: true,
      motivo: 'CALOURO_RECONHECIDO',
      mensagem: `Nome confirmado na ${calouroEncontrado.c} de Administração 2026.2!`,
      calouro: calouroEncontrado,
      contingenciaAtiva
    };
  }

  // 2. Se não encontrou, verifica se a contingência temporal já foi atingida (a partir de 12/10)
  if (contingenciaAtiva) {
    return {
      valido: true,
      motivo: 'CONTINGENCIA_TEMPORAL_LIBERADA',
      mensagem: 'Acesso liberado via janela geral de acolhimento universitário da UFAPE.',
      calouro: { n: nomeDigitado.trim(), u: nomeNorm, c: 'Acolhimento Geral' },
      contingenciaAtiva: true
    };
  }

  // 3. Bloqueio orientativo pré-12/10 para nomes não encontrados
  return {
    valido: false,
    motivo: 'NOME_NAO_ENCONTRADO',
    mensagem: 'Seu nome não foi localizado na lista oficial de calouros de Administração 2026.2. Verifique a grafia ou procure a comissão organizadora de ADM (liberação geral em 12/10).',
    calouro: null,
    contingenciaAtiva: false
  };
}
