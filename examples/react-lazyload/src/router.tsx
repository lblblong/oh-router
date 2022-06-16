import Router, { createHashHistory } from 'oh-router'
import React from 'react'

const HomePage = React.lazy(() => import('./pages/home'))
const AboutPage = React.lazy(() => import('./pages/about'))

export const router = new Router({
  history: createHashHistory(),
  middlewares: [],
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
