import { router } from './router.js'
import { render } from '/dist/html.js'

function init() {
  const match = router.matchRoute()
  const { layout, render: pageRender } = match.value
  const html = layout ? layout(pageRender()) : pageRender()

  render(html, document.querySelector('#app'))
}

router.onNavigate(init)
window.onload = init
