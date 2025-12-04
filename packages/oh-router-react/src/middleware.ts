// middleware.ts 推荐写法
import type {
  ParsedLocation,
} from '@tanstack/react-router'

// 不再去 extends 那个不稳定的 BeforeLoadContextOptions
export interface MiddlewareContext<M extends {}> {
  to: ParsedLocation
  from?: ParsedLocation
  meta: M
  // 允许访问 context 上的其他属性（比如 router, params 等）
  [key: string]: any 
}

export abstract class Middleware<M extends {}> {
  register(ctx: MiddlewareContext<M>) {
    return true
  }

  abstract handle(ctx: MiddlewareContext<M>): Promise<void>
}