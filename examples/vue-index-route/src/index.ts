import { installForVue } from 'oh-router-vue'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(installForVue(router))

app.mount('#app')
