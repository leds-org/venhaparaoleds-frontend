import estado from './estado'

export default {
  /**
   * Retorna a lista completa de concursos armazenada no state.
   * @function listaConcursos
   * @param {object} state O state do módulo.
   * @returns {Array} A lista de concursos.
   */
  listaConcursos: (state) => state.concursos,

  /**
   * Filtra a lista de concursos com base no termo de busca.
   * @param {object} state O state do módulo
   * @returns {function} Uma função que recebe um termo de busca, e retorna uma lista
   * de concursos filtrada.
   */
  buscaConcursos: (state) => (termo) => {
    let resultado = []
    if (termo !== '') {
      for (let i = 0; i < state.concursos.length; i++) {
        const concursos = state.concursos[i]
        if (
          concursos.edital.toLowerCase().includes(termo.toLowerCase()) ||
          concursos.orgao.toLowerCase().includes(termo.toLowerCase()) ||
          concursos.vagas.some((vaga) => vaga.toLowerCase().includes(termo.toLowerCase()))
        ) {
          resultado.push(concursos)
        }
      }
    }
    return resultado
  },
}
