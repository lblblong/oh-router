import { defineComponent, h, inject, provide, toRefs, VNode } from 'vue'
import { LocationContext, RouteContext, RouterContext } from '../context'
import { isRouteComponent } from '../func/isRouteComponent'
import { LazyLoad } from './LazyLoad'

export const RouterView = defineComponent({
  setup(_, { slots }) {
    const router = inject(RouterContext)!
    const location = inject(LocationContext)!

    router
      .addLocationListener((_location) => {
        location.value = _location
      })
      .start()

    const OutletProvider = defineComponent({
      props: ['outlet', 'match', 'matches'],
      setup(props) {
        const { match, outlet, matches } = toRefs(props)

        provide(RouteContext, {
          outlet,
          matches,
        })

        return () => {
          if (match.value.route.element) {
            if (isRouteComponent(match.value.route.element)) {
              return h(match.value.route.element)
            } else {
              return h(LazyLoad, {
                lazyLoad: match.value.route.element,
              })
            }
          } else {
            return outlet.value
          }
        }
      },
    })

    return () => {
      if (location.value.matched.length === 0)
        return slots.splash ? h(slots.splash) : undefined
      return location.value.matched.reduceRight((outlet, match, index) => {
        return h(OutletProvider, {
          outlet,
          match,
          matches: location.value.matched.slice(0, index + 1),
        })
      }, (null as unknown) as VNode)
    }
  },
})
