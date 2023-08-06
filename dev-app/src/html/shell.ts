import { HTMLString, renderFromArray } from './html.js'

type ShellFunction = (data?: any) => HTMLString | HTMLString[] | null | false

export type ExecutingFunction = {
  comment: ShellComment
  fn(): HTMLString | HTMLString[] | null | false
}
export const executingFunctions: (ExecutingFunction)[] = []

export class ShellComment extends Comment {
  relatedElements: Element[] = []
  
  constructor() {
    super('</>')
  }

  insertAfter(htmlStrings: HTMLString | HTMLString[] | null | false) {
    for (const el of this.relatedElements) {
      el.remove()
    }

    const nodes = renderFromArray(htmlStrings)

    this.relatedElements = nodes as Element[]

    if (nodes) {
      this.after(...this.relatedElements)
    }
  }
}

export function shell(fn: ShellFunction) {
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

  const nodes = renderFromArray(htmlStrings)

  comment.relatedElements = nodes as Element[]

  return [
    comment,
    ...nodes
  ]
}
