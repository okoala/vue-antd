<template>
<div
  :class="wrapClasses"
  :style="style"
  @mouseenter="onMouseEnter"
  @mouseleave="onMouseLeave">
  <slot></slot>
</div>
</template>

<script>
import { defaultProps, contains } from '../../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    hiddenClassName: String,
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
