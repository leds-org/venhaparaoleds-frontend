import { createStore } from 'vuex'
import Concursos from './concursos'
import Candidatos from './candidatos'

/**
 * Configuração da store Vuex para gerenciar o state global da aplicação
 * @constant {Store} store
 * @description Está store centraliza, permitindo compartilhar dados entre os componentes.
 * ela está configurada com módulos organizar o state por funcionalidades.
 */

export default createStore({
  modules: {
    /**
     * Módulo para gerenciar o state relacionado a concursos.
     * @module Concursos
     * @description Este módulo contém o state e as mutations para lidar com dados de concursos.
     */
    Concursos,
    /**
     * Módulo para gerenciar o state relacionado a candidatos
     * @module Candidatos
     * @description Este módulo contém o state e as mutations para lidar com dados de candidatos
     */
    Candidatos,
  },
})
