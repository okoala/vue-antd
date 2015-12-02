import _KeyCode from './KeyCode'
import _guid from './guid'
import _slotMixin from './slotMixin'

const toString = Object.prototype.toString

export const slotMixin = _slotMixin
export const guid = _guid
export const KeyCode = _KeyCode

// 返回vue匹配的props的对象
export function defaultProps (props) {
  for (const i in props) {
    if (props.hasOwnProperty(i)) {
      let defaultValue = props[i]

      // 支持String， Number等类型
      if (defaultValue.name && window[defaultValue.name] === defaultValue) {
        props[i] = {
          type: defaultValue,
          default: null
        }

        continue
      }

      let type = toString.call(defaultValue).replace('[object ', '').replace(']', '')

      // 如果传进来的是vue的原生props对象的话
      if (type === 'Object') {
        if (defaultValue.type != null ||
            defaultValue.default != null ||
            defaultValue.validator != null ||
            defaultValue.twoWay != null ||
            defaultValue.required != null) {
          continue
        }
      }

      // 支持 Object和Array的简洁声明方式
      // Todo: 目前看来这样并没有什么卵用
      if (type === 'Array' || type === 'Object') {
        props[i] = {
          type: window[type],
          default: function () {
            return defaultValue
          }
        }
      }

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
    if (value == null) return true

    for (let j = 0; j < validList.length; j++) {
      const currentValid = validList[j]
      let validName
      if (typeof currentValid === 'string') {
        validName = currentValid
      } else {
        validName = currentValid.name
      }
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
    if (value == null) return true

    for (let j = 0; j < validList.length; j++) {
      if (value === validList[j]) {
        return true
      }
    }
    return false
  }

  return validaObj
}

export const any = {
  validator: function (value) {
    return true
  }
}

export function getTrustSlotNode (node) {
  let childNode = node.nextSibling
  if (childNode.nodeType !== 1) {
    return getTrustSlotNode(childNode)
  }
  return childNode
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

export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
