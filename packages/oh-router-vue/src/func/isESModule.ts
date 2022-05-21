import { Component } from 'vue';
import { hasSymbol } from '../context'


export function isESModule(obj: any): obj is { default: Component; } {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module');
}
