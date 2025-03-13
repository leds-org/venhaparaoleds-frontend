<script>
import { mapActions, mapGetters } from 'vuex'
/**
 * Componente para exibi a lista de candidatos
 * @component ListaCandidatos
 * @description Este componente busca e exibe a lista de candidatos armazenada na store do Vuex
 */
export default {
  data() {
    return {
      /**
       * Controla a exibição da lista de candidatos.
       * @memberof ListaCandidatos
       * @type {boolean}
       */
      exibirLista: true,
    }
  },
  computed: {
    /**
     * MapGetters para obter a lista de candidatos da store Vuex.
     * @memberof ListaCandidatos
     * @type {Array}
     */
    ...mapGetters(['listaCandidatos']),
  },
  mounted() {
    /**
     * Executa a função que exibe a lista de candidatos ao montar o componente.
     * @memberof ListaCandidatos
     * @function fetchCandidatos
     */
    this.fetchCandidatos()
  },
  methods: {
    /**
     * MapActions busca a lista de candidatos da API, e atualizar na store Vuex.
     * @memberof ListaCandidatos
     * @function fetchCandidatos
     */
    ...mapActions(['fetchCandidatos']),
    /**
     * Oculta a lista de candidatos
     * @memberof ListaCandidatos
     * @function ocultarLista
     */
    ocultarLista() {
      this.exibirLista = false
    },
    /**
     * Exibe novamente a lista de candidatos
     * @memberof ListaCandidatos
     * @function exibirListaNovamente
     */
    exibirListaNovamente() {
      this.exibirLista = true
    },
  },
}
</script>

<template>
  <div v-if="exibirLista">
    <template v-if="listaCandidatos.length !== 0">
      <ul v-for="candidato in listaCandidatos" :key="candidato.id">
        <li>
          Nome: {{ candidato.nome }} - Data de Nascimento - {{ candidato.data_nascimento }}- CPF
          {{ candidato.cpf }} - Profissões {{ candidato.profissoes }}
        </li>
      </ul>
    </template>
    <p v-else>Carregando a lista....</p>
  </div>
</template>

<style scoped>
ul li {
  list-style: none;
}
</style>
