import Router from 'oh-router'
import { AboutPage } from './pages/about'
import { HomePage } from './pages/home'

export const router = new Router({
  routes: [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
  ],
})
