import { Ref } from './ref.js'
import { resolveTemplateData } from './resolve-template-data.js'
import { Signal } from './signal.js'

export class HTMLString extends String {
  resources = new Map()

  constructor(data: string, resources?: Map<string, unknown>) {
    super(data)

    if (resources) this.resources = resources
  }
}

export function html(text: TemplateStringsArray, ...values: unknown[]) {
  let resources = new Map()
  const hash = (Math.random() * 10).toString(32).substring(7)

  const htmlText = text.reduce((acc, str, index) => {
    const value = values[index]
    const currentHTML: string = acc + str
    let strValue = String(value ?? '')

    const resolvedValue = resolveTemplateData({
      currentHTML,
      resources,
      hash,
      index,
      data: value
    })

    resources = resolvedValue.resources

    return currentHTML + (resolvedValue.resolvedString ?? strValue)
  }, '')

  const htmlString = new HTMLString(htmlText)
  htmlString.resources = resources

  return htmlString
}

export function render(htmlText: HTMLString, target?: Element) {
  const template = document.createElement('template')
  template.innerHTML = htmlText.toString()

  const documentFragment = template.content

  if (htmlText.resources.size) {
    applyResources(documentFragment, htmlText.resources)
  }

  if (target) {
    target.replaceChildren(documentFragment)
    return
  }

  return [...documentFragment.childNodes]
}

export function renderFromArray(htmlStrings: HTMLString | HTMLString[] | null | false) {
  if (!htmlStrings) return []

  const resultArray = Array.isArray(htmlStrings)
    ? htmlStrings
    : [htmlStrings]

  const elements = resultArray.map(result => {
    if (result instanceof HTMLString) {
      return [...render(result)!]
    }

    return result
  }).flat().filter(Boolean)

  return elements
}

function applyResources(docFrag: DocumentFragment, resources: Map<string, unknown>) {
  for (const [key, value] of resources) {
    if (key.startsWith('on-')) {
      applyEvents(docFrag, key, value as EventListener)
    }

    if (key.startsWith('ref=')) {
      applyRef(docFrag, key, value as Ref)
    }

    if (key.startsWith('text-sig=')) {
      applyTextSignal(docFrag, key, value as Signal<unknown>)
    }

    if (key.startsWith('sig-attr-')) {
      applyAttributeSignal(docFrag, key, value as Signal<unknown>)
    }

    if (key.startsWith('nd=')) {
      applyNode(docFrag, key, value as Node)
    }
  }

  resources.clear()
}

function applyEvents(docFrag: DocumentFragment, key: string, listener: EventListener) {
  const element = docFrag.querySelector(`[${key}]`)

  if (!element) return

  const [rawEventName] = key.split('=')
  const eventName = rawEventName.substring('on-'.length)

  element.addEventListener(eventName, listener as EventListener)
  element.removeAttribute(rawEventName)
}

function applyRef(
  docFrag: DocumentFragment,
  key: string,
  ref: Ref
) {
  const element = docFrag.querySelector(`[${key}]`)

  if (!element) return

  ref.el = element
  element.removeAttribute('ref')
}

function applyNode(docFrag: DocumentFragment, key: string, node: Node) {
  const placeholder = docFrag.querySelector(`[${key}]`)

  if (!placeholder) return

  placeholder.replaceWith(node)
}

function applyTextSignal(
  docFrag: DocumentFragment,
  key: string,
  signal: Signal<unknown>
) {
  const placeholder = docFrag.querySelector(`template[${key}]`)

  if (!placeholder) return

  const textNode = new Text(String(signal.get()))

  function updateNode(currentValue: unknown) {
    if (!textNode.isConnected) {
      return signal.remove(updateNode)
    }

    textNode.data = String(currentValue)
  }

  signal.onChange(updateNode)
  placeholder.replaceWith(textNode)
}

function applyAttributeSignal(
  docFrag: DocumentFragment,
  key: string,
  signal: Signal<unknown>
) {
  const query = key.substring('sig-attr-'.length)
  const element = docFrag.querySelector(`[${query}]`)

  if (!element) return

  const [attributeName] = query.split('=')

  function updateElementAttribute(value: unknown) {
    if (typeof value === 'boolean') {
      return value
        ? element?.setAttribute(attributeName, '')
        : element?.removeAttribute(attributeName)
    }

    element?.setAttribute(attributeName, String(value))
  }

  function updateAttribute(value: unknown) {
    if (!element?.isConnected) {
      return signal.remove(updateAttribute)
    }

    return updateElementAttribute(value)
  }

  signal.onChange(updateAttribute)
  updateElementAttribute(signal.get())
}
