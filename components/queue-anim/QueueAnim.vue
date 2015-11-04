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
import { defaultProps, oneOfType, oneOf, guid } from '../../utils'
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
    show: true,
    component: oneOf(['div', 'form', 'ul', 'ol'], 'div'),
    interval: oneOfType([Number, Array], 100),
    duration: oneOfType([Number, Array], 500),
    delay: oneOfType([Number, Array], 0),
    type: oneOfType([String, Array], 'right'),
    animConfig: oneOfType([String, Array]),
    ease: oneOfType([String, Array], 'easeOutQuart'),
    animatingClassName: Array,
    leaveReverse: false
  }),

  data () {
    return {
      originChildren: [],
      children: [],
      childrenShow: {}
    }
  },

  compiled () {
    this.animatingClassName = this.animatingClassName || ['queue-anim-entering', 'queue-anim-leaving']
  },

  ready () {
    this.keysToEnter = []
    this.keysToLeave = []
    this.keysAnimating = []

    const keyNodes = Array.prototype.slice.call(this.$el.querySelectorAll('[key]:not([__scope_key__])'))

    keyNodes.forEach(child => {
      if (!child) {
        return
      }

      child.setAttribute('__scope_key__', 1)

      const key = child.getAttribute('key')
      if (!key) {
        return
      }

      this.keysToEnter.push(key)
      this.keysToLeave.push(key)
      this.keysAnimating.push(key)
      this.children.push({
        el: child,
        key: key
      })
      this.originChildren.push({
        el: child,
        key: key
      })
    })

    this.$on('queue-anim-hidden', () => {
      this._hiddenVelocityNode()
      return true
    })

    if (this.show) {
      this._performEnter()
    }
  },

  beforeDestory () {
    if (this.originChildren && this.originChildren.length > 0) {
      this.originChildren.forEach(child => {
        velocity(child, 'stop')
      })
    }
  },

  isActHideAnimate: false,

  watch: {
    show (value) {
      if (value) {
        this.isActHideAnimate = true
        this.$nextTick(() => {
          this.$broadcast('queue-anim-hidden')
          setTimeout(() => {
            this._performEnter()
            this.isActHideAnimate = false
          }, 50)
        })
      } else {
        this._performLeave(() => {
          if (!this.isActHideAnimate) {
            this.$broadcast('queue-anim-hidden')
          }
        })
      }
    }
  },

  methods: {
    _getNodeByKey (key) {
      let node = []
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].key === key) {
          node.push(this.children[i])
        }
      }

      return node && node.length ? node[0].el : null
    },

    _getVelocityConfig (index) {
      if (this.animConfig) {
        return transformArguments(this.animConfig)[index]
      }
      return ANIM_TYPES[transformArguments(this.type)[index]]
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

    _hiddenVelocityNode () {
      this.keysToEnter.forEach((key, i) => {
        const node = this._getNodeByKey(key)
        if (!node) {
          return
        }
        node.style.visibility = 'hidden'
        velocity(node, 'stop')
      })
    },

    _performEnter () {
      this.keysToEnter.forEach((key, i) => {
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
          begin: (elements) => {
            this._enterBegin(key, elements)
            if (node.__vue__) {
              const _enterFn = node.__vue__._performEnter
              _enterFn && _enterFn()

              const children = node.__vue__.$children
              children.forEach(item => {
                item._performEnter && item._performEnter()
              })
            }
          },
          complete: this._enterComplete.bind(this, key)
        })
      })
    },

    _performLeave (done) {
      const len = this.keysToLeave.length
      const self = this
      this.keysToLeave.forEach((key, i) => {
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
          complete: (elements) => {
            this._leaveComplete(key, elements)
            if (i === len - 1) {
              done && done()
            }
          }
        })
      })
    },

    _enterBegin (key, elements) {
      const self = this
      if (this.keysAnimating.indexOf(key) >= 0) {
        this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      }
      elements.forEach(elem => {
        elem.className = elem.className.replace(self.animatingClassName[1], '').trim()
        elem.className += (' ' + self.animatingClassName[0])
      })
    },

    _enterComplete (key, elements) {
      const self = this
      if (this.keysAnimating.indexOf(key) >= 0) {
        this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      }
      elements.forEach(elem => {
        elem.className = elem.className.replace(self.animatingClassName[0], '').trim()
      })
    },

    _leaveBegin (elements) {
      const self = this
      elements.forEach(elem => {
        elem.className = elem.className.replace(self.animatingClassName[0], '').trim()
        elem.className += (' ' + self.animatingClassName[1])
      })
    },

    _leaveComplete (key, elements) {
      const self = this
      if (this.keysAnimating.indexOf(key) < 0) {
        return
      }
      this.keysAnimating.splice(this.keysAnimating.indexOf(key), 1)
      elements.forEach(elem => {
        elem.className = elem.className.replace(self.animatingClassName[1], '').trim()
      })
    }
  }
}

</script>
