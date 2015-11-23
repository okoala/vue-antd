<template>
<li :class="prefixCls + '-item ' + endCls">
  <div :style="{display: lastTailShow}" :class="prefixCls + '-item-tail'"></div>
  <div :class="prefixCls + '-item-head ' + prefixCls + '-item-head-' + color"></div>
  <div :class="prefixCls + '-item-content'">
    <slot></slot>
  </div>
  <div v-if="pending && timelineLast" :class="prefixCls + '-item-head ' + prefixCls + '-item-head-end'"></div>
</li>
</template>

<script>
import { defaultProps } from '../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-timeline',
    color: 'blue',
    timelineLast: false,
    pending: false
  }),

  computed: {
    endCls () {
      return this.pending && this.timelineLast ? this.prefixCls + '-item-last' : ''
    },
    lastTailShow () {
      return this.timelineLast && !this.pending ? 'none' : 'block'
    }
  },

  methods: {

  }
}

</script>
