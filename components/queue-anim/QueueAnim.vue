<template>
<div>
  <div v-if="component === 'div'">
    <slot></slot>
  </div>
  <ul v-if="component === 'ul'">
    <slot></slot>
  </ul>
  <ol v-if="component === 'ol'">
    <slot></slot>
  </ol>
  <form v-if="component === 'form'">
    <slot></slot>
  </form>
</div>
</template>

<script>
import { defaultProps, oneOfType, oneOf } from '../../utils'
import velocity from 'velocity-animate'
import ANIM_TYPES from './animTypes'

const BackEase = {
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
}

function transformArguments (arg) {
  if (Array.isArray(arg) && arg.length === 2) {
    return arg
  }
  return [arg, arg]
}

export default {
  props: defaultProps({
    component: oneOf(['div', 'form', 'ul', 'ol'], 'div'),
    interval: oneOfType([Number, Array], 100),
    duration: oneOfType([Number, Array], 500),
    delay: oneOfType([Number, Array], 0),
    type: oneOfType([String, Array], 'right'),
    animConfig: oneOfType([String, Array]),
    ease: oneOfType([String, Array], 'easeOutQuart'),
    leaveReverse: false,
    animatingClassName: () => ['queue-anim-entering', 'queue-anim-leaving']
  }),

  data () {
    return {
      originChildren: [],
      children: [],
      childrenShow: {}
    }
  },

  ready () {
    this.keysToEnter = []
    this.keysToLeave = []
    this.keysAnimating = []

    this.$children.forEach(child => {
      if (!child || !child.key) {
        return
      }
      this.keysToEnter.push(child.key)
      this.children.push(child)
      this.originChildren.push(child)
    })

    this.keysToEnter.forEach(this._performEnter)
  },

  beforeDestory () {
    if (this.originChildren && this.originChildren.length > 0) {
      this.originChildren.forEach(child => {
        velocity(child, 'stop')
      })
    }
  },

  methods: {
    _getNodeByKey (key) {
      const node = this.children.map(item => {
        item.key === key
      })

      return node && node.length ? node[0] : null
    },

    _getVelocityConfig (index) {
      if (this.animConfig) {
        return transformArguments(this.animConfig)[index]
      }
      return ANIM_TYPES[transformArguments(this.animConfig)[index]]
    },

    _getVelocityEnterConfig () {
      return this._getVelocityConfig(0)
    },

    _getVelocityLeaveConfig () {
      const config = this._getVelocityConfig(1)
      const ret = {}
      Object.keys(config).forEach((key) => {
        if (Array.isArray(config[key])) {
          ret[key] = Array.prototype.slice.call(config[key]).reverse()
        } else {
          ret[key] = config[key]
        }
      })
      return ret
    },

    _getVelocityEasing () {
      return transformArguments(this.ease).map(easeName => {
        if (typeof easeName === 'string') {
          return BackEase[easeName] || easeName
        }
      })
    },

    _performEnter (key, i) {
      const node = this._getNodeByKey(key)
      if (!node) {
        return
      }
      const interval = transformArguments(this.interval)[0]
      const delay = transformArguments(this.delay)[0];
      const duration = transformArguments(this.duration)[0]
      node.style.visibility = 'hidden'
      velocity(node, 'stop')
      velocity(node, this._getVelocityEnterConfig('enter'), {
        delay: interval * i + delay,
        duration: duration,
        easing: this._getVelocityEasing()[0],
        visibility: 'visible',
        begin: this._enterBegin.bind(this, key),
        complete: this._enterComplete.bind(this, key)
      })
      if (this.keysToEnter.indexOf(key) >= 0) {
        this.keysToEnter.splice(this.keysToEnter.indexOf(key), 1)
      }
    },

    _performLeave (key, i) {
      const node = this._getNodeByKey(key)
      if (!node) {
        return
      }
      const interval = transformArguments(this.interval)[1]
      const delay = transformArguments(this.delay)[1]
      const duration = transformArguments(this.duration)[1]
      const order = this.leaveReverse ? (this.keysToLeave.length - i - 1) : i
      velocity(node, 'stop')
      velocity(node, this._getVelocityLeaveConfig('leave'), {
        delay: interval * order + delay,
        duration: duration,
        easing: this._getVelocityEasing()[1],
        begin: this._leaveBegin.bind(this),
        complete: this._leaveComplete.bind(this, key)
      })
    },

    _enterBegin (key, elements) {
      const childrenShow = this.childrenShow
      childrenShow[key] = true
      this.childrenShow = childrenShow
      elements.forEach(elem => {
        elem.className += (' ' + this.animatingClassName[0])
      })
    },

    _enterComplete (key, elements) {
      if (this.keysAnimating.indexOf(key) >= 0) {
        this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      }
      elements.forEach((elem) => {
        elem.className = elem.className.replace(this.animatingClassName[0], '').trim()
      })
    },

    _leaveBegin (elements) {
      elements.forEach((elem) => {
        elem.className += (' ' + this.animatingClassName[1])
      })
    },

    _leaveComplete (key, elements) {
      if (this.keysAnimating.indexOf(key) < 0) {
        return
      }
      this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      const childrenShow = this.childrenShow
      childrenShow[key] = false
      if (this.keysToLeave.indexOf(key) >= 0) {
        this.keysToLeave.splice(this.keysToLeave.indexOf(key), 1)
      }
      if (this.keysToLeave.length === 0) {
        const currentChildren = toArrayChildren(getChildrenFromProps(this.props))
        this.children = currentChildren
        this.childrenShow = childrenShow
      }
      elements.forEach((elem) => {
        elem.className = elem.className.replace(this.props.animatingClassName[1], '').trim()
      })
    }
  }
}

</script>
