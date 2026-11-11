import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../views/homepage.vue'

// The site is a single page; old multi-page URLs redirect to the matching section.
const toSection = (hash) => ({ path: '/', hash })

const routes = [
  { path: '/', name: 'home', component: homepage },
  { path: '/homepage', redirect: '/' },
  { path: '/aboutme', redirect: toSection('#about') },
  { path: '/experience', redirect: toSection('#experience') },
  { path: '/education', redirect: toSection('#education') },
  { path: '/skills', redirect: toSection('#skills') },
  { path: '/contact', redirect: toSection('#contact') },
  { path: '/other', redirect: '/' },
  { path: '/music', name: 'music', component: () => import('../views/music.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 84, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
