import { HTMLString } from './html.js'
import { Signal, signalSymbol } from './signal.js'

type ResolverValue<T = unknown> = {
  currentHTML: string
  resources: Map<string, unknown>
  hash: string
  index: number
  data: T
}

type Resolver<T = unknown> = (value: ResolverValue<T>) => string | undefined

export function resolveTemplateData(value: ResolverValue) {
  const resolvedString = pipe(value,
    resolveHTMLString,
    resolveEventListener,
    resolveObjectValues
  )

  return {
    ...value,
    resolvedString
  }
}

function pipe(value: ResolverValue, ...resolvers: Resolver<any>[]) {
  for (const resolver of resolvers) {
    const str = resolver(value)

    if (str !== undefined) {
      return str
    }
  }
}

function resolveObjectValues(value: ResolverValue) {
  if (typeof value.data !== 'object') return

  return pipe(value, resolveArray, resolveRef, resolveSignal)
}

function resolveEventListener(value: ResolverValue) {
  const { data, currentHTML, hash, index, resources } = value

  if (typeof data === 'function') {
    const eventMatch = currentHTML.match(/.*\son-([\w\-]+)=$/)

    if (eventMatch) {
      const eventName = eventMatch[1]
      const eventId = `"${hash}-${index}"`
      resources.set(`on-${eventName}=${eventId}`, data)
      return eventId
    }
  }
}

function resolveHTMLString(value: ResolverValue) {
  if (value.data instanceof HTMLString) {
    value.resources = new Map([
      ...value.resources,
      ...value.data.resources
    ])

    return value.data.toString()
  }
}

function resolveArray(value: ResolverValue) {
  if (!Array.isArray(value.data)) return
  
  const { data: dataList } = value

  return dataList.reduce((acc, data) => {
    if (data instanceof HTMLString) {
      value.resources = new Map([
        ...value.resources,
        ...data.resources
      ])

      return acc + data.toString()
    }

    return acc + String(data)
  }, '')
}

function resolveRef(value: ResolverValue<object>) {
  const { currentHTML, hash, index, data, resources } = value

  if ('el' in data!) {
    const match = currentHTML.match(/.*\sref=$/)

    if (!match) return

    const refId = `"${hash}-${index}"`
    resources.set(`ref=${refId}`, data)
    return refId
  }
}

function resolveSignal(value: ResolverValue) {
  const { data } = value

  if (Reflect.get(data!, '_symbol') !== signalSymbol) return

  return pipe(value, resolveAttributeSignal, resolveTextSignal) 
}

function resolveTextSignal(value: ResolverValue<Signal<unknown>>) {
  const { currentHTML, hash, index, resources, data } = value

  const isInsideTag = checkIsInsideTag(currentHTML)

  if (!isInsideTag) return

  const signalId = `text-sig="${hash}-${index}"`
  resources.set(signalId, data)

  return `<template ${signalId}></template>`
}

function checkIsInsideTag(html: string) {
  for (let i=html.length-1; i>0; i-=1) {
    const letter = html.at(i)

    if (letter === undefined) return false

    if (letter === '>') return true

    if (letter === '<') return false
  }
}

function resolveAttributeSignal(value: ResolverValue<Signal<unknown>>) {
  const { currentHTML, hash, index, resources, data } = value

  const match = currentHTML.match(/.*\s([\w-]+)=$/)

  if (match) {
    const attributeName = match[1]
    const signalId = `"${hash}-${index}"`
    resources.set(`sig-attr-${attributeName}=${signalId}`, data)
    return signalId
  }
}
