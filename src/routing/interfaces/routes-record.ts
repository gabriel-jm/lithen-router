export interface RoutesRecord<T = any> extends Record<string, T> {
  notFound: T
}
