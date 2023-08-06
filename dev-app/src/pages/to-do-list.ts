import { shell } from '../html/shell.js'
import { html } from '../html/html.js'
import { ref } from '../html/ref.js'
import { signal } from '../html/signal.js'

type ToDoItem = {
  id: string
  message: string
  checked: boolean
}

const list = signal<ToDoItem[]>([])

export function toDoList() {
  const rawToDoList = localStorage.getItem('lithen-router@to-do-list')
  const toDoList = JSON.parse(rawToDoList ?? '[]')

  list.set(toDoList)

  function submitForm(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement

    const message = String(form.message.value)

    if (!message) return

    // Not ideal, should not be necessary to create a new signal
    // And probably should unsubscribe the previous
    const item = {
      id: crypto.randomUUID() as string,
      message,
      checked: false
    }
    list.set(value => [...value, item])
    form.reset()
  }
  
  return html`
    <h1>To Do List</h1>
    
    <form class="d-flex" on-submit=${submitForm}>
      <input name="message" placeholder="What to do..." />
      <button>Add</button>
    </form>

    <h3>Open</h3>
    <ul>
      ${shell(() => list
        .get()
        .filter(item => !item.checked)
        .map(todoItem)
      )}
    </ul>

    <h3>Closed</h3>
    <ul>
      ${shell(() => list
        .get()
        .filter(item => item.checked)
        .map(todoItem)
      )}
    </ul>
  `
}

function todoItem(item: ToDoItem) {
  const spanRef = ref<HTMLSpanElement>()
  const labelRef = ref<Element>()
  const { message, checked } = item

  function onClickCheckbox() {
    item.checked = !checked
    list.update()
  }

  return html`
    <label on-click=${onClickCheckbox} ref=${labelRef}>
      <input
        type="checkbox"
        ${checked && 'checked'}
        ${checked && 'disabled'}
      />
      <span ref=${spanRef}>${message}</span>
    </label>
  `
}
