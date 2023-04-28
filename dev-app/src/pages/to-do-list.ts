import { shell } from '../html/comments-test.js'
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
  const ulRef = ref<HTMLUListElement>()

  const rawToDoList = localStorage.getItem('lithen-router@to-do-list')
  const toDoList = JSON.parse(rawToDoList ?? '[]')

  list.set(toDoList)

  function submitForm(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement

    const message = String(form.message.value)

    if (!message) return

    const item = {
      id: crypto.randomUUID(),
      message,
      checked: false
    }
    list.set(value => [...value, item])
    form.reset()

  }
  
  return html`
    <h1>To Do List</h1>
    <form on-submit=${submitForm}>
      <input name="message" placeholder="What to do..." />
      <button>Add</button>
    </form>
    <ul ref=${ulRef}>
      ${shell(list, (listData) => {
        return listData.map(todoItem)
      })}
    </ul>
  `
}

function todoItem(item: ToDoItem) {
  const spanRef = ref<HTMLSpanElement>()
  const labelRef = ref<Element>()

  function onClickCheckbox() {
    labelRef.el?.remove()
    list.set(value => value.filter(it => {
      return it.id !== item.id
    }))

    console.log(list.get())
  }

  return html`
    <label ref=${labelRef}>
      <input
        type="checkbox"
        on-click=${onClickCheckbox}
        ${item.checked && 'checked'}
      />
      <span ref=${spanRef}>${item.message}</span>
    </label>
  `
}
