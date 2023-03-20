import { html, render } from '../html/html.js'
import { ref } from '../html/ref.js'
import { signal } from '../html/signal.js'

type ToDoItem = {
  id: string
  message: string
  checked: boolean
}

export function toDoList() {
  const ulRef = ref<HTMLUListElement>()

  const rawToDoList = localStorage.getItem('lithen-router@to-do-list')
  const toDoList = JSON.parse(rawToDoList ?? '[]')

  const list = signal<ToDoItem[]>(toDoList)

  function submitForm(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement

    const message = String(form.message.value)

    if (!message) return

    list.set(value => [...value, {
      id: crypto.randomUUID(),
      message,
      checked: false
    }])

    render(html`
      <div>
        <span>${message}</span>
        <input type="checkbox" checked />
      </div>
    `, ulRef.el!)
  }
  
  return html`
    <h1>To Do List</h1>
    <ul ref=${ulRef}>
      ${list.get().map(item => {
        return html`
          <div>
            <span>${item.message}</span>
            <input
              type="checkbox"
              ${item.checked && 'checked'}
            />
          </div>
        `
      })}
    </ul>
    <form on-submit=${submitForm}>
      <input name="message" placeholder="What to do..." />
      <button>Add</button>
    </form>
  `
}
