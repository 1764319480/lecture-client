import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUser } from '@/stores/user'
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
      meta: {
        keepAlive: true
      },
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
      component: () => import('@/views/LoginView.vue'),
      meta: {
        keepAlive: false
      }
    },
    // 搜索页
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
      meta: {
        keepAlive: false
      }
    },
    // 讲座详情页
    {
      path: '/lecture',
      name: 'lecture',
      component: () => import('@/views/DetailView.vue'),
      meta: {
        keepAlive: false
      }
    },
    // 管理员页面
    {
      path: '/super',
      name: 'super',
      component: () => import('@/views/SuperviseView.vue'),
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: '',
          name: 'empty',
          redirect: '/super/welcome'
        },
        // 欢迎页
        {
          path: '/super/welcome',
          name: 'welcome',
          component: () => import('@/views/WelcomeManager.vue'),
          meta: {
            keepAlive: false
          },
        },
        // 添加讲座
        {
          path: '/super/addLecture',
          name: 'addlecture',
          component: () => import('@/views/AddLecture.vue'),
          meta: {
            keepAlive: false
          },
        },
        // 删除讲座
        {
          path: '/super/removeLecture',
          name: 'removelecture',
          component: () => import('@/views/RemoveLecture.vue'),
          meta: {
            keepAlive: false
          },
        },
        // 修改讲座
        {
          path: '/super/changeLecture',
          name: 'changelecture',
          component: () => import('@/views/ChangeLecture.vue'),
          meta: {
            keepAlive: false
          },
        },
        // 轮播图管理
        {
          path: '/super/carousel',
          name: 'carousel',
          component: () => import('@/views/Carousel.vue'),
          meta: {
            keepAlive: false
          },
        },
        // 修改密码
        {
          path: '/super/changepwd',
          name: 'changepwd',
          component: () => import('@/views/ChangePwd.vue'),
          meta: {
            keepAlive: false
          },
        },
      ]
    },
    // 404页面
    {
      path: '/:pathMatch(.*)',
      name: 'err',
      component: () => import('@/views/ErrorView.vue'),
      meta: {
        keepAlive: false
      }
    }
  ]
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
  const userData = useUser();
  // console.log(from, to);
  if (to.path === '/login') {
    next();
    // console.log(1);
  } else if (to.path.startsWith('/super')) {
    if (sessionStorage.getItem('supertoken')) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    if (sessionStorage.getItem('token')) {
      next();
      // console.log(2);
    } else {
      if (to.path === '/lecture') {
        userData.setDetailPath(to.query.lec_id);
        // console.log(to.query.lec_id);
        next({ path: '/login' });
      } else {
        next({ path: '/login' });
        // console.log(3);
      }

    }
  };

});

export default router
