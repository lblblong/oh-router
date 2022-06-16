import { Action } from 'history'
import Router, { RouteLocation } from 'oh-router'
import {
  App,
  computed,
  ComputedRef,
  reactive,
  shallowRef,
  unref,
  watch
} from 'vue'
import { Link } from './components/Link'
import { Outlet } from './components/Outlet'
import { RouterView } from './components/RouterView'
import {
  LocationContext,
  ParamsContext,
  ReactiveLocationContext,
  RouterContext
} from './context'

const INITIAL_LOCATION: RouteLocation = {
  pathname: '',
  search: '',
  hash: '',
  state: undefined,
  key: 'default',
  matched: [],
  params: {},
  meta: {},
  action: Action.Pop,
}

export function installForVue(router: Router) {
  return {
    install: (app: App) => {
      app.component('RouterView', RouterView)
      app.component('RouterOutlet', Outlet)
      app.component('RouterLink', Link)
      const location = shallowRef<RouteLocation>(INITIAL_LOCATION)
      app.provide(LocationContext, location)
      Object.defineProperty(app.config.globalProperties, '$location', {
        enumerable: true,
        get: () => unref(location),
      })
      app.config.globalProperties.$router = router
      app.provide(RouterContext, router)

      // provide location
      const reactiveLocation = {} as {
        [k in keyof RouteLocation]: ComputedRef<RouteLocation[k]>
      }
      for (const key in location.value) {
        // @ts-expect-error: the key matches
        reactiveLocation[key] = computed(() => location.value[key])
      }
      app.provide(ReactiveLocationContext, reactive(reactiveLocation))

      // provide params
      const params = reactive({})
      watch(location, (_location) => {
        Object.assign(params, _location.params)
      })
      app.provide(ParamsContext, params)
    },
  }
}
