import { RouteObject } from 'oh-router'
import { HomePage } from '../pages/home'
import { LoginPage } from '../pages/login'

export interface RouteMeta {
  mustLogin?: boolean
}

export const routes: RouteObject<RouteMeta>[] = [
  {
    path: '/',
    element: <HomePage />,
    meta: {
      mustLogin: true,
    },
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]
