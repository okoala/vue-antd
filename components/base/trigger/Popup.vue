<template>
<span></span>
</template>

<script>
import { defaultProps, cx, any, contains } from '../../../utils'
import Align from '../align'
import Animation from '../animate'
import PopupInner from './PopupInner.vue'

const template = `
  <animation
    :show="visible"
    :on-leave="_onAnimateLeave"
    :transition-name="popupTransitionName">
    <align
      :target="wrap"
      :monitor-window-resize="true"
      :visible="visible"
      :disabled="!visible"
      :align="align"
      :watch-props="watchProps"
      :on-align="_onAlign">
      <popup-inner
        :visible="visible"
        :class-name="popupInnerWrapClasses"
        :hidden-class-name="hiddenClassName"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
        :style="style">
        <slot></slot>
      </popup-inner>
    </align>
  </animation>
`

export default {
  props: defaultProps({
    prefixCls: '',
    visible: Boolean,
    wrap: {
      default: function (){
        const self = this
        return function () { return this.$el }
      }
    },
    align: {
      default: function (){ return {} }
    },
    watchProps: any,
    style: Object,
    className: '',
    transitionName: '',
    animation: String,
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

  compiled () {
    const div = document.createElement('div')
    div.innerHTML = template
    this.$compile(div)
    document.body.appendChild(div)
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
      return this._getClassName(this.currentAlignClassName || this.getClassNameFromAlign(this.align))
    },

    hiddenClassName () {
      return `${this.prefixCls}-hidden`
    }
  },

  watch: {
    visible (val) {
      if (!val) {
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

    _getClassName (currentAlignClassName) {
      const { prefixCls } = this
      let className = prefixCls + ' ' + this.className + ' '
      className += currentAlignClassName
      return className
    }
  }
}

</script>
