import Router, { RouteLocation } from 'oh-router'
import * as React from 'react'

export const RouterContext = React.createContext<Router>(null!)

interface RouteContextObject {
  outlet: React.ReactElement | null
  matches: any[]
}

export const RouteContext = React.createContext<RouteContextObject>({
  outlet: null,
  matches: [],
})

export const LocationContext = React.createContext<RouteLocation>(null!)
