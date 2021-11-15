import { RouteDefiner } from './route-definer'
import { RoutesRecord } from './routes-record'

export interface LithenRouter {
  /**
   * @param value A dictionary to define which element has to be
   * rendered by path.
   * 
   * The notFound must be passed as a fallback.
   * 
   * @example
   * ```ts
   * routes: {
   *   '/': 'app-home',
   *   '/about': 'app-about',
   *   notFound: 'not-found'
   * }
   * ```
   */
  defineRoutes(value: RoutesRecord): void

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
  goTo(path: string): void

  /**
   * Used to define a callback event when the router
   * change the app's path.
   * 
   * It register the same callback function to the
   * `window.onpopstate` event.
   * 
   * @param callback Event listener function.
   */
  onNavigate(callback: () => void): void

  /**
   * This method verifies in the defined routes if
   * someone matches the current window path.
   * 
   * If no path matches it fallback to the `notFound`
   * element defined in routes.
   * 
   * @throws {@link NoPathMatchError}
   * Thrown when it has neither a path matching nor a
   * notFound.
   */
  matchRoute(): RouteDefiner | undefined
}
