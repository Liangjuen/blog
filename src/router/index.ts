import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/index.vue'
import Index from '../views/Index.vue'
import NotFound from '../views/404.vue'
import Article from '../views/Article/index.vue'
import ArticleList from '../views/ArticleList/index.vue'
import Categoris from '../views/Categoris/index.vue'
import Tags from '../views/Tags/index.vue'
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
          path:'/',
          name: 'Home',
          component: Home
        },
        {
          path: '/article/:id/',
          name: 'Article',
          component: Article
        },
        {
          path: '/articleList',
          name: 'ArticleList',
          component: ArticleList
        },
        {
          path: '/categoris',
          name: 'Categoris',
          component: Categoris
        },
        {
          path: '/tags',
          name: 'Tags',
          component: Tags
        }
      ]
    },
    {
      path: '/404',
      component: NotFound
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
