import axios from 'axios'
/**
 * Instância configurada do Axios para realizar requisições HTTP na API
 * @constant {AxiosInstance} http
 * @description Está instância é configurada com a URL base da API, facilitando a criação de requisições
 * para o back-end.
 */
export const http = axios.create({
  baseURL: 'https://trilha-front-end-vue-api.onrender.com/',
})
