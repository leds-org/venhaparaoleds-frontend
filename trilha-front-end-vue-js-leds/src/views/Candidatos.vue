<script>
import BuscaCandidatos from '@/components/BuscaCandidatos.vue'
import ListaCandidatos from '@/components/ListaCandidatos.vue'
/**
 * Este componente é para gerenciar a lista de candidatos e a busca por candidatos.
 * @component Candidatos
 * @description Este componente exibe um título, um componente de busca e componente de lista de
 * candidatos.
 * Ele controla a exibição da lista de candidatos com base no estado de espera.
 */
export default {
  name: 'lv-candidatos',
  data() {
    return {
      /**
       * Título da página de candidatos
       * @memberof Candidatos
       * @type {string}
       */
      titulo: 'Lista de Candidatos',
      /**
       * Indica se a busca de candidatos está em andamento.
       * @memberof Candidatos
       * @type {boolean}
       */
      buscando: false,
    }
  },
  components: { ListaCandidatos, BuscaCandidatos },
  methods: {
    /**
     * Oculta a lista de candidatos quando a busca é iniciada.
     * @memberof Candidatos
     * @function iniciarBusca
     */
    iniciarBusca() {
      this.$refs.lista.ocultarLista()
    },
    /**
     * Exibe a lista de candidatos novamente quando a busca é concluida.
     * @memberof Candidatos
     * @function concluirBusca
     */
    concluirBusca() {
      this.$refs.lista.exibirListaNovamente()
    },
  },
}
</script>

<template>
  <div>
    <h1>{{ titulo }}</h1>
    <BuscaCandidatos
      @busca-iniciada="iniciarBusca"
      @busca-concluida="concluirBusca"
    ></BuscaCandidatos>
    <ListaCandidatos ref="lista"></ListaCandidatos>
  </div>
</template>

<style scoped></style>
