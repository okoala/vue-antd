<template>
<slot v-el:source></slot>
</template>

<script>
import { defaultProps } from '../../utils'
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

  compiled () {
    if (!this.disabled) {
      if (this.monitorWindowResize) {
        this._startMonitorWindowResize()
      }
    }
  },

  beforeDestory () {
    this._stopMonitorWindowResize()
  },

  ready () {
    let reAlign = false
    let currentTarget

    // if (!this.disabled) {
    //   if ()
    // }

    if (reAlign) {
      const source = this.$els.source
      this.onAlign(source, align(source, this.target(), this.align)
    }

    if (this.monitorWindowResize && !this.disabled) {
      this._startMonitorWindowResize()
    } else {
      this._stopMonitorWindowResize()
    }
  },

  methods: {
    _onWindowResize () {
      if (!this.disabled) {
        const source = this.$els.source
        this.onAlign(source, align(source, this.target(), this.align))
      }
    },

    _startMonitorWindowResize () {
      if (!this.resizeHandler) {
        this.resizeHandler = window.addEventListener('resize', buffer(this._onWindowResize, this.monitorBufferTime), false)
      }
    },

    _stopMonitorWindowResize () {
      if (this.resizeHandler) {
        this.resizeHandler.remove()
        this.resizeHandler = null
      }
    }
  }
}

</script>
