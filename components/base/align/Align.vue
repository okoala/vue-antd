<template>
<div><slot></slot></div>
</template>

<script>
import { defaultProps } from '../../../utils'
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
    align: {
      type: Object,
      require: true
    },
    target: () => window,
    onAlign: () => {},
    monitorBufferTime: 50,
    monitorWindowResize: false,
    disabled: false
  }),

  computed: {
    currentNode () {
      return this.$el
    }
  },

  watch: {
    align () {
      this._doAlign()
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

  ready () {
    this._doAlign()

    this.resizeHandler = buffer(this._onWindowResize, this.monitorBufferTime)

    if (this.monitorWindowResize && !this.disabled) {
      this._startMonitorWindowResize()
    } else {
      this._stopMonitorWindowResize()
    }
  },

  methods: {
    _doAlign () {
      this.onAlign(this.currentNode, align(this.currentNode, this.target(), this.align))
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
