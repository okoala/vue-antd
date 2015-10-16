<template>
<Checkbox ref="checkbox"></Checkbox>
</template>

<script>
import Checkbox from '../checkbox'
import defaultProps from '../../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-radio',
    type: 'radio'
  }),

  components: { Checkbox }
}

</script>
