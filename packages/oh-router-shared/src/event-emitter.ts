type Callback = (...args: any[]) => void

export class EventEmitter {
  private events: {
    [key: string]: Callback[]
  } = {}

  on(eventName: string, callback: Callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
    return this
  }

  emit(eventName: string, ...args: any) {
    if (!this.events[eventName]) {
      return this
    }
    const fns = this.events[eventName]
    fns.forEach((fn) => fn.apply(this, args))
    return this
  }

  remove(eventName: string, callback: Callback) {
    if (!callback) {
      this.events[eventName] = []
      return this
    }
    const index = this.events[eventName].indexOf(callback)
    this.events[eventName].splice(index, 1)
    return this
  }

  once(eventName: string, callback: Callback) {
    const only = (...args: any[]) => {
      callback.apply(this, args)
      this.remove(eventName, only)
    }
    this.on(eventName, only)
    return this
  }
}
