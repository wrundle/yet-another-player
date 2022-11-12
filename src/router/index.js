import { createRouter, createWebHashHistory } from 'vue-router'
import LocalView from '../views/LocalView.vue'

const routes = [
  {
    path: '/',
    name: 'local',
    component: LocalView
  },
  {
    path: '/ym',
    name: 'YandexMusicView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/YandexMusicView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
