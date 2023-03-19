import { html } from '../html/html.js'

export function notFound() {
  return html`
    <h1>Page Not Found</h1>
    <div>
      <p>Ops!! Wrong turn!!</p>
      <p>Go back <a href="/">Home</a></p>
    </div>
  `
}