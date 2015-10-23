<template>
<Tooltip
  ref="tooltip"
  :visible.sync="visible"
  :afterVisibleChange="_afterVisibleChange"
  :onVisibleChange="_onVisibleChange">
  <slot name='overlay' :class="prefixCls + '-menu'" @click="_onClick"></slot>
  <slot></slot>
</Tooltip>
</template>

<script>
import Tooltip from './base/tooltip'
import { defaultProps } from '../utils'

export default {
  props: defaultProps({
    transitionName: 'slide-up',
    prefixCls: 'ant-dropdown',
    minOverlayWidthMatchTrigger: true,
    visible: Boolean,
    defaultVisible: false,
    onVisibleChange: () => {}
  }),

  components: { Tooltip }

  data () {
    return {
      placement: {
        points: ['tl', 'bl']
      }
    }
  },

  compiled () {
    if (this.visible == null) {
      this.visible = this.defaultVisible
    }
  },

  methods: {
    _onClick (e) {

    },

    _onVisibleChange (value) {
      this.visible = value
      this.onVisibleChange(value)
    },

    // todo
    _afterVisibleChange (visible) {
      if (visible && this.minOverlayWidthMatchTrigger) {
        const overlayNode = this.$el
      }
    },
  }
}

</script>
