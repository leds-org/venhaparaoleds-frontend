<script>
import { mapGetters } from 'vuex'
/**
 * Componente para buscar candidatos por perfil profissional.
 * @component BuscaCandidatos
 * @description Este componente permite buscar candidatos com base em um termo de busca, e exibe o
 * resultado filtrado.
 * @emits {String} estaBuscandoCandidatos Indica que o termo de busca foi alterado.
 */
export default {
  data() {
    return {
      /**
       * Termo de busca digitado pelo usuário.
       * @memberof BuscaCandidatos
       * @type {string}
       */
      termo: '',
      /**
       * Indica se a busca está em andamento.
       * @memberof BuscaCandidatos
       * @type {boolean}
       */
      buscando: false,
    }
  },
  computed: {
    /**
     * MapGetters para buscar os candidatos com base no termo de busca, passado via parâmetro.
     * @memberof BuscaCandidatos
     * @type {function}
     */
    ...mapGetters(['buscaCandidatos']),
  },
  methods: {
    /**
     * Inicia a busca por candidatos e emite os eventos.
     * @memberof BuscaCandidatos
     * @function estaBuscandoCandidatos
     */
    estaBuscandoCandidatos() {
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
    <label for="buscaCandidatos">
      Busca por perfil profissional
      <input type="text" id="buscaCandidatos" v-model="termo" @input="estaBuscandoCandidatos" />
      <p v-if="termo">Buscando por: {{ termo }}</p>
      <p v-if="termo && buscaCandidatos(termo).length === 0">
        Nenhum {{ termo }} foi encontrado...
      </p>
      <ul v-for="candidato in buscaCandidatos(termo)" :key="candidato.id">
        <li>
          Nome: {{ candidato.nome }} - Data de Nascimento: {{ candidato.data_nascimento }} - CPF:
          {{ candidato.cpf }} - Profissões: {{ candidato.profissoes }}
        </li>
      </ul>
    </label>
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
