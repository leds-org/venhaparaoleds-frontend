import Candidatos from '@/servicos/candidatos'

export default {
  /**
   * Busca a lista de candidatos disponíveis na API e atualiza o state da store.
   * @function fetchCandidatos
   * @param {object} context O objeto de contexto da action, contendo 'commit'.
   * @param {function} context.commit A função para realizar a mutation no state da store.
   * @returns {Promise<void>} Uma Promise que quando a busca e atualização do state é concluídas.
   * @throws {Error} Lança um erro se a busca na API falhar.
   */
  async fetchCandidatos({ commit }) {
    try {
      const res = await Candidatos.lista_candidatos()
      commit('SET_CANDIDATOS', res.data)
    } catch (err) {
      console.error('Erro ao buscar os candidados ' + err)
    }
  },
}
