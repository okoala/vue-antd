export * from './lang'
export * from './env'
export * from './dom'
export * from './props'
export { guid } from './guid'
export { KeyCode } from './KeyCode'
export { slotMixin } from './slotMixin'

export function getPlainObject (vueObject) {
  return JSON.parse(JSON.stringify(vueObject))
}



