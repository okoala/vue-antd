<template>
<div :class="loadingClasses">
  <div v-if="!hide" :class="spinWrapClasses">
    <div :class="spinClasses">
      <span :class="prefixCls + '-dot ' + prefixCls + '-dot-first'"></span>
      <span :class="prefixCls + '-dot ' + prefixCls + '-dot-second'"></span>
      <span :class="prefixCls + '-dot ' + prefixCls + '-dot-third'"></span>
    </div>
  </div>
  <div :class="prefixCls + '-container'">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { defaultProps, oneOf } from '../../utils'
import classnames from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-spin',

    size: oneOf(['small', 'default', 'large'], 'default'),
    hide: false,
    className: String
  }),

  computed: {
    nestedStatus () {
      return this.$children ? true : false
    },

    loadingClasses () {
      return classnames({
        'ant-spin-nested-loading': !this.hide && this.nestedStatus
      })
    },

    spinWrapClasses () {
      const sizeCls = ({
        'large': 'lg',
        'small': 'sm'
      })[this.size] || ''

      return classnames({
        [`${this.prefixCls}-wrapper`]: 1,
        [`${this.prefixCls}-${sizeCls}`]: !!sizeCls
      })
    },

    spinClasses () {
      return classnames({
        [this.prefixCls]: 1,
        [this.className]: !!this.className
      })
    }
  },

  methods: {

  }
}

</script>
