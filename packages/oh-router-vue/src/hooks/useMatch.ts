import {
  matchPath,
  ParamParseKey,
  PathMatch,
  PathPattern,
} from 'oh-router-shared'
import { computed, ComputedRef } from 'vue'
import { useLocation } from './useLocation'

export function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string
>(pattern: PathPattern<Path> | Path): ComputedRef<PathMatch<ParamKey> | null> {
  const location = useLocation()
  return computed(() => {
    return matchPath(pattern, location.pathname)
  })
}
