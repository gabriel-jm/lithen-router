import { changeHistory } from './change-history'
import { InvalidPathFormatError } from '../errors/invalid-path-format-error'
import { NoPathMatchError } from '../errors/no-path-math-error'
import { LithenRouter, RouterEvents, RoutesRecord } from './interfaces/index'

let routes: RoutesRecord = {
  notFound: ''
}

const events: RouterEvents = {
  navigate: []
}

class Router implements LithenRouter {
  defineRoutes(value: RoutesRecord) {
    routes = value
  }

  goTo(path: string) {
    const match = path.match(/^\/[a-zA-Z0-9\-\/]*/)

    if(!match) {
      throw new InvalidPathFormatError(path)
    }

    const [matchedString] = match

    if(matchedString !== path) {
      throw new InvalidPathFormatError(path)
    }

    changeHistory(path)

    events.navigate.forEach(callback => callback())
  }

  onNavigate(callback: () => void) {
    events.navigate.push(callback)
    window.addEventListener('popstate', callback)
  }

  matchRoute() {
    if(!routes) return

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
