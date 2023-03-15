# Lithen Router - onNavigate method

The `onNavigate` method used to register listener for route navigations events. This event triggers when the [navigate](./navigate.md) method is called.
The listener registred also is passed to the `popstate` window event.

When the listener is called the current path match data is passed in the first parameter. Its value
is the same to the returned from [matchRoute](./match-route.md) method.

As said before, the `onNavigate`'s listeners are only called when using the `navigate` method, and this
method is intented to be used if your application does not relaod on page transitions.

```ts
router.onNagivate(routeData => {
  // Do something
})
```
