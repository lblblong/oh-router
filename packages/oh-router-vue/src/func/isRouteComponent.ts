import { Component } from 'vue';

/**
 * Allows differentiating lazy components from functional components and vue-class-component
 *
 * @param component
 */

export function isRouteComponent(component: Component): component is Component {
  return (
    typeof component === 'object' ||
    'displayName' in component ||
    'props' in component ||
    '__vccOpts' in component
  );
}
