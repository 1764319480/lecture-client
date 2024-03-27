import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children :[
        {
          path: '',
          name: 'empty',
          redirect: '/home/page'
        },
        {
          path: '/home/page',
          name: 'page',
          component: () => import('@/views/Page.vue')
        },
        {
          path: '/home/sort',
          name: 'sort',
          component: () => import('@/views/Sort.vue')
        },
        {
          path: '/home/person',
          name: 'person',
          component: () => import('@/views/Person.vue')
        },
        {
          path: '/',
          redirect: () => import('@/views/Person.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    // 管理员页面
    {
      path: '/super',
      name: '/super',
      component: () => import('@/views/SuperviseView.vue')
    },
    // 404页面
    {
      path: '/:pathMatch(.*)',
      name: 'err',
      component: () => import('@/views/ErrorView.vue')
    }
  ]
})

export default router
