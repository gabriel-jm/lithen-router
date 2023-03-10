import { changeHistory } from './change-history.js'
import { InvalidPathFormatError } from '../errors/invalid-path-format-error.js'
import { NoPathMatchError } from '../errors/no-path-math-error.js'
import { defineRoutesInfo, RouteInfo } from './define-routes-info.js'
import { RoutesRecord } from './interfaces/routes-record.js'
import { findRouteMatch } from './find-route-match.js'
import { RouteData } from './interfaces/route-data.js'

let routes: RoutesRecord | null = null

export interface RouterEvents {
  navigate: Set<(routeData: unknown) => void>
}

export type OnNavigateListener<T> = (data: RouteData<T>) => void | Promise<void>

/**
 * Class used to create a new Router.
 * 
 * The object value represents the the routes of your
 * application. Each key represents the path and the value
 * is your to define. This value is returned in the
 * `matchRoute` method whithin the `value` key. All
 * defined routes must start with `/`.
 * 
 * The notFound must be passed as a fallback.
 * 
 * @param value - the record defining the routes.
 * 
 * @example
 * ```ts
 * new LithenRouter<string | { tag: string }>({
 *   '/': 'app-home',
 *   '/about': { tag: 'app-about' },
 *   notFound: 'not-found'
 * })
 * ```
 */
export class LithenRouter<T> {
  #routesInfo: RouteInfo[]
  #searchParams?: URLSearchParams
  #params?: Record<string, string>
  #listeners = new Set<OnNavigateListener<T>>()

  constructor(value: RoutesRecord<T>) {
    routes = value
    this.#routesInfo = defineRoutesInfo(value)
  }

  /**
   * Getter for the current path search parameters.
   */
  get searchParams() {
    return this.#searchParams
  }

  /**
   * Getter for the current path parameters.
   */
  get params() {
    return this.#params
  }

  /**
   * Method used to change the current location of
   * the application. It triggers the `onNavigate`
   * router event.
   * 
   * @param path Path to where you want to go.
   * 
   * @throws {@link InvalidPathFormatError}
   * Thrown when the route path didn't start with `/`
   * and has some invalid characters.
   */
  navigate(path: string) {
    const match = path.match(/^\/[\w\-\/]*/)

    if(!match) {
      throw new InvalidPathFormatError(
        path,
        'Navigation path is invalid'
      )
    }

    const [matchedString] = match

    if(matchedString !== path) {
      throw new InvalidPathFormatError(
        path,
        'Navigation path is invalid'
      )
    }

    changeHistory(path)

    const routeMatchData = this.matchRoute()

    for (const listener of this.#listeners) {
      listener(routeMatchData)
    }

    return this
  }

  /**
   * Used to define a callback event when the router
   * detects a change in the browser's path.
   * 
   * This method is only useful if you are using the
   * `navigate` method to deal with navigation.
   * 
   * It register the same callback function to the
   * `window.onpopstate` event.
   * 
   * @param callback Event listener function.
   */
  onNavigate(callback: OnNavigateListener<T>) {
    this.#listeners.add(callback)
    window.addEventListener('popstate', () => {
      const routeMatchData = this.matchRoute()

      callback(routeMatchData)
    })

    return this
  }

  /**
   * This method verifies in the defined routes if
   * someone matches the current window path and return
   * the value assigned to the path in defined routes.
   * 
   * If no path matches it fallback to the `notFound`
   * element defined in routes.
   */
  matchRoute(): RouteData<T> {
    if(!routes) {
      throw new NoPathMatchError()
    }

    const { pathname } = location
    const routeMatch = findRouteMatch(pathname, this.#routesInfo)
    const searchParams = new URLSearchParams(location.search)

    this.#searchParams = searchParams

    if (!routeMatch) {
      return {
        pathname,
        searchParams,
        value: routes.notFound
      }
    }

    this.#params = routeMatch.params

    return {
      pathname,
      routePath: routeMatch.path,
      searchParams,
      params: routeMatch.params,
      value: routeMatch.value as T
    }
  }
}
