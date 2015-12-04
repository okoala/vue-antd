export * from './lang'
export * from './env'
export * from './dom'
export * from './props'
export * from './event'
export { guid } from './guid'
export { KeyCode } from './KeyCode'
export { slotMixin } from './slotMixin'
export { cx } from 'classnames'

export function getPlainObject (vueObject) {
  return JSON.parse(JSON.stringify(vueObject))
}
