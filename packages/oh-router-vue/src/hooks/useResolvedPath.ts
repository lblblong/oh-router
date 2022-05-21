import { To } from 'history'
import { invariant, resolveTo } from 'oh-router-shared'
import { computed, inject, reactive } from 'vue'
import { RouteContext } from '../context'
import { useLocation } from './useLocation'

export function useResolvedPath(to: To) {
  const routeContext = inject(RouteContext)
  let location = useLocation()

  invariant(
    routeContext,
    `useResolvedPath()  may be used only in the context of a <router-view> component.`
  )

  const path = computed(() => {
    let routePathnamesJson = JSON.stringify(
      routeContext.matches.value.map((match) => match.pathnameBase)
    )
    return resolveTo(to, JSON.parse(routePathnamesJson), location.pathname)
  })

  return reactive(path)
}
