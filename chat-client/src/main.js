import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const socket = io('http://localhost:3000/');

Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
