import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'amfe-flexible'
import router from './router'
import store from './store'
import { Button, Icon, Empty, Loading, NavBar, Toast } from 'vant'

Vue.use(Button).use(Icon).use(Empty).use(Loading).use(NavBar).use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
