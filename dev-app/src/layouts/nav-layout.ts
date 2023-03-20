import { html, HTMLString } from '../html/html.js'
import { router } from '../router.js'

export function navLayout(children: HTMLString) {

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
          <li> 
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/counter">Counter</a>
          </li>
          <li>
            <a href="/to-do">To Do List</a>
          </li>
          <li>
            <a href="/not">Not found</a>
          </li>
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
