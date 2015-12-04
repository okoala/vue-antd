import { isIE9 } from './env'
import { camelize } from 'lang'

const setClass = isIE9
  ? function (el, cls) {
    /* istanbul ignore next */
    el.className = cls
  }
  : function (el, cls) {
    el.setAttribute('class', cls)
  }

export function addClass (el, cls) {
  if (el.classList) {
    el.classList.add(cls)
  } else {
    var cur = ' ' + (el.getAttribute('class') || '') + ' '
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim())
    }
  }
}

export function addStyle (el, clsObj) {
  Object.keys(clsObj).forEach(name => {
    el.style[camelize(name)] = clsObj[name]
  })
}

export function contains (root, node) {
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export function getTrustSlotNode (node) {
  let childNode = node.nextSibling
  if (childNode.nodeType !== 1) {
    return getTrustSlotNode(childNode)
  }
  return childNode
}
