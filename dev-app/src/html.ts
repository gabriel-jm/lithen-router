export class HTMLString extends String {
  resources = new Map()

  constructor(data: string) {
    super(data)
  }
}

export function html(text: TemplateStringsArray, ...values: unknown[]) {
  let resources = new Map()
  const hash = (Math.random() * 10).toString(32).substring(7)

  const htmlText = text.reduce((acc, str, index) => {
    const value = values[index]
    const currentHTML = acc + str
    let strValue = String(value ?? '')

    if (typeof value === 'function') {
      const eventMatch = currentHTML.match(/.*\son-([\w\-]+)=$/)

      if (eventMatch) {
        const eventName = eventMatch[1]
        const eventId = `"${hash}-${index}"`
        resources.set(`on-${eventName}=${eventId}`, value)
        strValue = eventId
      }
    }

    if (value instanceof HTMLString) {
      resources = new Map([
        ...resources,
        ...value.resources
      ])
    }

    return currentHTML + strValue
  }, '')

  const htmlString = new HTMLString(htmlText)
  htmlString.resources = resources

  return htmlString
}

export function render(htmlText: HTMLString, target: Element) {
  const template = document.createElement('template')
  template.innerHTML = htmlText.toString()

  const documentFragment = template.content

  if (htmlText.resources.size) {
    applyEvents(documentFragment, htmlText.resources)
  }

  target.replaceChildren(documentFragment)
}

function applyEvents(docFrag: DocumentFragment, resources: Map<string, Function>) {
  for (const [key, listener] of resources) {
    const element = docFrag.querySelector(`[${key}]`)

    if (!element) continue

    const [rawEventName] = key.split('=')
    const eventName = rawEventName.substring('on-'.length)

    element.addEventListener(eventName, listener as EventListener)
    element.removeAttribute(rawEventName)
  }
}
