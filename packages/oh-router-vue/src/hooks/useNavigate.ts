import { To } from 'history'
import { invariant, joinPaths, resolveTo } from 'oh-router-shared'
import { computed, inject } from 'vue'
import { RouteContext, RouterContext } from '../context'
import { useLocation } from './useLocation'

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

export function useNavigate() {
  const router = inject(RouterContext)
  invariant(
    router,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <router-view> component.`
  )

  const route = inject(RouteContext)
  const location = useLocation()

  const routePathnamesJson = computed(() => {
    return JSON.stringify(
      route?.matches.value.map((match) => match.pathnameBase)
    )
  })

  return (to: To | number, options: NavigateOptions = {}) => {
    if (typeof to === 'number') {
      router.history.go(to)
      return
    }

    let path = resolveTo(
      to,
      JSON.parse(routePathnamesJson.value),
      location.pathname
    )

    if (router.basename !== '/') {
      path.pathname = joinPaths([router.basename, path.pathname])
    }

    ;(!!options.replace ? router.history.replace : router.history.push)(
      path,
      options.state
    )
  }
}
