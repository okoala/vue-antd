<template>
<div
  @blur="_onBlur"
  @click="_onClick"
  @focus="_onFocus"
  @mousedown="_onMouseDown"
  @mouseenter="_onMouseEnter"
  @mouseleave="_onMouseLeave"
  @touchstart="_onTouchStart">
  <popup
    v-if="popupRendered"
    :style="popupStyle"
    :prefixCls="prefixCls"
    :visible="popupVisible"
    :class-name="popupClassName"
    :action="action"
    :animation="popupAnimation"
    :on-animation-Leave="onAnimateLeave"
    :on-mouse-enter="_onMouseEnter"
    :on-mouse-leave="_onMouseLeave"
    :transition-name="popupTransitionName">
    <slot></slot>
    </popup>
  <slot v-if="!popupRendered"></slot>
</div>
</template>

<script>
import { defaultProps, contains } from '../../../utils'
import cx from 'classnames'
import Popup from './Popup.vue'
import { getAlignFromPlacement, getPopupClassNameFromAlign } from './utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-trigger-popup',
    // getPopupClassNameFromAlign: returnEmptyString,
    onPopupVisibleChange: () => {},
    afterPopupVisibleChange: () => {},
    popupClassName: '',
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    popupStyle: {},
    destroyPopupOnHide: false,
    popupAlign: {},
    defaultPopupVisible: false,
    action: []
  }),

  components: { Popup },

  computed: {
    isClickAction () {
      if (this.action.indexOf('click') === -1) {
        return false
      }
      return true
    },

    isHoverAction () {
      if (this.action.indexOf('hover') !== -1) {
        return false
      }
      return true
    },

    isFocusAction () {
      if (this.action.indexOf('focus') !== -1) {
        return false
      }
      return true
    }
  }

  methods: {
    _onClick (e) {
      if (this.isClickAction) {
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
        event.preventDefault()
        this._setPopupVisible(!this.popupVisible)
      }
    },

    _oMouseDown (e) {
      if (this.isClickAction) {
        this.preClickTime = Date.now()
      }
    },

    _onTouchStart (e) {
      if (this.isClickAction) {
        this.preTouchTime = Date.now()
      }
    },

    _onMouseEnter (e) {
      if (this.isHoverAction) {
        this._delaySetPopupVisible(true, this.mouseEnterDelay)
      }
    },

    _onMouseLeave (e) {
      if (this.isHoverAction) {
        this._delaySetPopupVisible(false, this.mouseLeaveDelay)
      }
    },

    _onFocus (e) {
      if (this.isFocusAction) {
        this.focusTime = Date.now()
        this._setPopupVisible(true)
      }
    },

    _onBlur (e) {
      if (this.isFocusAction) {
        this._setPopupVisible(false)
      }
    },

    _onAnimateLeave () {
      if (this.destoryPopupOnHide) {
        // todo
      }
    },

    _onDocumentClick (e) {
      const target = e.target
      const root = this.$el
      const popupNode = this.$els.popup
      if (!contains(root, target) && !contains(popupNode, target)) {
        this._setPopupVisible(false)
      }
    },

    _getPopupDomNode () {
      return this.popupDomNode
    },

    _getPopupContainer () {
      if (!this.popupContainer) {
        this.popupContainer = document.createElement('div')
        document.body.appendChild(this.popupContainer)
      }
      return this.popupContainer
    },

    _setPopupVisible (popupVisible) {
      if (this.popupVisible !== popupVisible) {
        this.popupVisible = popupVisible
      }
      this.onPopupVisibleChange(popupVisible)
    },

    _delaySetPopupVisible (visible, delayS) {
      const delay = delayS * 1000
      if (this.delayTimer) {
        clearTimeout(this.delayTimer)
        this.delayTimer = null
      }
      if (delay) {
        this.delayTimer = setTimeout(() => {
          this.setPopupVisible(visible)
          this.delayTimer = null
        }, delay)
      } else {
        this.setPopupVisible(visible)
      }
    }
  }
}

</script>
