import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/**
 * Ponto de entrada da aplicação Vue
 * @file main.js
 * @description Este arquivo inicializa a aplicação Vue, configurando roteador a store Vuex, e montando o
 * componente principal.
 */

/**
 * Cria uma instância da aplicação Vue.
 *
 * @constant {App} app
 */
const app = createApp(App)

/**
 * Usa a store do Vuex na aplicação.
 * @param {Store} store A instância do store Vuex.
 */
app.use(store)

/**
 * Usa o roteador na aplicação.
 * @function
 * @param {Router} router A instância do roteador Vue Router.
 */
app.use(router)

/**
 * Monta a aplicação no elemento HTML com ID 'app'.
 * @function mountApp
 */
app.mount('#app')
