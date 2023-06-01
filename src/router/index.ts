import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('../views/Home/index.vue')
        },
        {
          path: '/page/:pageNum/',
          name: 'HomePage',
          component: () => import('../views/Home/index.vue'),
          props: ({ params }) => params
        },
        {
          path: '/article/:id',
          name: 'Article',
          component: () => import('../views/Article/index.vue')
        },
        {
          path: '/:type/:id/',
          name: 'ArticleList',
          component: () => import('../views/ArticleList/index.vue'),
          props: ({ params }) => params
        },
        {
          path: '/:type/:id/page/:pageNum',
          name: 'ArticleListPage',
          component: () => import('../views/ArticleList/index.vue'),
          props: ({ params }) => params,
        },
        {
          path: '/categoris',
          name: 'Categoris',
          component: () => import('../views/Categoris/index.vue')
        },
        {
          path: '/tags',
          name: 'Tags',
          component: () => import('../views/Tags/index.vue')
        }
      ]
    },
    {
      path: '/404',
      component: () => import('../views/404.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if ((to.name == 'HomePage' && from.name == 'Home') || (to.name == 'Home' && from.name == 'HomePage')) {
      return {
        el: '#article',
        top: 60,
        behavior: 'smooth',
      }
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    router.replace('/404')
    return next()
  } else {
    next()
  }
})

export default router
