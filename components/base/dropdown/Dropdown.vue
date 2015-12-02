<template>
<trigger
  :prefix-cls="prefixCls"
  :popup-class-name="overlayClassName"
  :popup-style="overlayStyle"
  :builtin-placements="placements"
  :action="trigger"
  :popup-placement="placement"
  :popup-align="align"
  :popup-transition-name="transitionName"
  :popup-animation="animation"
  :popup-visible="visible"
  :after-popup-visible-change="_afterVisibleChange"
  :on-popup-visible-change="_onVisibleChange">
  <span slot="popup" v-el:popup :class="prefixCls + '-menu'" @click="_onClick">
    <slot name="overlay"></slot>
  </span>
  <span slot="trigger"><slot></slot></span>
</trigger>
</template>

<script>
import { defaultProps, any } from '../../../utils'
import Trigger from '../trigger'

export default {
  props: defaultProps({
    minOverlayWidthMatchTrigger: true,
    prefixCls: 'vc-dropdown',
    visible: Boolean,
    trigger: ['hover'],
    overlayClassName: '',
    overlayStyle: {},
    defaultVisible: false,
    transitionName: String,
    animation: any,
    align: {},
    placement: 'bottomLeft',
    onClick() {},
    onVisibleChange() {}
  }),

  components: { Trigger },

  compiled () {
    if (!this.visible) {
      this.visible = this.defaultVisible
    }
  },

  methods: {
    _onClick (e) {
      this.visible = true
      this.onClick(e)
    },

    _onVisibleChange (visible) {
      this.visible = visible
      this.onVisibleChange(visible)
    },

    _getPopupDomNode () {
      return this.$els.popup
    },

    _afterVisibleChange (visible) {
      if (visible && this.minOverlayWidthMatchTrigger) {
        const overlayNode = this._getPopupDomNode()
        const rootNode = this.$el
        if (rootNode.offsetWidth > overlayNode.offsetWidth) {
          overlayNode.style.width = rootNode.offsetWidth + 'px'
        }
      }
    }
  }
}

</script>
