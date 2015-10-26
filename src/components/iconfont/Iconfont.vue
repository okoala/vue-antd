<template>
<i :class="iconClassName">
  <slot></slot>
</i>
</template>

<script>
import { defaultProps } from '../../utils'
import classnames from 'classnames'

export default {
  props: defaultProps({
    className: '',
    type: {
      type: String,
      require: true
    }
  }),

  computed: {
    iconClassName () {
      return classnames({
        [this.className]: !!this.className,
        [`anticon`]: 1,
        [`anticon-${this.type}`]: this.type
      })
    }
  }
}

</script>
