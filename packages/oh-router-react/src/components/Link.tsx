import { createPath, To } from 'history'
import React from 'react'
import { isModifiedEvent } from '../func/isModifiedEvent'
import { useHref, useLocation, useNavigate, useResolvedPath } from '../hooks'

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  reloadDocument?: boolean
  replace?: boolean
  state?: any
  to: To
}

/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */
export function useLinkClickHandler<E extends Element = HTMLAnchorElement>(
  to: To,
  {
    target,
    replace: replaceProp,
    state,
  }: {
    target?: React.HTMLAttributeAnchorTarget
    replace?: boolean
    state?: any
  } = {}
): (event: React.MouseEvent<E, MouseEvent>) => void {
  let navigate = useNavigate()
  let location = useLocation()
  let path = useResolvedPath(to)

  return React.useCallback(
    (event: React.MouseEvent<E, MouseEvent>) => {
      if (
        event.button === 0 &&
        (!target || target === '_self') && // Let browser handle "target=_blank" etc.
        !isModifiedEvent(event)
      ) {
        event.preventDefault()

        // If the URL hasn't changed, a regular <a> will do a replace instead of
        // a push, so do the same here.
        let replace = !!replaceProp || createPath(location) === createPath(path)

        navigate(to, { replace, state })
      }
    },
    [location, navigate, path, replaceProp, state, target, to]
  )
}

/**
 * The public API for rendering a history-aware <a>.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkWithRef(
    { onClick, reloadDocument, replace = false, state, target, to, ...rest },
    ref
  ) {
    let href = useHref(to)
    let internalOnClick = useLinkClickHandler(to, { replace, state, target })
    function handleClick(
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
      if (onClick) onClick(event)
      if (!event.defaultPrevented && !reloadDocument) {
        internalOnClick(event)
      }
    }

    return (
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        ref={ref}
        target={target}
      />
    )
  }
)
