export class InvalidPathFormatError extends Error {
  name = 'InvalidPathFormatError'

  constructor(public path: string) {
    super('Invalid Path Format Error')
  }
}
