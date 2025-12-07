import {
  createRootRouteWithContext,
  Outlet,
  redirect,
  type ParsedLocation,
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

async function getContextValue(context: any, ctx?: any) {
  if (typeof context === 'function') {
    return await context(ctx)
  } else {
    return context
  }
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
        const rootMeta = await getContextValue(rootContextDefinition, ctx)

        if (rootMeta && typeof rootMeta === 'object') {
          Object.assign(meta, rootMeta)
        }
      }

      // 4. 处理子路由的 context (通过 matchRoutes)
      for (let i = ctx.matches.length - 1; i >= 0; i--) {
        const match = ctx.matches[i]
        const context = await getContextValue(match.context, ctx)
        if (context) Object.assign(meta, context)
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
                replace: true,
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
