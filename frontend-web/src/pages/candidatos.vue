<template>
  <v-row>
    <v-col cols="4">
      <v-text-field
        v-model="cpf"
        v-maska.mask="'###.###.###-##'"
        label="Pesquisar candidato por CPF"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-data-table
        v-model:search="cpf"
        :filter-keys="['cpf']"
        :headers="headers"
        :items="candidatos"
        height="calc(100vh - 264px)"
      >
        <template v-slot:item.profissoes="{ item }">
          <v-chip v-for="profissao in item.profissoes">
            {{ profissao }}
          </v-chip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup>
import candidatos from "@/services/candidatos"
import { vMaska } from "maska/vue"

const cpf = ref('')

const headers = [
  { title: "Nome", value: "nome" },
  { title: "Data de Nascimento", value: "dataNascimento" },
  { title: "CPF", value: "cpf" },
  { title: "Profissões", value: "profissoes" }
]
</script>
