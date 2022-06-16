import { inject } from 'vue'
import { RouterContext } from '../context'

export function useInRouterContext(): boolean {
  return inject(RouterContext) != null
}
