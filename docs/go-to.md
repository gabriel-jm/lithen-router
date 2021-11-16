# Lithen Router - goTo method

The `goTo` method is used to navigate to some path and it's responsable to triggers the
[onNavigate](./on-navigate.md) event listeners. This method validates the format of the received
target path, verifying if it starts with a slash and have only the allowed chars, and throws an
`InvalidPathFormatError` if validation fails.

## Parameter
`path` - type string - the path string to the target route.

## Usage
```ts
router.goTo('/path')
```
