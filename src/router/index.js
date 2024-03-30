import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUser } from '@/stores/counter'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'empty',
          redirect: '/home/page'
        },
        {
          path: '/home/page',
          name: 'page',
          component: () => import('@/views/Page.vue'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/home/sort',
          name: 'sort',
          component: () => import('@/views/Sort.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/home/person',
          name: 'person',
          component: () => import('@/views/Person.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/',
          redirect: () => import('@/views/Person.vue')
        }
      ]
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    // 搜索页
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    },
    // 讲座详情页
    {
      path: '/lecture/:lec_id',
      name: 'lecture',
      component: () => import('@/views/DetailView.vue')
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
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const userData = useUser();
  if (to.path === '/login') {
    next();
    // console.log(1);
  } else {
    if (sessionStorage.getItem('token')) {
      next();
      // console.log(2);
    } else {
      next({ path: '/login'});
      // console.log(3);
    }   
  }
})
export default router
