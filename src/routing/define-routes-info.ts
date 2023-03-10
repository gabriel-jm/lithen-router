import { InvalidPathFormatError } from '../index.js'

export interface RouteInfo {
  path: string
  pathRegex: RegExp
  value: unknown
}

export function defineRoutesInfo(rawRoutes: Record<string, unknown>) {
  return Object.entries(rawRoutes).map(([rawRoute, value]) => {
    if (!rawRoute.startsWith('/')) {
      throw new InvalidPathFormatError(
        rawRoute,
        'All defined paths must start with "/"'
      )
    }

    if (!rawRoute.endsWith('/')) {
      rawRoute += '/'
    }

    const pathRegex = createPathRegex(rawRoute)

    return {
      path: rawRoute,
      pathRegex,
      value
    }
  })
}

function createPathRegex(path: string) {
  if (!path.includes) {
    return new RegExp(path)
  }

  const identifiers = Array.from(path.matchAll(/\/:([\w_\-]+)/g))
    .map(identifierMatch => identifierMatch[1])

  const pathRegexString = identifiers.reduce((acc, value) => {
    return acc.replace(`:${value}`, `(?<${value}>[\\w_\\-]+)`)
  }, path)

  return new RegExp(pathRegexString)
}
