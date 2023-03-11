export function html(text: TemplateStringsArray, ...values: unknown[]) {
  const htmlText = text.reduce((acc, str, index) => {
    return acc + str + String(values[index] ?? '')
  }, '')

  return htmlText
}

export function render(htmlText: string, target: Element) {
  const template = document.createElement('template')
  template.innerHTML = htmlText

  const documentFragment = template.content

  target.replaceChildren(documentFragment)
}
