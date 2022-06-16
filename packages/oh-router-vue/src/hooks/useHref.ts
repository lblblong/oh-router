import { To } from 'history'
import { getToPathname, joinPaths } from 'oh-router-shared'
import { computed, ComputedRef, inject } from 'vue'
import { RouterContext } from '../context'
import { useResolvedPath } from './useResolvedPath'

export function useHref(to: To): ComputedRef<string> {
  const { basename, history } = inject(RouterContext)!
  let path = useResolvedPath(to)

  return computed(() => {
    let { hash, pathname, search } = path.value

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
  })
}
