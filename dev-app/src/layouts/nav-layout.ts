import { html } from '../html.js'

export function navLayout(children: string) {
  return html`
    <header>
      <nav>
        <ul>
          <li>
            <a id="homeLink" href="/" role="button">
              Lithen Router
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/about">About</a>
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

export function wrapNavLayout(pageRender: () => string) {
  return {
    layout: navLayout,
    render: pageRender
  }
}
