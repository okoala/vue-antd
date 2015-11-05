<template>
<trigger
  v-rel:trigger
  :popup-class-name="overlayClassName"
  :prefixCls="prefixCls"
  :popup="''"
  :action="trigger"
  :builtin-placements="placements"
  :popup-placement="placement"
  :popup-align="align"
  :popup-style="overlayStyle"
  :popup-transition-name="transitionName"
  :popup-animation="animation"
  :on-popup-visible-change="onVisibleChange"
  :destoryPopupOnHide="destoryTooltipOnHide"
  :mouse-enter-delay="mouseEnterDelay"
  :mouse-leave-delay="mouseLeaveDelay">
  <div :class="prefixCls + '-arrow'"></div>
  <div :class="prefixCls + '-inner'">
    <slot></slot>
  </div>
</trigger>
</template>

<script>
import { placements } from './placements'
import Trigger from '../trigger'

export default {
  props: defaultProps({
    prefixCls: 'ant-tooltip',
    mouseEnterDelay: 0,
    destoryTooltipOnHide: false,
    mouseLeaveDelay: 0.1,
    align: {},
    placement: 'right',
    trigger: ['hover']
  }),

  components: { Trigger },

  methods: {

  }
}

</script>
