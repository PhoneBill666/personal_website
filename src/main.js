import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'  // 导入路由配置

// 导入全局注册组件
import BackToHome from '@/components/pagesHeader.vue'
import MusicPlayer from '@/components/musicPlayer.vue'
import MusicController1 from '@/components/musicController1.vue'

const app = createApp(App)

// 全局注册组件
app.component('BackToHome', BackToHome);
app.component('MusicPlayer', MusicPlayer);
app.component('MusicController1', MusicController1);
app.use(ElementPlus)
app.use(router)  // 使用 Vue Router
app.mount('#app')


