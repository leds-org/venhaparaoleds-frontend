<script>
import { mapGetters } from 'vuex'
/**
 * Componente para buscar concursos por orgão, edital ou vaga.
 * @component BuscaConcursos
 * @description Este componente permite buscar concursos com base em um termo de busca, e exibir os
 * resultados filtrados.
 * @emits {string} busca-iniciada Indica que a busca por concursos foi iniciada.
 * @emits {string} busca-concluida Indica que a busca por concursos foi concluida.
 */
export default {
  data() {
    return {
      /**
       * Termo de busca digitado pelo usuário.
       * @memberof BuscaConcursos
       * @type {string}
       */
      termo: '',
      /**
       * Indica se a busca está em andamento.
       * @memberof BuscaConcursos
       * @type {boolean}
       */
      buscando: false,
    }
  },
  computed: {
    /**
     * MapGetters busca por concursos com base no termo de busca store Vuex.
     * @memberof BuscaConcursos
     * @type {function}
     */
    ...mapGetters(['buscaConcursos']),
  },
  methods: {
    /**
     * Inicia a busca por concursos e emite os eventos.
     * @memberof BuscaConcursos
     * @function estaBuscandoConcursos
     */
    estaBuscandoConcursos() {
      if (this.termo.trim() === '') {
        this.$emit('busca-concluida')
        return
      }

      this.buscando = true
      this.$emit('busca-iniciada')
    },
  },
}
</script>

<template>
  <div>
    <label for="buscaConcursos">
      Busca por vagas
      <input type="text" id="buscaConcursos" v-model="termo" @input="estaBuscandoConcursos" />
    </label>
    <p v-if="termo">Buscando por: {{ termo }}</p>
    <p v-if="termo && buscaConcursos(termo).length === 0">Nenhum resultado encontrado...</p>
    <ul v-for="item in buscaConcursos(termo)" :key="item.id">
      <li>Orgão: {{ item.orgao }} - Edital: {{ item.edital }} - Vagas: {{ item.vagas }}</li>
    </ul>
  </div>
</template>

<style scoped>
ul li {
  list-style: none;
}

label,
input {
  display: block;
  margin: 0 auto 1rem auto;
}
</style>
