export default {
  /**
   * @function SET_CONCURSOS
   * @param {object} state O state da store.
   * @param {Array} concursos A nova lista de concursos a ser armazenada.
   * @description Está mutation substitui a lista de concursos atual, pela nova fornecida.
   */
  SET_CONCURSOS(state, concursos) {
    state.concursos = concursos
  },
}
