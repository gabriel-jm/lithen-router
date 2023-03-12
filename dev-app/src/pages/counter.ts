import { html } from '../html.js'
import { router } from '../router.js'

export function counter() {
  const initalValue = Number(router.searchParams.get('initialCount') ?? 0)
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

    <a href="/counter?initialCount=10">Start count with 10</a>
  `
}
