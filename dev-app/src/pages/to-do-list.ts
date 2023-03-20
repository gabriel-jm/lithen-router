import { html } from '../html/html.js'
import { signal } from '../html/signal.js'

export function toDoList() {
  const list = signal([])
  
  return html`
    <h1>To Do List</h1>
    <ul>
      ${list.get().map(item => {
        return html`
          
        `
      })}
    </ul>
  `
}
