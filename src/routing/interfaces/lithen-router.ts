import { RoutesRecord } from './routes-record'

export interface LithenRouter {
  /**
   * Method used to define which value must return on match the
   * defined route.
   * 
   * The notFound must be passed as a fallback.
   * 
   * @param value - the record defining the routes.
   * 
   * @example
   * ```ts
   * router.defineRoutes({
   *   '/': 'app-home',
   *   '/about': 'app-about',
   *   notFound: 'not-found'
   * })
   * ```
   */
  defineRoutes<T = any>(value: RoutesRecord<T>): this

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
  navigate(path: string): void

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
  onNavigate(callback: () => void): this

  /**
   * This method verifies in the defined routes if
   * someone matches the current window path and return
   * the value assigned to the path in defined routes.
   * 
   * If no path matches it fallback to the `notFound`
   * element defined in routes.
   * 
   * @throws {@link NoPathMatchError}
   * Thrown when it has neither a path matching nor a
   * notFound.
   */
  matchRoute<T = any>(): T
}
