import * as React from 'react'
import { useOutlet } from '../hooks'

export interface OutletProps {
  context?: unknown
}

/**
 * Renders the child route's element, if there is one.
 */
export function Outlet(props: OutletProps): React.ReactElement | null {
  return useOutlet(props.context)
}
