<template>
<tooltip
  :prefix-cls="prefixCls"
  :placement="placement"
  :on-visible-change="onVisibleChange"
  :transition-name="'ant-trigger-popup-zoom'"
  :visible="visible"
  :trigger="trigger">
  <div slot="tooltip">
    <div v-if="title" :class="prefixCls + '-title'">
      {{{title}}}
    </div>
    <div :class="prefixCls + '-content'">
        <slot name="overlay"></slot>
    </div>
  </div>
  <span slot="trigger"><slot></slot></span>
</tooltip>
</template>

<script>
import { defaultProps, any } from '../../utils'
import Tooltip from '../base/tooltip'

export default {
  props: defaultProps({
    prefixCls: 'ant-popover',
    title: any,
    placement: 'top',
    transitionName: '',
    trigger: 'hover',
    visible: false,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    onVisibleChange: () => {}
  }),

  components: { Tooltip },

  computed: {
    transitionName () {
      return ({
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
      })[this.placement]
    }
  },

  methods: {
  }
}

</script>
