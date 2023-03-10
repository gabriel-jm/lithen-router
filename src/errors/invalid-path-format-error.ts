export class InvalidPathFormatError extends Error {
  name = 'InvalidPathFormatError'

  constructor(public path: string, message: string) {
    super(message)
  }
}
