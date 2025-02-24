/**
 * Preferi definir rotas manualmente porque fica mais facil de definir as
 * propriedades de cada rota. Acho melhor navegar por nome.
 */

import DefaultLayout from '@/layouts/default.vue'
import AppLayout from '@/layouts/app.vue'
import Index from '@/pages/index.vue'
import Candidatos from '@/pages/candidatos.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
          {
            name: 'home',
            path: '',
            component: Index
          }
        ]
    },
    {
        path: '/',
        name: 'app',
        component: AppLayout,
        children: [
          {
            name: 'candidatos',
            path: 'candidatos',
            component: Candidatos
          }
        ]
    }
]

export default routes