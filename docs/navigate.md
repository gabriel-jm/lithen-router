# Lithen Router - navigate method

The `navigate` method is used to navigate to some path and it's responsable to triggers the
[onNavigate](./on-navigate.md) event listeners. This method validates the format of the received
target path, verifying if it starts with a slash and have only the allowed chars, and throws an
`InvalidPathFormatError` if validation fails.

This method is intented to be used if you want your want to have page navigations without a page 
reload. If that is your intention you must register a listener in the [onNavigate](./on-navigate.md)
method to handle the page content change when the `navigate` method is called.

```ts
router.navigate('/path')
```
