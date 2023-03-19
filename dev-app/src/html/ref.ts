export type Ref = object & Record<'el', Node | null>

export const ref = <T extends Node>() => ({ el: null as null | T })
