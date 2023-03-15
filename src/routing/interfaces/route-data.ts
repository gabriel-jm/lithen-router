/**
 * Data format returned by the `matchRoute` of the
 * `LithenRouter` instance.
 */
export interface RouteData<T = unknown> {
  /**
   * The current page path name, it is equivalent
   * to `location.pathname`.
   */
  pathname: string

  /**
   * The route path defined in the `LithenRouter`
   * constructor, that match the current path name,
   * is `undefined` if no path have matched.
   */
  routePath?: string

  /**
   * An instance of `URLSearchParams` based on the
   * current path.
   */
  searchParams: URLSearchParams

  /**
   * A Map containing the a key and value pair
   * for the path params.
   */
  params?: Map<string, string>
  
  /**
   * The value defined to be returned on the
   * `RouterRecord` provided to the `LithenRouter`.
   */
  value: T
}
