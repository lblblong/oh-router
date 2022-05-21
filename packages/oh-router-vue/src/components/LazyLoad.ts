import { Component, defineComponent, h, shallowRef } from 'vue'
import { isESModule } from '../func/isESModule'

export const LazyLoad = defineComponent({
  props: ['lazyLoad'],
  setup(props) {
    const element = shallowRef<Component>()

    const componentPromise = props.lazyLoad()
    componentPromise.then((resolved: any) => {
      if (isESModule(resolved)) {
        element.value = resolved.default
      } else {
        element.value = resolved
      }
    })

    return () => {
      return element.value ? h(element.value) : null
    }
  },
})
