export class NoPathMatchError extends Error {
  name = 'NoPathMatchError'
  
  constructor() {
    super('Neither path has matched and not found path was defined')
  }
}
