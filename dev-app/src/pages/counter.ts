import { html } from '../html/html.js'
import { router } from '../router.js'

export function counter() {
  const initalValue = Number(
    router.searchParams.get('initialCount')
    ?? router.params.initialCount
    ?? 0
  )
  const count = {
    value: initalValue,
    increment() {
      count.value++
      document.querySelector('p#count')!.textContent = 'Current Count: ' + count.value
    }
  }

  return html`
    <h1>Counter Page</h1>
    <div>
      <p id="count">Current Count: ${initalValue}</p>
      <button on-click=${() => count.increment()}>
        increment
      </button>
    </div>

    <div>
      <a href="/counter?initialCount=10">
        Start count with 10 in query
      </a>
    </div>
    <div>
      <a href="/counter/10">
        Start count with 10 in params
      </a>
    </div>
  `
}
