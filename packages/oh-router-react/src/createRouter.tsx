import {
  createRouter as _createRouter,
  createLazyRoute,
  createRootRouteWithContext,
  createRoute,
  Outlet,
  redirect,
  Route,
  type ParsedLocation,
  type RouterOptions,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import React from 'react';
import { CancelError } from './cancel';
import type { Middleware, MiddlewareContext } from './middleware';

export type IRoute<T = any> = {
  meta?: T
  children?: IRoute<T>[]
} & ({ path: string } | { id: string }) &
  ({ component: () => ReactNode } | { lazy: () => Promise<ILazyRoute<T>> })

export type ILazyRoute<T = any> = Omit<IRoute<T>, 'id' | 'path'> & {
  component: () => ReactNode
}

function fillChildren<T>(routes: IRoute<T>[], parentRoute: Route) {
  parentRoute.addChildren(
    routes.map((r) => {
      let newRoute = createRoute({
        ...r,
        getParentRoute: () => parentRoute,
        context: () => r.meta,
      })

      if ('lazy' in r) {
        // @ts-ignore
        newRoute = newRoute.lazy(async () => {
          const data = await r.lazy()
          return createLazyRoute(newRoute.path)(data)
        })
      }

      if (r.children && r.children.length > 0) {
        // @ts-ignore
        fillChildren(r.children, newRoute)
      }

      return newRoute
    })
  )

  return parentRoute
}

export function createRouter<T extends {} = any>(
  opts: {
    routes: IRoute<T>[]
    middlewares?: Middleware<T>[]
  } & Omit<RouterOptions<any, any>, 'routeTree' | 'context'>
) {
  const { routes, middlewares = [] } = opts

  let lastLocation: ParsedLocation

  const rootRoute = createRootRouteWithContext<T>()({
    component: () => <Outlet /> ,
    beforeLoad: async (ctx) => {
      if (ctx.location.pathname === lastLocation?.pathname) {
        return
      }

      const meta = { ...(ctx.context as T) }

       for (const route of ctx.matches) {
        Object.assign(meta, route.context as T)
      }


      const _ctx: MiddlewareContext<T> = {
        to: ctx.location,
        from: lastLocation,
        meta,
        ...ctx,
      }


      let _middlewares = middlewares.filter((m) => m.register(_ctx))


      if (_middlewares.length === 0) {
        lastLocation = ctx.location
        return
      }



      try {
        for (const middleware of _middlewares) {
          await middleware.handle(_ctx)
        }
        lastLocation = ctx.location
      } catch (err) {
        if (err instanceof CancelError) {
          if (lastLocation) {
            throw redirect({
              to: lastLocation.pathname,
              search: lastLocation.search,
            })
          }
        } else {
          throw err
        }
      }
    },
  })

  // @ts-ignore
  fillChildren(routes, rootRoute)

  return _createRouter({
    routeTree: rootRoute,
    context: {} as T,
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
    ...opts,
  })
}

