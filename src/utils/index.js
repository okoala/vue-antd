import velocity from 'velocity-animate'
import isPlainObject from 'lodash.isplainobject'
import _KeyCode from './KeyCode'

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

  if (defaultValue != null) {
    validaObj.default = defaultValue
  }

  validaObj.validator = function (value) {
    for (let i = 0; i < validList.length; i++) {
      if (toString.call(value).indexOf(validList[i].name) > -1) {
        return true
      }
    }
    return false
  }

  return validaObj
}

export function oneOf (validList, defaultValue) {
  let validaObj = {}

  if (defaultValue != null) {
    validaObj.default = defaultValue
  }

  validaObj.validator = function (value) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
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
