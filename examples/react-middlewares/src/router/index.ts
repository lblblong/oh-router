import Router from 'oh-router'
import { LoginCheckMiddleware } from './middlewares/loginCheck'
import { routes } from './routes'

export const router = new Router({
  routes,
  middlewares: [new LoginCheckMiddleware()],
})
