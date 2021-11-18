## Lithen Router - matchRoute method

The `matchRoute` is a method used to get the correct element based on the current path. It 
follows this order:
- it will verify if has some routes defined.
  - if not will throw an `NoPathMatchError`.
- then will verify if some defined route matches the current path, and return its value.
- if not, it will verify if has a `notFound` fallback defined, and return its value.
- if not again, will throw an `NoPathMatchError`.

## Usage
```ts
router.matchRoute()
```
