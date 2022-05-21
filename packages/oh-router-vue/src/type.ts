import Router, { RouteLocation } from 'oh-router'
import { Component, ShallowReactive } from 'vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterView: typeof import('./components/RouterView')['RouterView']
    RouterLink: typeof import('./components/Link')['Link']
    RouterOutlet: typeof import('./components/Outlet')['Outlet']
  }

  export interface ComponentCustomProperties {
    $location: ShallowReactive<RouteLocation>
    $router: Router
  }
}

declare module 'oh-router-shared' {
  export interface RouteObject {
    element?: Component
  }
}

export {}
