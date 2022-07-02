import type { RouteMatch, RouteMeta } from 'oh-router-shared'
import { compose } from 'oh-router-shared'
import { RouteLocation } from './type'

export type MiddlewareContextRoute<M extends RouteMeta = {}> = {
  parent?: MiddlewareContextRoute<M>
} & RouteMatch<string, M>

export interface MiddlewareContext<M extends RouteMeta = {}> {
  to: RouteLocation<M>
  from?: RouteLocation<M>
}

export abstract class Middleware<M extends RouteMeta = {}> {
  register(ctx: MiddlewareContext<M>) {
    return true
  }

  abstract handler(
    ctx: MiddlewareContext<M>,
    next: () => Promise<any>
  ): Promise<void>
}

export abstract class RouterMiddleware<M extends RouteMeta = {}> {
  protected middlewares: Middleware<M>[] = []

  constructor(middlewares: Middleware<M>[] = []) {
    this.middlewares = middlewares || []
  }

  addMiddleware(middlewares: Middleware<M> | Middleware<M>[]) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares]
    this.middlewares.push(...middlewares)
    return this
  }

  protected async execMiddlewares(
    ctx: MiddlewareContext<M>,
    middlewares: Middleware<M>[]
  ) {
    const fn = compose(
      middlewares.map((m) => {
        return async function (ctx: MiddlewareContext<M>, next: any) {
          if (m.register(ctx)) {
            m.handler(ctx, next)
          } else {
            next()
          }
        }
      })
    )
    return fn(ctx)
  }
}
