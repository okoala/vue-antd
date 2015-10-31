<template>
<div :class="wrapClasses"><slot></slot></div>
</template>

<script>
import { defaultProps } from '../../utils'
import classnames from 'classnames'

export default {
  props: defaultProps({
    span: String,
    order: String,
    offset: String,
    push: String,
    pull: String,
    className: String
  }),

  computed: {
    wrapClasses () {
      return classnames({
        [`col-${this.span}`]: this.span,
        [`col-order-${this.order}`]: this.order,
        [`col-offset-${this.offset}`]: this.offset,
        [`col-push-${this.push}`]: this.push,
        [`col-pull-${this.pull}`]: this.pull,
        [`${this.className}`]: this.className
      })
    }
  }
}

</script>
