import Router, { RouteLocation } from 'oh-router'
import { Params, RouteMatch } from 'oh-router-shared'
import { InjectionKey, Ref, ShallowRef, VNode } from 'vue'

export const hasSymbol =
  typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export const PolySymbol = (name: string) =>
  hasSymbol ? Symbol(name) : '_oh_' + name

export const RouterContext = PolySymbol('router') as InjectionKey<Router>

export const RouteContext = PolySymbol('route') as InjectionKey<{
  outlet: Ref<VNode>
  matches: Ref<RouteMatch[]>
}>

export const OutletContext = PolySymbol('outlet') as InjectionKey<any>

export const LocationContext = PolySymbol('location') as InjectionKey<
  ShallowRef<RouteLocation>
>

export const ReactiveLocationContext = PolySymbol(
  'reactive_location'
) as InjectionKey<RouteLocation>

export const ParamsContext = PolySymbol('params') as InjectionKey<
  Params<string>
>
