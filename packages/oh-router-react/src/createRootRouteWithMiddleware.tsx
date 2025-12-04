import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  type ParsedLocation,
  type AnyContext,
} from '@tanstack/react-router'
import React from 'react'
import { CancelError } from './cancel'
import type { Middleware, MiddlewareContext } from './middleware'

// 定义 context 可以是对象，也可以是接受 ctx 返回对象的函数
type RootRouteContextFn<TContext> = (ctx: any) => TContext | Promise<TContext>

type CreateRootRouteOptions<TContext extends {}> = {
  middlewares?: Middleware<TContext>[]
  defaultCancelPath?: string
  component?: () => React.ReactNode
  context?: TContext | RootRouteContextFn<TContext>
  [key: string]: any
}

export function createRootRouteWithMiddleware<TContext extends {}>(
  options: CreateRootRouteOptions<TContext>
) {
  // 解构参数
  const {
    middlewares = [],
    defaultCancelPath = '/',
    component = () => <Outlet />,
    // 依然将其提取出来，命名为 rootContextDefinition，避免透传给原生方法导致白屏
    context: rootContextDefinition,
    ...args
  } = options

  let lastLocation: ParsedLocation | undefined

  return createRootRouteWithContext<TContext>()({
    ...args,
    component,
    beforeLoad: async (ctx) => {
      // 1. 执行用户原本的 beforeLoad
      if (args.beforeLoad) {
        await args.beforeLoad(ctx)
      }

      if (lastLocation && ctx.location.href === lastLocation.href) return

      // --- Meta 合并逻辑开始 ---

      // 2. 获取运行时 Context (来自 createRouter({ context: ... }))
      // 这里的 ctx.context 是最初始的状态
      const meta = { ...(ctx.context as TContext) }

      // 3. 处理 Root Route 定义的 context (对象或函数)
      if (rootContextDefinition) {
        let rootMeta: AnyContext = {}
        
        if (typeof rootContextDefinition === 'function') {
          // 如果是函数，执行它，并将当前上下文 ctx 传进去
          // 支持异步 context 函数
          rootMeta = await (rootContextDefinition as RootRouteContextFn<TContext>)(ctx)
        } else {
          // 如果是静态对象
          rootMeta = rootContextDefinition
        }

        // 合并 Root Route 的 Meta
        if (rootMeta && typeof rootMeta === 'object') {
          Object.assign(meta, rootMeta)
        }
      }

      // 4. 处理子路由的 context (通过 matchRoutes)
      const router = (ctx as any).router
      if (router) {
        const matches = router.matchRoutes(ctx.location)

        matches.forEach((match: any) => {
          const routeContext = match.route?.options?.context

          // 注意：子路由的 context 如果是函数，在 Root beforeLoad 阶段通常无法正确执行
          // 因为子路由的 parseParams 等可能还没运行。
          // 所以这里我们主要支持子路由的静态对象 Context。
          if (routeContext && typeof routeContext === 'object') {
            Object.assign(meta, routeContext)
          }
        })
      }
      // --- Meta 合并逻辑结束 ---

      const _ctx: MiddlewareContext<TContext> = {
        to: ctx.location,
        from: lastLocation,
        meta,
        ...ctx,
      }

      const _middlewares = middlewares.filter((m) => m.register(_ctx))

      if (_middlewares.length > 0) {
        try {
          for (const middleware of _middlewares) {
            await middleware.handle(_ctx)
          }
          lastLocation = ctx.location
        } catch (err) {
          if (err instanceof CancelError) {
            const targetPath = lastLocation?.pathname || defaultCancelPath
            const targetSearch = lastLocation?.search || {}
            
            if (ctx.location.pathname !== targetPath) {
              throw redirect({ 
                to: targetPath, 
                search: targetSearch,
                replace: true 
              })
            }
            return
          }
          throw err
        }
      }

      lastLocation = ctx.location
    },
  })
}
