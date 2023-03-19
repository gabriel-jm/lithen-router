export const signalSymbol = Symbol('Signal')

export type Signal<T> = {
  get(): T
  set(incommingValue: T | SignalUpdater<T>): void
  onChange(listener: SignalListener<T>): void
  remove(listener: SignalListener<T>): void
}
export type SignalUpdater<T> = (currentValue: T) => T
export type SignalListener<T> = (currentValue: T, oldValue: T) => void | Promise<void>

export function signal<T>(initialValue: T) {
  let value = initialValue
  const listeners = new Set<SignalListener<T>>()

  const get = () => value

  function set(incommingValue: T | (SignalUpdater<T>)) {
    const newValue = typeof incommingValue === 'function'
      ? (<SignalUpdater<T>>incommingValue)(value)
      : incommingValue

    if (newValue === value) return

    const oldValue = value
    value = newValue

    for (const listener of listeners) {
      listener(value, oldValue)
    }
  }

  function onChange(listener: SignalListener<T>) {
    listeners.add(listener)
  }

  function remove(listener: SignalListener<T>) {
    listeners.delete(listener)
  }
  
  return {
    get,
    set,
    onChange,
    remove,
    _symbol: signalSymbol
  }
}
