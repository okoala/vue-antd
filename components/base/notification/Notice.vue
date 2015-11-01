<template>
<div :class="classnames" :style="style">
  <div :class="componentClass + '-content'">
    <slot></slot>
  </div>
  <span v-if="closable">
    <a
      tabIndex="0"
      @click="_close"
      :class="componentClass + '-close'">
      <span :class="componentClass + '-close-x'"></span>
    </a>
  </span>
</div>
</template>

<script>
import Animate from '../animate'
import {createChainedFunction, classSet} from 'rc-util'
import { defaultProps } from '../../../utils'

const Notice = {
  props: defaultProps({
    prefixCls: {
      type: String,
      required: true
    },
    duration: 1.5,
    style: {
      type: Object,
      default: {
        right: '50%'
      }
    },
    closable: Boolean,
    className: String,
    onEnd: () => {},
    onClose: () => {}
  }),

  data () {
    return {
      componentClass: `${this.prefixCls}-notice`
    }
  },

  computed: {
    classnames () {
      return classSet({
        [`${this.componentClass}`]: 1,
        [`${this.componentClass}-closable`]: this.closable,
        [this.className]: !!this.className
      })
    }
  }

  compiled () {
    this._clearCloseTimer()

    if (this.duration) {
      this.closeTimer = setTimeout(() => {
        this._close()
      }, this.duration * 1000)
    }
  },

  methods: {
    beforeDestory () {
      this._clearCloseTimer()
    },

    _clearCloseTimer () {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },

    _close () {
      this._clearCloseTimer()
      this.onClose()
    }
  }
}

</script>
