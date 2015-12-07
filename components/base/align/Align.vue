<template>
<slot></slot>
</template>

<script>
import { defaultProps, any, getTrustSlotNode, throttle } from '../../../utils'
import align from 'dom-align'

function isWindow(obj) {
  /* eslint no-eq-null: 0 */
  /* eslint eqeqeq: 0 */
  return obj != null && obj == obj.window
}


function buffer(fn, ms) {
  let timer

  return function bufferFn() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, ms)
  }
}

export default {
  props: defaultProps({
    className: '',
    align: {
      type: Object,
      require: true
    },
    watchProps: any,
    visible: true,
    target: () => window,
    onAlign: () => {},
    monitorBufferTime: 50,
    monitorWindowResize: false,
    disabled: false
  }),

  computed: {
    currentNode () {
      return getTrustSlotNode(this.$el)
    }
  },

  watch: {
    align () {
      this._doAlign()
    },

    visible (val) {
      if (val) {
        this._doAlign()
      }
    },

    watchProps (newVal, oldVal) {
      if (newVal !== oldVal) {
        this._doAlign()
      }
    },

    monitorWindowResize (val) {
      if (val && !this.disabled) {
        this._startMonitorWindowResize()
      } else {
        this._stopMonitorWindowResize()
      }
    }
  },

  beforeDestory () {
    this._stopMonitorWindowResize()
  },

  compiled () {
    this._doAlign = throttle(this.__doAlign.bind(this), 50)
  },

  ready () {
    this._doAlign()
    this.resizeHandler = buffer(this._onWindowResize, this.monitorBufferTime)

    if (this.monitorWindowResize && !this.disabled) {
      this._startMonitorWindowResize()
    } else {
      this._stopMonitorWindowResize()
    }

    this._doAlign
  },

  methods: {
    __doAlign () {
      const target = this.target()
      if (!target) {
        return
      }
      const currentNode = this.currentNode
      const display = currentNode.style.display
      currentNode.style.left = '0'
      currentNode.style.top = '0'
      currentNode.style.display = 'block'
      this.onAlign(currentNode, align(currentNode, target, this.align))
      currentNode.style.display = display
    },

    _onWindowResize () {
      if (!this.disabled) {
        this._doAlign()
      }
    },

    _startMonitorWindowResize () {
      if (!this.hasListener) {
        this.hasListener = true
        window.addEventListener('resize', this.resizeHandler, false)
      }
    },

    _stopMonitorWindowResize () {
      if (this.hasListener) {
        this.hasListener = false
        window.removeEventListener('resize', this.resizeHandler, false)
      }
    }
  }
}

</script>
