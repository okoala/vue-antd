<template>
<li :class="className + ' ' + rootPrefixCls + '-item-divider'"></li>
</template>

<script>
import { defaultProps } from '../../../utils'

export default {
  props: defaultProps({
    rootPrefixCls: '',
    className: '',
    disabled: true
  })
}

</script>
