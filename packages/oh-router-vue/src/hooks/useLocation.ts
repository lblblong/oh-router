import { invariant } from 'oh-router-shared'
import { inject } from 'vue'
import { ReactiveLocationContext } from '../context'

export function useLocation() {
  const location = inject(ReactiveLocationContext)
  invariant(
    location,
    `useLocation()  may be used only in the context of a <router-view> component.`
  )

  return location
}
