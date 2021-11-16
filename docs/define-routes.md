# Lithen Router - defineRoutes method

The `defineRoutes` method is used to map which element is corresponding to which path.
The key must be the path and the value must be the element tag string or the element itself.
In this routes map you have to always define an element for the not found case, which in that
case is defined using the `notFound` key and is your fallback value when no path match is found.

## Usage
```ts
router.defineRoutes({
  '/': new AppRoot(),
  notFound: 'not-found'
})
```
