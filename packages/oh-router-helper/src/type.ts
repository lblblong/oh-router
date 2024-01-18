type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

type Params<P> = RequiredKeys<P> extends never ? { params?: P } : { params: P }
type Query<Q> = RequiredKeys<Q> extends never ? { query?: Q } : { query: Q }

export type Options<Q = unknown, P = unknown> = {
  replace?: boolean
} & Params<P> &
  Query<Q>

export type QueryOptions<Q = unknown> = Options<Q>

export type ParamsOptions<P = unknown> = Options<unknown, P>
