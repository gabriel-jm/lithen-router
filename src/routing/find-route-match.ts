import { RouteInfo } from './define-routes-info.js'

interface RouteMatch extends RouteInfo {
  params: Map<string, string>
}

export function findRouteMatch(requestedPath: string, routesInfo: RouteInfo[]) {
  if (!requestedPath.endsWith('/')) {
    requestedPath += '/'
  }

  const matchedRoutes = routesInfo.reduce((acc, info) => {
    const match = requestedPath.match(info.pathRegex)

    if (!match) return acc

    const params: Map<string, string> = new Map(
      Object.entries(match.groups ?? {})
    )

    const pathHasMatched = (
      match[0] === requestedPath
      && match.input === requestedPath
    )

    if (pathHasMatched) {
      return [...acc, { ...info, params }]
    }

    return acc
  }, <RouteMatch[]>[])

  if (!matchedRoutes.length) return

  const routeMatch = getCorrectPathMatch(requestedPath, matchedRoutes)

  if (!routeMatch) return

  return {
    path: routeMatch.path,
    params: routeMatch.params,
    value: routeMatch.value
  }
}

function getCorrectPathMatch(requestedPath: string, matchedRoutes: RouteMatch[]) {
  for (const routeMatch of matchedRoutes) {
    const routePieces = routeMatch.path.split('/').filter(Boolean)
    const allRoutePiecesMatched = requestedPath.split('/')
      .filter(Boolean)
      .every((piece, index) => {
        const routePiece = routePieces[index]

        if (routePiece.startsWith(':')) {
          return true
        }

        return routePiece === piece
      })

    if (allRoutePiecesMatched) {
      return routeMatch
    }
  }
}
