export function isNil<T>(val: T | null | undefined): val is null | undefined {
  return val === undefined || val === null
}

