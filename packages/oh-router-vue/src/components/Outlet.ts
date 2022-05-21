import { defineComponent } from 'vue'
import { useOutlet } from '../hooks/useOutlet'

export const Outlet = defineComponent({
  props: ['context'],
  setup(props) {
    const o = useOutlet(props.context)

    return () => {
      return o?.value
    }
  },
})
