
export class CancelError extends Error {}

export function cancel(){
  return new CancelError()
}