<template>
<span v-if='dot' :class="prefixCls">
  <slot></slot>
  <sup :class="prefixCls + '-dot'"></sup>
</span>
<span v-else :class="prefixCls">
  <slot></slot>
  <sup v-if='count' :class="prefixCls + '-count'">{{count | short}}</sup>
</span>
</template>

<script>
import { defaultProps } from '../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-badge',
    count: Number,
    dot: false
  }),

  filters: {
    short: (value) => {
      return value >= 100 ? '99+' : value
    }
  }
}
</script>

<style>
.ant-badge {
    margin-right: 16px;
}

.ant-badge-count {
  right: 0;
  transform: translateX(50%);
}
</style>
