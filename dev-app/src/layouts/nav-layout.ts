import { html, HTMLString } from '../html/html.js'
import { router } from '../router.js'

export function navLayout(children: HTMLString) {
  const routes = {
    '/about': 'About',
    '/counter': 'Counter',
    '/to-do': 'To Do List',
    '/quest': 'Quest',
    '/not': 'Not Found'
  }

  function onClickTitle(e: Event) {
    e.preventDefault()
    const anchor = e.target as HTMLAnchorElement

    router.navigate(new URL(anchor.href).pathname)
  }

  return html`
    <header>
      <nav>
        <ul>
          <li>
            <a href="/" role="button" on-click=${onClickTitle}>
              Lithen Router
            </a>
          </li>
        </ul>
        <ul>
          ${Object
            .entries(routes)
            .map(([path, title]) => html`
              <li>
                <a href="${path}">${title}</a>
              </li>
            `)
          }
        </ul>
      </nav>
    </header>
    ${children}
  `
}

export function wrapNavLayout(pageRender: () => HTMLString) {
  return {
    layout: navLayout,
    render: pageRender
  }
}
