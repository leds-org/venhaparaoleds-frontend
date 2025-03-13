import { createRouter, createWebHistory } from 'vue-router'
import PaginaPrincipal from '../views/PaginaPrincipal.vue'

/**
 * Instância configurada do Vue Router, para gerenciar as rotas da aplicação
 * @constant {Router} router
 * @description Esta instância define as rotas da aplicação, permitindo a navegação entre as diferentes
 * views.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lv-pagina-principal',
      component: PaginaPrincipal,
    },
    {
      path: '/candidatos',
      name: 'lv-candidatos',
      component: () => import('../views/Candidatos.vue'),
    },
    {
      path: '/concursos',
      name: 'lv-concursos',
      component: () => import('../views/Concursos.vue'),
    },
  ],
})

export default router
