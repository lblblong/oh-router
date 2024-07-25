import Router, { RouteLocation } from 'oh-router'
import { RouteMeta } from 'oh-router-shared'
import React, { useEffect, useState } from 'react'
import { LocationContext, RouteContext, RouterContext } from '../context'

export interface RouterViewProps<M extends RouteMeta = {}> {
  router: Router<M>
  splash?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Listen for route changes and render the corresponding components
 * and provide them with location context
 */
export function RouterView<M extends RouteMeta = {}>({
  router,
  splash,
  children,
}: RouterViewProps<M>): React.ReactElement | null {
  const [location, setLocation] = useState<RouteLocation<M>>()

  useEffect(() => {
    const listener = (_location: RouteLocation<M>) => {
      setLocation(_location)
    }

    router.addLocationListener(listener).start()
    return () => router.removeLocationListener(listener)
  }, [router])

  if (!location) return splash as any

  return (
    <RouterContext.Provider value={router}>
      <LocationContext.Provider value={location}>
        {location.matched.reduceRight((outlet, match, index) => {
          return (
            <RouteContext.Provider
              children={
                match.route.element !== undefined ? match.route.element : outlet
              }
              value={{
                outlet,
                matches: location.matched.slice(0, index + 1),
              }}
            />
          )
        }, null as React.ReactElement | null)}
        {children}
      </LocationContext.Provider>
    </RouterContext.Provider>
  )
}
