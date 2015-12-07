<template>
<popup
  :style="popupStyle"
  :prefix-cls="prefixCls"
  :visible="popupVisible"
  :class-name="popupClassName"
  :action="action"
  :wrap="_getTriggerTarget.bind($parent)"
  :align="_popupAlign"
  :watch-props="watchProps"
  :animation="popupAnimation"
  :on-animation-leave="onAnimateLeave"
  :on-mouse-enter="_onMouseEnter"
  :on-mouse-leave="_onMouseLeave"
  :transition-name="popupTransitionName"
  :get-class-name-from-align="_getPopupClassNameFromAlign">
  <slot name="popup"></slot>
</popup>
<slot name="trigger"></slot>
</template>

<script>
import { defaultProps, cx, any, oneOfType, contains, slotMixin } from '../../../utils'
import Popup from './Popup.vue'
import { getAlignFromPlacement, getPopupClassNameFromAlign } from './utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-trigger-popup',
    watchProps: any,
    popup: String,
    popupStyle: {
      default: function (){ return {} }
    },
    popupAlign: {
      default: function (){ return {} }
    },
    popupAnimation: '',
    popupPlacement: String,
    popupClassName: '',
    popupVisible: false,
    popupTransitionName: '',
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0.1,
    destoryPopupOnHide: false,
    defaultPopupVisible: true,
    builtinPlacements: Object,
    action: oneOfType([Array, String]),
    getPopupClassNameFromAlign: () => '',
    onPopupVisibleChange: () => {},
    afterPopupVisibleChange: () => {}
  }),

  mixins: [slotMixin],

  components: { Popup },

  computed: {
    _popupAlign () {
      const {popupPlacement, popupAlign, builtinPlacements} = this
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign)
      }
      return popupAlign
    }
  },

  methods: {
    isClickAction () {
      if (this.action.indexOf('click') !== -1) {
        return true
      }
      return false
    },

    isHoverAction () {
      if (this.action.indexOf('hover') !== -1) {
        return true
      }
      return false
    },

    isFocusAction () {
      if (this.action.indexOf('focus') !== -1) {
        return true
      }
      return false
    },

    _getPopupClassNameFromAlign (align) {
      const className = []
      const {popupPlacement, builtinPlacements, prefixCls} = this
      if (popupPlacement && builtinPlacements) {
        className.push(getPopupClassNameFromAlign(builtinPlacements, prefixCls, align))
      }
      if (this.getPopupClassNameFromAlign) {
        className.push(this.getPopupClassNameFromAlign(align))
      }
      return className.join(' ')
    },

    _onClick (e) {
      if (this.isClickAction()) {
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

    _onMouseDown (e) {
      if (this.isClickAction()) {
        this.preClickTime = Date.now()
      }
    },

    _onTouchStart (e) {
      if (this.isClickAction()) {
        this.preTouchTime = Date.now()
      }
    },

    _onMouseEnter (e) {
      if (this.isHoverAction()) {
        this._delaySetPopupVisible(true, this.mouseEnterDelay)
      }
    },

    _onMouseLeave (e) {
      if (this.isHoverAction()) {
        this._delaySetPopupVisible(false, this.mouseLeaveDelay)
      }
    },

    _onFocus (e) {
      if (this.isFocusAction()) {
        this.focusTime = Date.now()
        this._setPopupVisible(true)
      }
    },

    _onBlur (e) {
      if (this.isFocusAction()) {
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
          this._setPopupVisible(visible)
          this.delayTimer = null
        }, delay)
      } else {
        this._setPopupVisible(visible)
      }
    }
  }
}

</script>
