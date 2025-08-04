import { createRouter, createWebHistory } from 'vue-router'

// 导入组件
import welcomepage from '../views/welcomepage.vue'
import homepage from '../views/homepage.vue'
import aboutMe from "../views/aboutMe.vue";
import skills from "../views/skills.vue";
import test from "../views/test.vue";
import experience from "../views/experience.vue";
import education from "../views/education.vue";
import contact from "../views/contact.vue";
import other from "../views/other.vue";
import test2 from "../views/test2.vue";
import music from "../views/music.vue";


// 配置路由
const routes = [
    {
        path: '/',
        name: 'welcomepage',
        component: welcomepage
    },
    {
        path: '/homepage',
        name: 'homepage',
        component: homepage
    },
    {
        path: '/aboutme',
        name: 'aboutme',
        component: aboutMe
    },
    {
        path: '/experience',
        name: 'experience',
        component: experience
    },
    {
        path: '/education',
        name: 'education',
        component: education
    },
    {
        path: '/skills',
        name: 'skills',
        component: skills
    },
    {
        path: '/contact',
        name: 'contact',
        component: contact
    },
    {
        path: '/other',
        name: 'other',
        component: other
    },
    {
        path: '/test',
        name: 'test',
        component: test
    },
    {
        path: '/test2',
        name: 'test2',
        component: test2
    },
    {
        path: '/music',
        name: 'music',
        component: music
    },

]

// 创建路由实例并导出
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 History 模式
    routes
})

export default router
