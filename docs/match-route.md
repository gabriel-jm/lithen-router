## Lithen Router - matchRoute method

The `matchRoute` is a method used to get the correct value based on the current path. It follows 
this order:
- it will verify if has some routes defined.
  - if not will throw an `NoPathMatchError`.
- then will verify if some defined route matches the current path, and return its value.
- if not, it will verify if has a `notFound` fallback defined, and return its value.

The value returned by the `matchRoute` isn't just the value provided on the router instantiation. The
value has some other fields, its type is `RouteData`.

```ts
{
  pathname: string, // Same value of location.pathname
  routePath?: string, // (undefined if no path match) the matched path from the defined routes
  searchParams: URLSearchParams // Instance of URLSearchParams corresponding the URL's search params
  params?: Map<string, string> // Instance of Map corresponding the URL's path params
  value: unknown // The value provided in routes definition
}
```

## Usage
```ts
// main.ts
import { router } from './router' // file where you instantiate the LithenRouter

const routeData = router.matchRoute()

document.body.innerHTML += routerData.value
```

The `document.body.innerHTML` usage is just an implementation example it probably will be different
for each project case.
