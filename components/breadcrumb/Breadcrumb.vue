<template>
<div :class="prefixCls">
  <slot></slot>
</div>
</template>

<script>
import { defaultProps } from '../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-breadcrumb'
  })
}

</script>
