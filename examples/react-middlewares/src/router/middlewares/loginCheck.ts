import { Middleware, MiddlewareContext } from 'oh-router'
import { router } from '..'
import { RouteMeta } from '../routes'

export class LoginCheckMiddleware extends Middleware<RouteMeta> {
  async handler(ctx: MiddlewareContext<any>, next: () => Promise<any>) {
    const user = localStorage.getItem('user')
    if (!user) {
      alert('Please login!')
      router.navigate('/login')
      return
    }
    next()
  }

  register({ to }: MiddlewareContext<RouteMeta>) {
    return !!to.meta.mustLogin
  }
}
