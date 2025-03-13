import acoes from './acoes'
import estado from './estado'
import getters from './getters'
import mutacoes from './mutacoes'

/**
 * Módulo Vuex para gerenciar o estado e a lógica relacionada a candidatos.
 * @module Candidatos
 * @description Este módulo centraliza os state, as mutations, as actions, e os getters para lidar com
 * dados dos candidatos.
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
