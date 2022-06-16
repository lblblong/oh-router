import { invariant } from 'oh-router-shared'
import { computed, inject, provide } from 'vue'
import { OutletContext, RouteContext } from '../context'

export function useOutlet(context: unknown) {
  const routeContext = inject(RouteContext)
  invariant(
    routeContext,
    `useOutlet()  may be used only in the context of a <router-view> component.`
  )
  const provideContext = computed(() =>
    routeContext.outlet.value ? context : undefined
  )
  provide(OutletContext, provideContext)
  return routeContext.outlet
}
