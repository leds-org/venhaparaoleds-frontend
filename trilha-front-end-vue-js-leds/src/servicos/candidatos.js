import { http } from './configuracao'

export default {
  /**
   * Realiza uma requisição HTTP GET na API para obter a lista de candidatos
   * @function lista_candidatos
   * @returns {Promise<Array>} Retorna uma Promise com array de objetos,
   * contendo dados detalhados de cada candidato registrado no banco de dados
   * cada objeto contém nome, data_nascimento, cpf e profissoes
   */
  lista_candidatos() {
    return http.get('candidatos')
  },

  cadastrar_candidato({ nome, data_nascimento, cpf, profissoes }) {
    return http.post('candidatos', { nome, data_nascimento, cpf, profissoes })
  },
}
