<template>
<collapse
  :prefix-cls="prefixCls"
  :active-key="activeKey"
  :accordion="accordion"
  :default-active-key="defaultActiveKey"
  :on-change="onChange"></collapse>
</template>

<script>
import { defaultProps, oneOfType } from '../../utils'
import Collapse from '../base/collapse'

export default {
  props: defaultProps({
    prefixCls: 'ant-collapse',
    activeKey: oneOfType(['Array', 'String']),
    defaultActiveKey: String,
    accordion: false,
    onChange() {}
  }),

  components: { Collapse }
}

</script>
