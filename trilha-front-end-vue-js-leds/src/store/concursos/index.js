import estado from './estado'
import mutacoes from './mutacoes'
import acoes from './acoes'
import getters from './getters'

/**
 * Módulo Vuex para gerenciar o state e a lógica relacionada a concursos.
 * @module Concursos
 * @description Este módulo centraliza os state, as mutations, as actions, e os getters para lidar com
 * dados dos concursos.
 */

export default {
  /**
   * State do módulo
   * @type {object}
   * @see ./estado.js
   */
  state: estado,

  /**
   * Mutations do módulo
   * @type {object}
   * @see ./mutacoes.js
   */
  mutations: mutacoes,

  /**
   * Actions do módulo
   * @type {object}
   * @see ./acoes.js
   */
  actions: acoes,

  /**
   * Getters do módulo
   * @type {object}
   * @see ./getters.js
   */
  getters: getters,
}
