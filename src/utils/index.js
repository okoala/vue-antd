import velocity from 'velocity-animate'
import isPlainObject from 'lodash/lang/isPlainObject'

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

const openAnimation = {
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

export var openAnimation

// 返回vue匹配的props的对象
export function defaultProps (props) {
  for (const i in props) {
    if (props.hasOwnProperty(i)) {
      let defaultValue = props[i]

      if (defaultValue.name && window[defaultValue.name] === defaultValue) return
      if (isPlainObject(defaultValue)) return

      let type = toString.call(defaultValue).replace('[object ', '').replace(']', '')

      props[i] = {
        type: window[type],
        default: defaultValue
      }
    }
  }

  return props
}

export function oneOfType (...args) {
  let _options = args[args.length - 1]
  let options

  if (isPlainObject(_options) {
    options = _options
    args.length = args.length - 1
  }

  let result = {
    validator (value) {
      for (let i = 0; i < args.length; i++) {
        if (toString.call(value).indexOf(args[i].name) > -1) return true
      }

      return false
    }
  }

  if (options) {
    result = Object.assign({}, options, result)
  }

  return result
}
