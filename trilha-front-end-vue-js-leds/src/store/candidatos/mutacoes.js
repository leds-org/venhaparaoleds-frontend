export default {
  /**
   * @function SET_CANDIDATOS
   * @param {object} state O estado da store.
   * @param {Array} candidatos A nova lista de candidatos a ser armazenada.
   * @description Está mutation substitui a lista de candidatos atual, pela nova fornecida.
   */
  SET_CANDIDATOS(state, candidatos) {
    state.candidatos = candidatos
  },
}
