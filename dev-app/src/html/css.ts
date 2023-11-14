export class CSSString extends String {
  constructor(data: string) {
    super(data)
  }
}

export function css(templateStrings: TemplateStringsArray, ...values: unknown[]) {
  const text = templateStrings.reduce((acc, templateStr, index) => {
    const valueStr = values[index] ?? ''
    
    return acc + templateStr + valueStr
  }, '')

  return new CSSString(text)
}
