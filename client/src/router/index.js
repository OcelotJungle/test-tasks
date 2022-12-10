import authorize from '@/utils/authorize'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('@/views/edit-view.vue'),
    beforeEnter: (to, from, next) => {
      authorize().then(isAuthorized => isAuthorized ? next() : next('/'))
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
