/**
 * A record which is provided to the `LithenRouter`
 * in its instantiation. It follows a the ideia of
 * `key` equal to route and `value` can be whatever
 * you want based on your rendering strategy.
 * 
 * It requires the definition of a `notFound` fallback
 * besides the application routes.
 */
export interface RoutesRecord<T = any> extends Record<string, T> {
  /**
   * Fallback key used when none of the defined routes
   * match the current.
   */
  notFound: T
}
