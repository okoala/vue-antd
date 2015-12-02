<template>
<collapse
  :prefix-cls="prefixCls"
  :active-key="activeKey"
  :accordion="accordion"
  :default-active-key="defaultActiveKey"
  :on-change="onChange">
  <slot></slot>
</collapse>
</template>

<script>
import { defaultProps, oneOfType } from '../../utils'
import Collapse from '../base/collapse'

export default {
  props: defaultProps({
    prefixCls: 'ant-collapse',
    activeKey: oneOfType([Array, String]),
    defaultActiveKey: oneOfType([String, Array]),
    accordion: false,
    onChange() {}
  }),

  components: { Collapse }
}

</script>
