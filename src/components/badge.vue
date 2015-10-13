<template>
<span>
<span v-if='dot' :class="'prefixCls'">
  <slot></slot>
  <sup :class="prefixCls + '-dot'"></sup>
</span>
<span v-else>
  <slot></slot>
  <sup v-if='count' :class="prefixCls + '-count'">{{count | short}}</sup>
</span>
</span>
</template>

<script>
export default {
  props: {
    prefixCls: {
      type: String,
      default: 'ant-badge'
    },
    count: Number,
    dot: {
      type: Boolean,
      default: false
    }
  },

  filter: {
    short: (value) => {
      return value >= 100 ? '99+' : value
    }
  }
}
</script>
