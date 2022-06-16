import type { Path, To } from 'history'
import { Action as NavigationType } from 'history'
import * as React from 'react'

import { RouteLocation } from 'oh-router'
import type {
  ParamParseKey,
  Params,
  PathMatch,
  PathPattern
} from 'oh-router-shared'
import {
  getToPathname,
  invariant,
  joinPaths,
  matchPath,
  resolveTo,
  warning
} from 'oh-router-shared'
import { LocationContext, RouteContext, RouterContext } from './context'

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 */
export function useHref(to: To): string {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <RouterView> component.`
  )

  let { basename, history } = React.useContext(RouterContext)
  let { hash, pathname, search } = useResolvedPath(to)

  let joinedPathname = pathname
  if (basename !== '/') {
    let toPathname = getToPathname(to)
    let endsWithSlash = toPathname != null && toPathname.endsWith('/')
    joinedPathname =
      pathname === '/'
        ? basename + (endsWithSlash ? '/' : '')
        : joinPaths([basename, pathname])
  }

  return history.createHref({ pathname: joinedPathname, search, hash })
}

/**
 * Returns true if this component is a descendant of a <RouterView>.
 *
 */
export function useInRouterContext(): boolean {
  return React.useContext(RouterContext) != null
}

/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 */
export function useLocation(): RouteLocation {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <RouterView> component.`
  )

  return React.useContext(LocationContext)
}

/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 */
export function useNavigationType(): NavigationType {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigationType() may be used only in the context of a <RouterView> component.`
  )

  return React.useContext(LocationContext).action
}

/**
 * Returns true if the URL for the given "to" value matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 */
export function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(pattern: PathPattern<Path> | Path): PathMatch<ParamKey> | null {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useMatch() may be used only in the context of a <RouterView> component.`
  )

  let { pathname } = useLocation()
  return React.useMemo(() => matchPath<ParamKey, Path>(pattern, pathname), [
    pathname,
    pattern,
  ])
}

/**
 * The interface for the navigate() function returned from useNavigate().
 */
export interface NavigateFunction {
  (to: To, options?: NavigateOptions): void
  (delta: number): void
}

export interface NavigateOptions {
  replace?: boolean
  state?: any
}

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 */
export function useNavigate(): NavigateFunction {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <RouterView> component.`
  )

  let { basename, history } = React.useContext(RouterContext)
  let { matches } = React.useContext(RouteContext)
  let { pathname: locationPathname } = useLocation()

  let routePathnamesJson = JSON.stringify(
    matches.map((match) => match.pathnameBase)
  )

  let activeRef = React.useRef(false)
  React.useEffect(() => {
    activeRef.current = true
  })

  let navigate: NavigateFunction = React.useCallback(
    (to: To | number, options: NavigateOptions = {}) => {
      warning(
        activeRef.current,
        `You should call navigate() in a React.useEffect(), not when ` +
          `your component is first rendered.`
      )

      if (!activeRef.current) return

      if (typeof to === 'number') {
        history.go(to)
        return
      }

      let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname)

      if (basename !== '/') {
        path.pathname = joinPaths([basename, path.pathname])
      }

      ;(!!options.replace ? history.replace : history.push)(path, options.state)
    },
    [basename, navigator, routePathnamesJson, locationPathname]
  )

  return navigate
}

const OutletContext = React.createContext<unknown>(null)

/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 */
export function useOutletContext<Context = unknown>(): Context {
  return React.useContext(OutletContext) as Context
}

/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 */
export function useOutlet(context?: unknown): React.ReactElement | null {
  let outlet = React.useContext(RouteContext).outlet
  if (outlet) {
    return (
      <OutletContext.Provider value={context}>{outlet}</OutletContext.Provider>
    )
  }
  return outlet
}

/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 */
export function useParams<
  ParamsOrKey extends string | Record<string, string | undefined> = string
>(): Readonly<
  [ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>
> {
  const location = useLocation()
  return location.params as any
}

/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 */
export function useResolvedPath(to: To): Path {
  let { matches } = React.useContext(RouteContext)
  let { pathname: locationPathname } = useLocation()

  let routePathnamesJson = JSON.stringify(
    matches.map((match) => match.pathnameBase)
  )

  return React.useMemo(
    () => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname),
    [to, routePathnamesJson, locationPathname]
  )
}
