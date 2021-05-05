import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import { Empty, Button, Tab, Tabs, Icon, Loading, Popup  } from 'vant';

const app = createApp(App)

app.use(store).use(router).use(Empty).use(Button).use(Tab).use(Tabs).use(Icon).use(Loading).use(Popup).mount('#app')
