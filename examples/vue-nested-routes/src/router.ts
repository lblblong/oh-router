import Router from 'oh-router'
import BaseLayout from './layout/base.vue'
import AboutPage from './pages/about/index.vue'
import HomePage from './pages/home/index.vue'

export const router = new Router({
  routes: [
    {
      element: BaseLayout,
      children: [
        {
          path: '/',
          element: HomePage,
        },
        {
          path: '/about',
          element: AboutPage,
        },
      ],
    },
  ],
})
