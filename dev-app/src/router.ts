import { LithenRouter } from 'lithen-router'
import { wrapNavLayout } from './layouts/nav-layout.js'
import { about } from './pages/about.js'
import { home } from './pages/home.js'
import { notFound } from './pages/not-found.js'

interface RouterData {
  layout?(children: string): string
  render(): string
}

const router = new LithenRouter<RouterData>({
  '/': wrapNavLayout(home),
  '/about': wrapNavLayout(about),
  notFound: { render: notFound }
})

export { router }
