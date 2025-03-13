<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <nav class="navbar">
        <RouterLink to="/">Página inicial</RouterLink>
        <RouterLink to="/candidatos">Lista de Candidatos</RouterLink>
        <RouterLink to="/concursos">Lista de Concursos</RouterLink>
      </nav>
    </header>
    <routerView></routerView>
  </div>
</template>

<style scoped>
.navbar {
  text-align: center;
}

.navbar a {
  margin: 0 1rem;
  font-size: 16px;
  text-decoration: none;
  color: #888;
}
</style>
