import { LithenRouter } from 'lithen-router'
import { HTMLString } from './html/html.js'
import { wrapNavLayout } from './layouts/nav-layout.js'
import { about } from './pages/about.js'
import { counter } from './pages/counter.js'
import { home } from './pages/home.js'
import { notFound } from './pages/not-found.js'
import { toDoList } from './pages/to-do-list.js'

interface RouterData {
  layout?(children: HTMLString): HTMLString
  render(): HTMLString
}

const router = new LithenRouter<RouterData>({
  '/': wrapNavLayout(home),
  '/about': wrapNavLayout(about),
  '/counter': wrapNavLayout(counter),
  '/counter/:initialCount': wrapNavLayout(counter),
  '/to-do': wrapNavLayout(toDoList),
  notFound: { render: notFound }
})

export { router }
