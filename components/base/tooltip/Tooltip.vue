<template>
<trigger
  :popup-class-name="overlayClassName"
  :prefix-cls="prefixCls"
  :popup="''"
  :action="trigger"
  :watch-props="watchProps"
  :builtin-placements="placements"
  :popup-visible="visible"
  :popup-placement="placement"
  :popup-align="align"
  :popup-style="overlayStyle"
  :popup-transition-name="transitionName"
  :popup-animation="animation"
  :on-popup-visible-change="onVisibleChange"
  :destory-popup-on-hide="destoryTooltipOnHide"
  :mouse-enter-delay="mouseEnterDelay"
  :mouse-leave-delay="mouseLeaveDelay"
  :default-popup-visible="defaultVisible">
  <span slot="popup">
    <div :class="prefixCls + '-arrow'"></div>
    <div :class="prefixCls + '-inner'">
      <slot name="tooltip"></slot>
    </div>
  </span>
  <span slot="trigger"><slot></slot></span>
</trigger>
</template>

<script>
import { defaultProps, oneOfType, any } from '../../../utils'
import { placements } from './placements'
import Trigger from '../trigger'

export default {
  props: defaultProps({
    prefixCls: 'ant-tooltip',
    trigger: oneOfType([Array, String], 'hover'),
    mouseEnterDelay: 0,
    destoryTooltipOnHide: false,
    mouseLeaveDelay: 0.1,
    align: {
      type: Object,
      default: function (){ return {} }
    },
    transitionName: '',
    placement: 'right',
    animation: '',
    visible: false,
    watchProps: any,
    defaultVisible: false,
    overlayClassName: '',
    overlayStyle: {
      type: Object,
      default: function (){ return {} }
    },
    getTooltipContainer: () => {},
    onVisibleChange: () => {},
    afterVisibleChange: () => {}
  }),

  data () {
    return {
      placements: placements
    }
  },

  components: { Trigger }
}
</script>
