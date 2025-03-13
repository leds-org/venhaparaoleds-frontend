<script>
import { mapActions, mapGetters } from 'vuex'

/**
 * Componente para exibir a lista de concursos.
 * @component ListaConcursos
 * @description Este componente busca e exibe a lista de concursos, que está armazenada na store Vuex
 */
export default {
  data() {
    return {
      /**
       * Controla a exibição da lista de concursos.
       * @memberof ListaConcursos
       * @type {boolean}
       */
      exibirLista: true,
    }
  },
  computed: {
    /**
     * MapGetters para obter a lista de concursos da store Vuex.
     * @memberof ListaConcursos
     * @type {Array}
     */
    ...mapGetters(['listaConcursos']),
  },
  mounted() {
    /**
     * Executa a função que busca a lista de concursos, ao montar o componente.
     * @memberof ListaConcursos
     * @function fetchConcursos
     */
    this.fetchConcursos()
  },
  methods: {
    /**
     * Busca a lista de concursos na API, e atualiza a store Vuex.
     * @memberof ListaConcursos
     * @function fetchConcursos
     */
    ...mapActions(['fetchConcursos']),
    /**
     * Oculta a lista de concursos
     * @memberof ListaConcursos
     * @function ocultarLista
     */
    ocultarLista() {
      this.exibirLista = false
    },
    /**
     * Exibe novamente a lista de concursos
     * @memberof ListaConcursos
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
    <template v-if="listaConcursos.length !== 0">
      <ul v-for="item in listaConcursos" :key="item.id">
        <li>
          Orgão: {{ item.orgao }} - Edital: {{ item.edital }} - Vagas:
          {{ item.vagas }}
        </li>
      </ul>
    </template>
    <p>Carregando a lista....</p>
  </div>
</template>

<style scoped>
ul li {
  list-style: none;
}
</style>
