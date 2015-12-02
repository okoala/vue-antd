<template>
<span
  :class="wrapClasses"
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
