<script>
import BuscaConcursos from '@/components/BuscaConcursos.vue'
import ListaConcursos from '@/components/ListaConcursos.vue'

/**
 * Componente para gerenciar a lista de concursos, e a busca por concursos.
 * @component Concursos
 * @description Este componente exibe um título, um componente de busca e componente de lista de
 * concursos.
 * Ele controla a exibição com base nos eventos de busca.
 */
export default {
  name: 'lista-concursos',
  data() {
    return {
      /**
       * Título da página de concuros.
       * @memberof Concursos
       * @type {string}
       */
      titulo: 'Lista de Concursos',
      /**
       * Indica se a busca por concursos está em andamento.
       * @memberof Concursos
       * @type {boolean}
       */
      buscando: false,
    }
  },
  components: { ListaConcursos, BuscaConcursos },
  methods: {
    /**
     * Oculta a lista de concursos quando a busca é iniciada.
     * @memberof Concursos
     * @function iniciarBusca
     */
    iniciarBusca() {
      this.$refs.lista.ocultarLista()
    },
    /**
     * Exibe a lista de concursos novamente quando a busca é concluida.
     * @memberof Concursos
     * @function concluirBusca
     */
    concluirBusca() {
      this.$refs.lista.exibirListaNovamente()
    },
  },
}
</script>

<template>
  <div class="container-concursos">
    <h1>{{ titulo }}</h1>
    <BuscaConcursos
      @busca-iniciada="iniciarBusca"
      @busca-concluida="concluirBusca"
    ></BuscaConcursos>
    <ListaConcursos ref="lista"></ListaConcursos>
  </div>
</template>

<style scoped></style>
