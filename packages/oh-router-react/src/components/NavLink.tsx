import React from 'react'
import { useLocation, useResolvedPath } from '../hooks'
import { Link, LinkProps } from './Link'

export interface NavLinkProps
  extends Omit<LinkProps, 'className' | 'style' | 'children'> {
  children?:
    | React.ReactNode
    | ((props: { isActive: boolean }) => React.ReactNode)
  caseSensitive?: boolean
  className?: string | ((props: { isActive: boolean }) => string | undefined)
  end?: boolean
  style?:
    | React.CSSProperties
    | ((props: { isActive: boolean }) => React.CSSProperties)
}

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLinkWithRef(
    {
      'aria-current': ariaCurrentProp = 'page',
      caseSensitive = false,
      className: classNameProp = '',
      end = false,
      style: styleProp,
      to,
      children,
      ...rest
    },
    ref
  ) {
    let location = useLocation()
    let path = useResolvedPath(to)

    let locationPathname = location.pathname
    let toPathname = path.pathname
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase()
      toPathname = toPathname.toLowerCase()
    }

    let isActive =
      locationPathname === toPathname ||
      (!end &&
        locationPathname.startsWith(toPathname) &&
        locationPathname.charAt(toPathname.length) === '/')

    let ariaCurrent = isActive ? ariaCurrentProp : undefined

    let className: string | undefined
    if (typeof classNameProp === 'function') {
      className = classNameProp({ isActive })
    } else {
      className = [classNameProp, isActive ? 'active' : null]
        .filter(Boolean)
        .join(' ')
    }

    let style =
      typeof styleProp === 'function' ? styleProp({ isActive }) : styleProp

    return (
      <Link
        {...rest}
        aria-current={ariaCurrent}
        className={className}
        ref={ref}
        style={style}
        to={to}
      >
        {typeof children === 'function' ? children({ isActive }) : children}
      </Link>
    )
  }
)
