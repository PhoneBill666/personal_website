import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'
import spotlight from './directives/spotlight'

const app = createApp(App)

app.directive('reveal', reveal)
app.directive('spotlight', spotlight)
app.use(router)
app.mount('#app')
