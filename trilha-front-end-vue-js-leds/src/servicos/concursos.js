import { http } from './configuracao'

export default {
  /**
   * Realiza uma requisição HTTP GET na API para obter uma lista de concursos
   * @function lista_concursos
   * @returns {Promise<Array>} Retorna uma promise com array de objetos,
   * contendo dados detalhados de cada concurso registrado no banco de dados
   * cada objeto retornado contém orgao, edital, cod_concurso e vagas
   */
  lista_concursos() {
    return http.get('concursos')
  },

  cadastrar_concursos({ orgao, edital, cod_concurso, vagas }) {
    return http.post('concursos', { orgao, edital, cod_concurso, vagas })
  },
}
