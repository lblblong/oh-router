import { Params } from 'oh-router-shared'
import { inject } from 'vue'
import { ParamsContext } from '../context'

export function useParams<
  ParamsOrKey extends string | Record<string, string | undefined> = string
>(): Readonly<
  [ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>
> {
  return inject(ParamsContext)! as any
}
