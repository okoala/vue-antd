import velocity from 'velocity-animate'
import isPlainObject from 'lodash.isplainobject'
import _KeyCode from './KeyCode'
import _guid from './guid'

const toString = Object.prototype.toString

function animate (node, show, transitionName, done) {
  let ok

  const complete = () => {
    if (!ok) {
      ok = true
      done()
    }
  }

  node.style.display = show ? 'block' : 'none'

  velocity(node, transitionName, {
    duration: 240,
    complete: complete,
    easing: 'easeInOutQuad'
  })

  return {
    stop () {
      velocity(node, 'finish')
      complete()
    }
  }
}

export const guid = _guid
export const KeyCode = _KeyCode
export const openAnimation = {
  enter (node, done) {
    return animate(node, false, 'slideDown', done)
  },

  leave (node, done) {
    return animate(node, true, 'slideUp', done)
  },

  appear (node, done) {
    return animate(node, false, 'slideDown', done)
  }
}

// 返回vue匹配的props的对象
export function defaultProps (props) {
  for (const i in props) {
    if (props.hasOwnProperty(i)) {
      let defaultValue = props[i]

      if (defaultValue.name && window[defaultValue.name] === defaultValue) {
        props[i] = {
          type: defaultValue,
          default: null
        }

        continue
      }

      if (isPlainObject(defaultValue)) continue

      let type = toString.call(defaultValue).replace('[object ', '').replace(']', '')

      props[i] = {
        type: window[type],
        default: defaultValue
      }
    }
  }

  return props
}

export function oneOfType (validList, defaultValue) {
  let validaObj = {}

  validaObj.default = defaultValue
  validaObj.validator = function (value) {
    for (let j = 0; j < validList.length; j++) {
      const validName = validList[j].name
      if (toString.call(value).indexOf(validName) > -1) {
        return true
      }
    }
    return false
  }

  return validaObj
}

export function oneOf (validList, defaultValue) {
  let validaObj = {}

  validaObj.default = defaultValue
  validaObj.validator = function (value) {
    for (let j = 0; j < validList.length; j++) {
      if (value === validList[j]) {
        return true
      }
    }
    return false
  }

  return validaObj
}

export function getPlainObject (vueObject) {
  return JSON.parse(JSON.stringify(vueObject))
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
