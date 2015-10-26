<template>
<span class="ant-switch ant-switch-checked">
  <span class="ant-switch-inner"></span>
</span>
</template>

<script>
import { defaultProps } from '../../../src/utils'


export default {
  props: defaultProps({
    prefixCls: 'ant-switch',
    style: {},
    checkedChildren: null,
    unCheckedChildren: null,
    className: '',
    defaultChecked: false,
    onChange: () => {}
  })
}

</script>
