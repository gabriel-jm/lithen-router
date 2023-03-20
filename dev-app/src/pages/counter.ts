import { html } from '../html/html.js'
import { ref } from '../html/ref.js'
import { signal } from '../html/signal.js'
import { router } from '../router.js'

export function counter() {
  const pRef = ref<HTMLParagraphElement>()
  const initalValue: number = Number(
    router.searchParams?.get('initialCount')
    ?? router.params?.get('initialCount')
    ?? 0
  )
  const count = signal(initalValue)

  return html`
    <h1>Counter Page</h1>
    <div>
      <p ref=${pRef}>
        Current Count: ${count}
      </p>
      <button on-click=${() => count.set(value => value + 1)}>
        increment
      </button>
    </div>

    ${[  
      counterInitLink({
        href: '/counter?initialCount=10',
        text: 'Start count with 10 in query'
      }),
      counterInitLink({
        href: '/counter/10',
        text: 'Start count with 10 in params'
      })
    ]}
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
