<template>
<span
  @mouseenter="onMouseEnter"
  @mouseleave="onMouseLeave">
  <slot></slot>
</span>
</template>

<script>
import { defaultProps, contains } from '../../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    hiddenClassName: String,
    visible: true,
    className: String,
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  }),

  watch: {
    visible (val) {
      if (val) {
        this.$el.parentNode.classList.remove(this.hiddenClassName)
      } else {
        this.$el.parentNode.classList.add(this.hiddenClassName)
      }
    }
  },

  computed: {
    wrapClasses () {
      let className = this.className
      if (!this.visible) {
        className += ' ' + this.hiddenClassName
      }
      return className
    }
  }
}
</script>
