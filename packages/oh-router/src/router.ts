import { createBrowserHistory, History, To, Update } from 'history'
import {
  EventEmitter,
  isNil,
  joinPaths,
  matchRoutes,
  Params,
  RouteMatch,
  RouteMeta,
  RouteObject,
  stripBasename,
  warningOnce
} from 'oh-router-shared'
import { Middleware, MiddlewareContext, RouterMiddleware } from './middleware'
import { LocationListener, RouteLocation } from './type'

export interface RouterOptions<M extends RouteMeta = {}> {
  routes: RouteObject<M>[]
  basename?: string
  history?: History
  middlewares?: Middleware<M>[]
}

export class Router<M extends RouteMeta = {}> extends RouterMiddleware<M> {
  protected routes: RouteObject<M>[]
  history: History
  basename: string
  protected lastHistoryUpdate?: Update
  location?: RouteLocation<M>
  protected event = new EventEmitter()

  constructor(opts: RouterOptions<M>) {
    super(opts.middlewares)
    this.routes = opts.routes
    this.basename = opts.basename || '/'
    this.history = opts.history || createBrowserHistory()

    return this
  }

  /**
   * This will start route listening and trigger route matching immediately
   */
  start() {
    if (this.lastHistoryUpdate) return this
    this.history.listen(this.onHistoryLocationChange.bind(this))
    this.onHistoryLocationChange({
      action: this.history.action,
      location: this.history.location,
    })
    return this
  }

  protected async onHistoryLocationChange(update: Update, force = false) {
    warningOnce(
      'basename',
      !(this.basename !== '/' && update.location.pathname === '/'),
      'maybe you should navigate to ' + this.basename
    )

    if (this.lastHistoryUpdate && !force) {
      if (
        joinPaths([
          this.lastHistoryUpdate.location.pathname,
          this.lastHistoryUpdate.location.search,
        ]) === joinPaths([update.location.pathname, update.location.search])
      )
        return
    }

    this.lastHistoryUpdate = update
    let trailingPathname = stripBasename(
      update.location.pathname,
      this.basename
    )

    if (trailingPathname == null) {
      return
    }

    const matchedRoutes:
      | (RouteMatch<string, M> & { params: Params<string> })[]
      | undefined = matchRoutes(this.routes, {
      pathname: trailingPathname,
    })?.map((match) =>
      Object.assign({}, match, {
        params: Object.assign({}, match.params),
      })
    )

    if (isNil(matchedRoutes)) return

    if (matchedRoutes[matchedRoutes.length - 1].route.redirect) {
      this.navigate(matchedRoutes[matchedRoutes.length - 1].route.redirect!, {
        replace: true,
      })
      return
    }

    const location: RouteLocation<M> = {
      ...update.location,
      matched: matchedRoutes,
      meta: matchedRoutes.reduce(
        (pre, cur) => Object.assign(pre, cur.route.meta),
        {} as RouteMeta
      ),
      params: Object.assign(
        {},
        matchedRoutes[matchedRoutes.length - 1]?.params
      ),
      action: update.action,
    }

    const ctx: MiddlewareContext<M> = {
      to: location,
      from: this.location,
    }

    await this.execMiddlewares(ctx, [
      ...this.middlewares,
      {
        handler: async ({ to }) => {
          if (this.lastHistoryUpdate!.location.pathname !== to.pathname) return
          this.location = to as RouteLocation<M>
          this.event.emit('onLocationChange', to)
        },
        register: () => true,
      },
    ])
  }

  /**
   * Add location change listen
   */
  addLocationListener(listener: LocationListener<M>) {
    this.event.on('onLocationChange', listener)
    if (this.location) listener(this.location)
    return this
  }

  /**
   * Remove location change listen
   */
  removeLocationListener(listener: LocationListener<M>) {
    this.event.remove('onLocationChange', listener)
  }

  /**
   * Re -configure the routes, which will immediately trigger the routing matching
   * @param routes The new routes
   */
  setRoutes(routes: RouteObject<M>[]) {
    this.routes = routes
    if (this.lastHistoryUpdate) {
      this.onHistoryLocationChange(this.lastHistoryUpdate, true)
    }
    return this
  }

  /**
   * Gets the current routes configuration
   * @returns Configured route array
   */
  getRoutes() {
    return this.routes
  }

  /**
   * Navigate to a new location
   * @param to The new URL
   * @param opts Other options
   */
  navigate(
    to: To | number,
    opts?: {
      /** Replace current location */
      replace?: boolean
    }
  ) {
    if (typeof to === 'number') {
      this.history.go(to)
    } else {
      const _navigate = opts?.replace ? this.history.replace : this.history.push
      const path = joinPaths([this.basename, to as string])
      _navigate(path)
    }
  }

  /**
   * Return to previous location
   */
  back() {
    this.navigate(-1)
  }
}
