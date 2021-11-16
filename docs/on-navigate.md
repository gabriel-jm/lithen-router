# Lithen Router - onNavigate method

The `onNavigate` method is an event register for route navigations. This event triggers when the
`router.goTo` method is called and it also registers the same listener for the `popstate` window
event. The event listener don't receive any parameter.

## Usage
```ts
router.onNagivate(() => {
  // Do something
})
```
