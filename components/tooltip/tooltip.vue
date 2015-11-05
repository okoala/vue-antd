<template>
<tooltip
  :transition-name="transitionName"
  :overlay="title"
  :visible="visible">
  <slot></slot>
</tooltip>
</template>

<script>
import { defaultProps } from '../../utils'
import Tooltip from '../base/tooltip'

const transitionNameMap = {
  top: 'zoom-down',
  bottom: 'zoom-up',
  left: 'zoom-right',
  right: 'zoom-left',
  topLeft: 'zoom-down',
  bottomLeft: 'zoom-up',
  leftTop: 'zoom-right',
  rightTop: 'zoom-left',
  topRight: 'zoom-down',
  bottomRight: 'zoom-up',
  leftBottom: 'zoom-right',
  rightBottom: 'zoom-left'
}

export default {
  props: defaultProps({
    prefixCls: 'ant-tooltip',
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
  }),

  components: { Tooltip },

  computed: {
    transitionName () {
      return transitionNameMap[this.placement]
    }
  }
}

</script>
