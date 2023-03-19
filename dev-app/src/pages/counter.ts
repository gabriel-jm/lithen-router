import { html } from '../html/html.js'
import { ref } from '../html/ref.js'
import { router } from '../router.js'

export function counter() {
  const pRef = ref<HTMLParagraphElement>()
  const initalValue = Number(
    router.searchParams.get('initialCount')
    ?? router.params.initialCount
    ?? 0
  )
  const count = {
    value: initalValue,
    increment() {
      count.value++

      if (pRef.el) {
        pRef.el.textContent = 'Current Count: ' + count.value
      }
    }
  }

  return html`
    <h1>Counter Page</h1>
    <div>
      <p ref=${pRef}>Current Count: ${initalValue}</p>
      <button on-click=${() => count.increment()}>
        increment
      </button>
    </div>

    ${counterInitLink({
      href: '/counter?initialCount=10',
      text: 'Start count with 10 in query'
    })}
    <div>
      <a href="/counter/10">
        Start count with 10 in params
      </a>
    </div>
  `
}

function counterInitLink({ href, text }: { href: string, text: string }) {
  return html`
    <div>
      <a href="${href}">
        ${text}
      </a>
    </div>
  `
}
