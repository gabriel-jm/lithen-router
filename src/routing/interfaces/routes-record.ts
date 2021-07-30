import { RouteDefiner } from './route-definer'

export interface RoutesRecord extends Record<string, RouteDefiner> {
  notFound: RouteDefiner
}
