import { ShellComment, executingFunctions } from './shell.js'

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
  const effects = new Map<ShellComment, () => void>()

  function get() {
    const executingFn = executingFunctions.at(-1)

    if (executingFn && !effects.has(executingFn.comment)) {

      function listener() {
        const { comment, fn } = executingFn!
        
        if (!comment.isConnected) {
          effects.delete(comment)
        }

        const htmlStrings = fn()

        comment.insertAfter(htmlStrings)
      }

      effects.set(executingFn.comment, listener)
    }

    return value
  }

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

    for (const [_, listener] of effects) {
      listener()
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

export function signalList<T>(...values: Array<T>) {
  const listSignal = signal(values.map(value => signal(value)))
  
  for (const signal of listSignal.get()) {
    signal.onChange(() => {
      listSignal.set(listSignal.get())
    })
  }

  return listSignal
}
