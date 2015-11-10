<template>
<div :class="loadingClasses">
  <div v-if="!hide" :class="spinWrapClasses">
    <span :class="prefixCls + '-dot ' + prefixCls + '-dot-first'"></span>
    <span :class="prefixCls + '-dot ' + prefixCls + '-dot-second'"></span>
    <span :class="prefixCls + '-dot ' + prefixCls + '-dot-third'"></span>
  </div>
  <div :class="prefixCls + '-container'">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { defaultProps, oneOf } from '../../utils'
import cx from 'classnames'

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
      return cx({
        'ant-spin-nested-loading': !this.hide && this.nestedStatus
      })
    },

    spinWrapClasses () {
      return cx({
        [this.prefixCls]: 1,
        [this.className]: !!this.className,
        [`${this.prefixCls}-spining`]: 1,
        [`${this.prefixCls}-${this.size}`]: !!this.size
      })
    }
  },

  methods: {

  }
}

</script>
