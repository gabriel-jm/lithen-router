import { HTMLString } from './html.js'

type ResolverValue = {
  currentHTML: string
  resources: Map<string, unknown>
  hash: string
  index: number
  data: unknown
}

type Resolver = (value: ResolverValue) => string | undefined

export function resolveTemplateData(value: ResolverValue) {
  const resolvedString = pipe(value,
    resolveHTMLString,
    resolveEventListener,
    resolveRef
  )

  return {
    ...value,
    resolvedString
  }
}

function pipe(value: ResolverValue, ...resolvers: Resolver[]) {
  for (const resolver of resolvers) {
    const str = resolver(value)

    if (str !== undefined) {
      return str
    }
  }
}

function resolveEventListener(value: ResolverValue) {
  const { data, currentHTML, hash, index, resources } = value

  if (typeof data === 'function') {
    const eventMatch = currentHTML.match(/.*\son-([\w\-]+)=$/)

    if (eventMatch) {
      const eventName = eventMatch[1]
      const eventId = `"${hash}-${index}"`
      resources.set(`on-${eventName}=${eventId}`, data)
      return eventId
    }
  }
}

function resolveHTMLString(value: ResolverValue) {
  if (value.data instanceof HTMLString) {
    value.resources = new Map([
      ...value.resources,
      ...value.data.resources
    ])

    return value.data.toString()
  }
}

function resolveRef(value: ResolverValue) {
  const { currentHTML, hash, index, data, resources } = value

  if (typeof data === 'object' && 'el' in data) {
    const match = currentHTML.match(/.*\sref=$/)

    if (!match) return

    const refId = `"${hash}-${index}"`
    resources.set(`ref=${refId}`, data)
    return refId
  }
}
