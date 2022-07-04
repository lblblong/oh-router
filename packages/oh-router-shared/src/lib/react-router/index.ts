import React from 'react'
import { Params } from './router'

export {
  generatePath,
  getToPathname,
  invariant,
  joinPaths,
  matchPath,
  matchRoutes,
  normalizePathname,
  resolvePath,
  resolveTo,
  stripBasename,
  warning,
  warningOnce,
} from './router'
export type { ParamParseKey, Params, PathMatch, PathPattern } from './router'

export interface RouteMeta extends Record<string | number | symbol, any> {}

interface _RouteObject {
  element?: any | React.ReactNode
  [key: string]: any
}

/**
 * A route object represents a logical route, with (optionally) its child
 * routes organized in a tree-like structure.
 */
export interface RouteObject<M extends RouteMeta = {}> extends _RouteObject {
  caseSensitive?: boolean
  children?: RouteObject<M>[]
  index?: boolean
  path?: string
  name?: string
  redirect?: string
  meta?: M
}

/**
 * A RouteMatch contains info about how a route matched a URL.
 */
export interface RouteMatch<
  ParamKey extends string = string,
  M extends RouteMeta = {}
> {
  /**
   * The names and values of dynamic parameters in the URL.
   */
  params: Params<ParamKey>
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string
  /**
   * The portion of the URL pathname that was matched before child routes.
   */
  pathnameBase: string
  /**
   * The route object that was used to match.
   */
  route: RouteObject<M>
}
