<template>
<div :class="wrapClasses"><slot></slot></div>
</template>

<script>
import { defaultProps, oneOfType } from '../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    span: oneOfType([String, Number]),
    order: oneOfType([String, Number]),
    offset: oneOfType([String, Number]),
    push: oneOfType([String, Number]),
    pull: oneOfType([String, Number]),
    className: String
  }),

  computed: {
    wrapClasses () {
      return cx({
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
