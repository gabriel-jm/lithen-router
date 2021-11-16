# Lithen Router - onNavigate method

The `onNavigate` method is an event register for route navigations. This event triggers when the
[goTo](./go-to.md) method is called and it also registers the same listener for the `popstate`
window event. The event listener don't receive any parameter.

## Usage
```ts
router.onNagivate(() => {
  // Do something
})
```
