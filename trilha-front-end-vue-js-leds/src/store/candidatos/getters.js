import estado from './estado'

export default {
  /**
   * Retorna a lista completa de candidatos armazenada no state.
   * @function listaCandidatos
   * @param {object} state O state do módulo.
   * @returns {Array} A lista de candidatos.
   */
  listaCandidatos: (state) => state.candidatos,

  /**
   * Filtra a lista de candidatos com base no termo de busca.
   * @param {object} state O state do módulo
   * @returns {function} Uma função que recebe um termo de busca, e retorna uma lista
   * de candidatos filtrada.
   */
  buscaCandidatos: (state) => (termo) => {
    const resultado = []

    if (termo !== '') {
      for (let i = 0; i < state.candidatos.length; i++) {
        const candidatos = state.candidatos[i]
        if (
          candidatos.profissoes.some((profissoes) =>
            profissoes.toLowerCase().includes(termo.toLowerCase()),
          )
        ) {
          resultado.push(candidatos)
        }
      }
    }
    return resultado
  },
}
