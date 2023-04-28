import { HTMLString, render } from './html.js'
import { Signal } from './signal.js'

type ShellFunction = (data: any) => Node | Node[] | null

export function shell(signal: Signal<unknown>, fn: ShellFunction) {
  const comment = document.createComment('</>')

  function getElements(value: unknown) {
    const result = fn(value)

    const resultArray = Array.isArray(result)
      ? result
      : [result]

    return resultArray.map(result => {
      if (result instanceof HTMLString) {
        return [...render(result)?.childNodes ?? []]
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
