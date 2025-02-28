<template>
  <v-row>
    <v-col cols="5">
      <v-text-field
        :model-value="codigo"
        @update:model-value="updateCodigo"
        v-maska.mask="'###########'"
        label="Pesquisar candidato por código de concurso"
        prepend-inner-icon="mdi-magnify"
        :clearable="!app.loading" :disabled="app.loading"
        :loading="app.loading"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-input
        v-show="profissoesConcurso.length > 0"
        messages="Profissões do concurso"
      >
        <v-chip v-for="prof in profissoesConcurso">
          {{ prof }}
        </v-chip>
      </v-input>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="candidatos"
        height="calc(100vh - 264px)"
        :loading="app.loading"
      >
        <template v-slot:item.profissoes="{ item }">
          <v-chip v-for="profissao in item.profissoes">
            {{ profissao }}
          </v-chip>
        </template>
        <template v-slot:item.cpf="{ item }">
          <v-btn
            variant="text"
            @click="buscarConcurso(item.cpf)"
          >
            {{ item.cpf }}
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup>
import { listarCandidatos, candidatoPorCodigo } from "@/services/candidatos"
import { vMaska } from "maska/vue"
import debounce from "lodash.debounce"
import { useAppStore } from "@/stores/app"



const router = useRouter()

const buscarConcurso = (cpf) => {
  router.push({ name: "concursos", query: { cpf } })
}

const app = useAppStore()

const profissoesConcurso = ref([])

const candidatos = ref([])


const codigo = ref('')
const _updateCodigo = async (newValue) => {
  codigo.value = newValue
  if (newValue === undefined || newValue === null || newValue === '') {
    const response = await listarCandidatos()
    candidatos.value = response
    profissoesConcurso.value = []

    return
  }
  if (newValue.length === 11) {
    const response = await candidatoPorCodigo(newValue)
    candidatos.value = response.candidatos
    profissoesConcurso.value = response.profissoesConcurso
  }
}
const updateCodigo = debounce(_updateCodigo, 500)

const headers = [
  { title: "Nome", value: "nome" },
  { title: "Data de Nascimento", value: "nascimento" },
  { title: "CPF", value: "cpf" },
  { title: "Profissões", value: "profissoes" }
]

const route = useRoute()

onBeforeMount(() => {
  _updateCodigo(route.query.codigo)
})
</script>
