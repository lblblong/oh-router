import { createPath, To } from 'history'
import { isModifiedEvent } from 'oh-router-shared'
import { computed, defineComponent, h, PropType } from 'vue'
import { useHref, useLocation, useNavigate, useResolvedPath } from '../hooks'

export function useLinkClickHandler(
  to: To,
  {
    target,
    replace: replaceProp,
    state,
  }: {
    target?: string
    replace?: boolean
    state?: any
  } = {}
) {
  let navigate = useNavigate()
  let location = useLocation()
  let path = useResolvedPath(to)

  return computed(() => {
    const pathValue = path.value

    return (event: MouseEvent) => {
      if (
        event.button === 0 &&
        (!target || target === '_self') && // Let browser handle "target=_blank" etc.
        !isModifiedEvent(event)
      ) {
        event.preventDefault()

        // If the URL hasn't changed, a regular <a> will do a replace instead of
        // a push, so do the same here.
        let replace =
          !!replaceProp || createPath(location) === createPath(pathValue)

        navigate(to, { replace, state })
      }
    }
  })
}

export const Link = defineComponent({
  props: {
    to: {
      type: [String, Object] as PropType<To>,
      required: true,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    reloadDocument: Boolean,
    target: String,
  },
  setup(props, { slots }) {
    const href = useHref(props.to)
    const internalOnClick = useLinkClickHandler(props.to, {
      replace: props.replace,
      target: props.target,
    })

    function handleClick(event: MouseEvent) {
      if (!event.defaultPrevented && !props.reloadDocument) {
        internalOnClick.value(event)
      }
    }

    return () => {
      return h(
        'a',
        {
          href: href.value,
          onClick: handleClick,
        },
        h(slots.default!)
      )
    }
  },
})
