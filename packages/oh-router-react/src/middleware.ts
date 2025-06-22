import type {
  AnyContext,
  BeforeLoadContextOptions,
  ParsedLocation,
} from '@tanstack/react-router'

export interface MiddlewareContext<M extends {}>
  extends BeforeLoadContextOptions<any, undefined, {}, M, AnyContext> {
  to: ParsedLocation
  from?: ParsedLocation
  meta: M
}

export abstract class Middleware<M extends {}> {
  register(ctx: MiddlewareContext<M>) {
    return true
  }

  abstract handle(ctx: MiddlewareContext<M>): Promise<void>
}
