<template>
<div>
  <animation
    :show="visible"
    :on-leave="_onAnimateLeave"
    :transition-name="popupTransitionName">
    <align
      key="popup"
      :target="wrap"
      :monitor-window-resize="true"
      :visible="visible"
      :disabled="!visible"
      :align="align"
      :on-align="_onAlign">
      <popup-inner
        :visible="visible"
        :class-name="className"
        :hidden-class-name="hiddenClassName"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
        :style="style">
        <slot></slot>
      </popup-inner>
    </align>
  </animation>
</div>
</template>

<script>
import { defaultProps, contains } from '../../../utils'
import cx from 'classnames'
import Align from '../align'
import Animation from '../animate'
import PopupInner from './PopupInner.vue'

export default {
  props: defaultProps({
    prefixCls: '',
    visible: Boolean,
    align: {},
    style: Object,
    className: '',
    transitionName: '',
    animation: String,
    wrap: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onAnimateLeave: () => {},
    getClassNameFromAlign: () => {}
  }),

  components: { Align, Animation, PopupInner },

  data () {
    return {
      currentAlignClassName: ''
    }
  },

  computed: {
    popupTransitionName () {
      let transitionName = this.transitionName
      if (!transitionName && this.animation) {
        transitionName = `${this.prefixCls}-${this.animation}`
      }
      return transitionName
    },

    popupInnerWrapClasses () {
      const currentAlignClassName =
        this.currentAlignClassName
        || this.getClassNameFromAlign(this.align)

      return cx({
        [`${this.prefixCls}`]: 1,
        [`${this.className}`]: 1,
        [`${currentAlignClassName}`]: 1
      })
    },

    hiddenClassName () {
      return `${this.prefixCls}-hidden`
    }
  },

  watch: {
    visible (val) {
      if (!visible) {
        this.currentAlignClassName = null
      }
    }
  },

  methods: {
    _onAlign (popupDomNode, align) {
      const alignClassName = this.getClassNameFromAlign(this.align)
      const currentAlignClassName = this.getClassNameFromAlign(align)
      if (alignClassName !== currentAlignClassName) {
        this.currentAlignClassName = currentAlignClassName
        popupDomNode.className = this._getClassName(currentAlignClassName)
      }
    },

    _onAnimateLeave () {
      this.onAnimateLeave()
    },


  }
}

</script>
