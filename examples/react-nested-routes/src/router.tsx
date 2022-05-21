import Router from 'oh-router'
import { BaseLayout } from './layout/base'
import { AboutPage } from './pages/about'
import { HomePage } from './pages/home'

export const router = new Router({
  routes: [
    {
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
      ],
    },
  ],
})
