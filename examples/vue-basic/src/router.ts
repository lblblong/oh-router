import Router from 'oh-router'
import AboutPage from './pages/about/index.vue'
import HomePage from './pages/home/index.vue'

export const router = new Router({
  routes: [
    {
      path: '/',
      element: HomePage,
    },
    {
      path: '/about',
      element: AboutPage,
    },
  ],
})
