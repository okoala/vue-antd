<template>
<trigger
  :prefix-cls="prefixCls"
  :popup="''"
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
  <span slot="popup" v-el:popup @click="_onClick">
    <slot name="overlay"></slot>
  </span>
  <span slot="trigger"><slot></slot></span>
</trigger>
</template>

<script>
import { defaultProps, oneOfType, any } from '../../../utils'
import Trigger from '../trigger'
import placements from './placements'

function _getOverlayNode (el) {
  const els = el.querySelectorAll('[slot="overlay"]')
  const len = els.length
  if (len) {
    const currentWrap = els[len - 1]
    const children = currentWrap.children
    if (children && children.length === 1) {
      return children[children.length - 1]
    } else {
      return currentWrap
    }
  }
}

export default {
  props: defaultProps({
    minOverlayWidthMatchTrigger: true,
    prefixCls: 'vc-dropdown',
    visible: false,
    trigger: oneOfType([Array, String], 'hover'),
    overlayClassName: '',
    overlayStyle: {},
    defaultVisible: false,
    transitionName: '',
    animation: '',
    align: {
      type: Object,
      default: function (){ return {} }
    },
    placement: 'bottomLeft',
    onClick() {},
    onVisibleChange() {}
  }),

  data () {
    return {
      placements
    }
  },

  components: { Trigger },

  compiled () {
    if (!this.visible) {
      this.visible = this.defaultVisible
    }
  },

  ready () {
    const el = _getOverlayNode(this.$els.popup)
    el.classList.add(this.prefixCls + '-menu')
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
