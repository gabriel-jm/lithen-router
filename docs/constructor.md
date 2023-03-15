# Lithen Router - constructor

The `LithenRouter` class receives an object that corresponds a path and a given value, that value
is arbitrary, an is up to define how this value works for your project. The class has a type 
inference for all routes values, but can be passed a generic for a more specific type.

A `notFound` key must always be passed, it is a fallback, the value of that key will be used when
no other matches the current path.

```ts
function home() {
  return `<p>Home page</p>`
}

function notFound() {
  return `<p>Page not found</p>`
}

const router = new LithenRouter({
  '/': home,
  notFound
})
```
