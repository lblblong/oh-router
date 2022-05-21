import { inject } from 'vue'
import { OutletContext } from '../context'

export function useOutletContext<Context = unknown>(): Context {
  return inject(OutletContext) as Context
}
