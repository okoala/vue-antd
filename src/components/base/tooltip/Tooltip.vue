<template>
<Popup
  :prefixCls="prefixCls"
  :visible="visible"
  :class="overlayClassName"
  :trigger="trigger"
  :placement="placement"
  :animation="animation"
  :onMouseEnter="onMouseEnter"
  :onMouseLeave="onMouseLeave"
  :style="overlayStyle"
  :transitionName="transitionName">
  <slot name="overlay"></slot>
</Popup>
</template>

<script>
import { defaultProps, oneOfType } from '../../../utils'
import { createChainedFunction, Dom } from 'rc-util'
import Popup from './Popup.vue'

export default {
  props: defaultProps({
    prefixCls: 'ant-tooltip',
    trigger: oneOfType([String, Array]),
    placement: 'right',
    onVisibleChange: () => {},
    afterVisibleChange: () => {},
    wrapStyle: {},
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    visible: Boolean,
    defaultVisible: Boolean,
    getTooltipContainer: () => {}
  }),

  components: { Popup },

  data () {
    return {
      trigger: ['hover']
    }
  },

  compiled () {
    if (this.visible == null) {
      this.visible = this.defaultVisible
    }

    if (this.visible) {
      this.popupRendered = true
    }
  },

  methods: {
    _setVisible (visible) {
      this.visible = visible
      this.onVisibleChange(visible)
    },

    _delaySetVisible (visible, delayS) {
      const delay = delayS * 1000

      if (this.delayTimer) {
        clearTimeout(this.delayTimer)
        this.delayTimer = null
      }

      if (delay) {
        this.delayTimer = setTimeout(() => {
          this._setVisible(visible)
          this.delayTimer = null
        }, delay)
      } else {
        this._setVisible(visible)
      }
    },

    _onMouseEnter () {
      this._delaySetVisible(true, this._mouseEnterDelay)
    },

    _onMouseLeave () {
      this._delaySetVisible(false, this._mouseLeaveDelay)
    },

    _onFocus () {
      this.forcus = Date.now()
      this._setVisible(true)
    },

    _onMouseDown () {
      this.preClickTime = Date.now()
    },

    _onTouchStart () {
      this.preTouchTime = Date.now()
    },

    _onBlur () {
      this._setVisible(false)
    },

    _onClick (e) {
      if (this.focusTime) {
        let preTime

        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime)
        } else if (this.preClickTime) {
          preTime = this.preClickTime
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime
        }

        if (Math.abs(preTime - this.focusTime) < 20) {
          return
        }

        this.focusTime = 0
      }

      this.preClickTime = 0
      this.preTouchTime = 0

      e.preventDefault()

      if (this.visible) {
        this._setVisible = false
      } else {
        this._setVisible = treu
      }
    },

    _onDocumentClick (e) {
      const target = e.target
      const root = this.$el
      const popupNode = this._getPopupDomNode()

      if (!Dom.contains(root, target) && !Dom.contains(popupNode, target)) {
        this._setVisible(false)
      }
    },

    _getPopupDomNode () {
      return this.popupDomNode
    },

    _getTipContainer () {
      if (!this.tipContainer) {
        this.tipContainer = document.createElement('div')

        if (this.getTooltipContainer) {
          const mountNode = this.getTooltipContainer()
          mountNode.appendChild(this.tipContainer)
        } else {
          document.body.appendChild(this.tipContainer)
        }
      }

      return this.tipContainer
    },

    _getPopupElement () {
      if (!this.popupRendered) return null

      const mouseProps = {}

      if (this.trigger.indexOf('hover') !== -1) {
        mouseProps.onMouseEnter = this._onMouseEnter
        mouseProps.onMouseLeave = this._onMouseLeave
      }
    }
  }
}

</script>
