<template>
<div :class="btgClasses">
  <slot></slot>
</div>
</template>

<script>
import { defaultProps, oneOf } from '../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-btn-group',

    size: oneOf(['large', 'small', undefined]),
    className: ''
  }),

  computed: {
    btgClasses () {
      const sizeCls = ({
        'large': 'lg',
        'small': 'sm'
      })[this.size] || ''

      return cx({
        [this.prefixCls]: 1,
        [`${this.prefixCls}-${sizeCls}`]: !!sizeCls,
        [this.className]: this.className
      })
    }
  }
}

</script>
