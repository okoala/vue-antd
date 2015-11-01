<template>
<div :class="wrapClasses"><slot></slot></div>
</template>

<script>
import { defaultProps } from '../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    type: String,
    align: String,
    justify: String,
    className: String
  }),

  computed: {
    wrapClasses () {
      return cx({
        [`row`]: 1,
        [`row-${this.type}`]: this.type,
        [`row-${this.type}-${this.align}`]: this.align,
        [`row-${this.type}-${this.justify}`]: this.justify,
        [`${this.className}`]: this.className
      })
    }
  }
}

</script>
