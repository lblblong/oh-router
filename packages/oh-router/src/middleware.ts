import type { RouteMatch, RouteMeta } from 'oh-router-shared'
import { compose } from 'oh-router-shared'
import { RouteLocation } from './type'

export type MiddlewareContextRoute<M> = {
  parent?: MiddlewareContextRoute<M>
} & RouteMatch<string, M>

export interface MiddlewareContext<M extends RouteMeta = {}> {
  to: RouteLocation<M>
  from?: RouteLocation<M>
}

export abstract class Middleware<M extends RouteMeta = {}> {
  register(_: MiddlewareContext) {
    return true
  }

  abstract handler(
    ctx: MiddlewareContext<M>,
    next: () => Promise<any>
  ): Promise<void>
}

export abstract class RouterMiddleware {
  constructor(protected middlewares: Middleware[] = []) {}

  addMiddleware(middlewares: Middleware | Middleware[]) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares]
    this.middlewares.push(...middlewares)
    return this
  }

  protected getMiddlewares(ctx: MiddlewareContext) {
    return this.middlewares.filter((md) => md.register(ctx))
  }

  protected async execMiddlewares(
    ctx: MiddlewareContext,
    middlewares: Middleware[]
  ) {
    const fn = compose(middlewares.map((md) => md.handler.bind(md)))
    return fn(ctx)
  }
}
