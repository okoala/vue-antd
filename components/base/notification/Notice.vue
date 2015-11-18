<template>
<div :class="wrapClasses" :style="style">
  <div :class="componentClass + '-content'" v-el:content></div>
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
import cx from 'classnames'
import { defaultProps, oneOfType } from '../../../utils'

export default {
  props: defaultProps({
    prefixCls: '',
    duration: oneOfType([Number, 'Null'], 1.5),
    content: '',
    style: {
      type: Object,
      default: function() {
        return {
          right: '50%'
        }
      }
    },
    closable: Boolean,
    className: String,
    show: Boolean,
    onEnd: () => {},
    onClose: () => {}
  }),

  watch: {
    content () {
      this._renderContent()
    }
  },

  computed: {
    componentClass () {
      return `${this.prefixCls}-notice`
    },

    wrapClasses () {
      return cx({
        [this.componentClass]: 1,
        [this.className]: !!this.className,
        [`${this.componentClass}-closable`]: this.closable
      })
    }
  },

  ready () {
    this._renderContent()
  },

  compiled () {
    this._clearCloseTimer()

    if (this.duration) {
      this.closeTimer = setTimeout(() => {
        this._close()
      }, this.duration * 1000)
    }
  },

  beforeDestory () {
    this._clearCloseTimer()
  },

  methods: {
    _renderContent () {
      const node = this.$els.content
      const span = document.createElement('span')
      span.innerHTML = this.content
      this.$parent.$parent.$parent.$compile(span)
      node.appendChild(span)
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
      this.show = false
    }
  }
}

</script>
