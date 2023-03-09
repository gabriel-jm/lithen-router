import { changeHistory } from './change-history'
import { InvalidPathFormatError } from '../errors/invalid-path-format-error'
import { NoPathMatchError } from '../errors/no-path-math-error'
import { LithenRouter, RoutesRecord } from './interfaces/index'

let routes: RoutesRecord = {
  notFound: ''
}

export interface RouterEvents {
  navigate: Set<(routeData: unknown) => void>
}

const events: RouterEvents = {
  navigate: new Set()
}

class Router implements LithenRouter {
  defineRoutes(value: RoutesRecord) {
    routes = value
    return this
  }

  navigate(path: string) {
    const match = path.match(/^\/[a-zA-Z0-9\-:\/]*/)

    if(!match) {
      throw new InvalidPathFormatError(path)
    }

    const [matchedString] = match

    if(matchedString !== path) {
      throw new InvalidPathFormatError(path)
    }

    changeHistory(path)

    const routeMatchData = this.matchRoute()

    for (const listener of events.navigate) {
      listener(routeMatchData)
    }

    return this
  }

  onNavigate(callback: () => void) {
    events.navigate.add(callback)
    window.addEventListener('popstate', () => {
      const routeMatchData = this.matchRoute()

      callback(routeMatchData)
    })

    return this
  }

  matchRoute() {
    if(!routes) {
      throw new NoPathMatchError()
    }

    const { pathname } = location

    if(pathname in routes) {
      return routes[pathname]
    }

    if(routes.notFound) {
      return routes.notFound
    }

    throw new NoPathMatchError()
  }
}

const router = new Router()

export { router }
