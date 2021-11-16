import { router } from './routing/router'

export * from './routing/router'
export * from './errors/invalid-path-format-error'
export * from './errors/no-path-math-error'
export * from './routing/interfaces/index'

router.defineRoutes({
  notFound: 'not-found'
})

router.onNavigate(() => console.log(''))

router.matchRoute()
