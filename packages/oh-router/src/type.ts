import { Action, Location } from 'history'
import { Params, RouteMatch, RouteMeta } from 'oh-router-shared'

export type LocationListener<M extends RouteMeta = {}> = (
  to: RouteLocation<M>
) => void

export interface RouteLocation<M extends RouteMeta = {}>
  extends Location {
  matched: RouteMatch<string, M>[]
  params: Params<string>
  meta: M
  action: Action
}
