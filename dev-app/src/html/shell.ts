import { HTMLString, render } from './html.js'
import { Signal } from './signal.js'

type ShellFunction = (data?: any) => HTMLString | HTMLString[] | null | false

export type ExecutingFunction = {
  comment: ShellComment
  fn(): HTMLString | HTMLString[] | null | false
}
export const executingFunctions: (ExecutingFunction)[] = []

export function shell(signal: Signal<unknown>, fn: ShellFunction) {
  const comment = document.createComment('</>')

  function getElements(value: unknown) {
    const result = fn(value)

    const resultArray = Array.isArray(result)
      ? result
      : [result]

    return resultArray.map(result => {
      if (result instanceof HTMLString) {
        return [...render(result)!]
      }

      return result
    }).flat()
  }

  function setElements(value: unknown) {
    const relatedElements = Reflect.get(comment, 'relatedElements') ?? []

    for (const el of relatedElements) {
      el.remove()
    }

    const elements = getElements(value)

    Reflect.set(comment, 'relatedElements', elements)
    
    if (elements) {
      comment.after(...elements as Node[])
    }
  }

  function onSignalChange(value: unknown) {
    if (!comment.isConnected) {
      signal.remove(onSignalChange)
      return
    }

    setElements(value)
  }

  signal.onChange(onSignalChange)

  return [
    comment,
    ...getElements(signal.get())
  ]
}

export class ShellComment extends Comment {
  relatedElements: Element[] = []
  
  constructor() {
    super('</>')
  }

  insertAfter(htmlStrings?: HTMLString | HTMLString[] | null | false) {
    for (const el of this.relatedElements) {
      el.remove()
    }

    const resultArray = Array.isArray(htmlStrings)
      ? htmlStrings
      : [htmlStrings]

    const nodes = resultArray.map(result => {
      if (result instanceof HTMLString) {
        return [...render(result)!]
      }

      return result
    }).flat().filter(Boolean)

    this.relatedElements = nodes as Element[]

    if (nodes) {
      this.after(...this.relatedElements)
    }
  }
}

export function show(fn: ShellFunction) {
  const comment = new ShellComment()

  function run() {
    executingFunctions.push({
      comment,
      fn: run
    })

    try {
      return fn()
    } finally {
      executingFunctions.pop()
    }
  }

  const htmlStrings = run()

  const resultArray = Array.isArray(htmlStrings)
    ? htmlStrings
    : [htmlStrings]

  const nodes = resultArray.map(result => {
    if (result instanceof HTMLString) {
      return [...render(result)!]
    }

    return result
  }).flat().filter(Boolean)

  comment.relatedElements = nodes as Element[]

  return [
    comment,
    ...nodes
  ]
}
