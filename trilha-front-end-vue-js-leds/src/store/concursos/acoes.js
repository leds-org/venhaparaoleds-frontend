import Concursos from '@/servicos/concursos'

export default {
  /**
   * Busca a lista de concursos disponíveis na API e atualiza o state da store.
   * @function fetchConcursos
   * @param {object} context O objeto de contexto da action, contendo 'commit'.
   * @param {function} context.commit A função para realizar a mutation no state da store.
   * @returns {Promise<void>} Uma Promise que quando a busca e atualização do state é concluídas.
   * @throws {Error} Lança um erro se a busca na API falhar.
   */
  async fetchConcursos({ commit }) {
    try {
      const res = await Concursos.lista_concursos()
      commit('SET_CONCURSOS', res.data)
    } catch (err) {
      console.error('Erro ao buscar o concurso.. ' + err)
    }
  },
}
