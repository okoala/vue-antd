<template>
<dropdown
  :trigger="trigger"
  :transition-name="transitionName"
  :prefix-cls="prefixCls">
  <span slot="overlay">
    <slot name="overlay"></slot>
  </span>
  <slot></slot>
</dropdown>
</template>

<script>
import { defaultProps, oneOf, camelcaseToHyphen } from '../../utils'
import Dropdown from '../base/dropdown'

export default {
  props: defaultProps({
    trigger: oneOf(['hover', 'click'], 'hover'),
    transitionName: 'slide-up',
    prefixCls: 'ant-dropdown'
  }),

  components: { Dropdown }
}
</script>
