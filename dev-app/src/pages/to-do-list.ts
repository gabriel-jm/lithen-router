import { html } from '../html/html.js'
import { signal } from '../html/signal.js'

type ToDoItem = {
  id: string
  message: string
  checked: boolean
}

export function toDoList() {
  const list = signal<ToDoItem[]>([])
  
  return html`
    <h1>To Do List</h1>
    <ul>
      ${list.get().map(item => {
        return html`
          <div>
            <span>${item.message}</span>
            <input ${item.checked && 'checked'} />
          </div>
        `
      })}
    </ul>
  `
}
