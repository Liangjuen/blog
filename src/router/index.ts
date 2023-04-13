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
          path: '/article/:id',
          name: 'Article',
          component: () => import('../views/Article/index.vue')
        },
        {
          path: '/articleList',
          name: 'ArticleList',
          component: () => import('../views/ArticleList/index.vue')
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
  ]
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
