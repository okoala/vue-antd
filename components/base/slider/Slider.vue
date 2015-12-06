<template>
<div :class="sliderClasses"
     @touchstart="_onTouchStart"
     @mousedown="_onMouseDown">
  <track
    :class="prefixCls + '-track'"
    :included="isIncluded"
    :offset="lowerOffset"
    :length="upperOffset - lowerOffset"></track>
  <dots
    :prefix-cls="prefixCls"
    :marks="marks"
    :dots="dots"
    :step="step"
    :included="isIncluded"
    :lower-bound="lowerBound"
    :upper-bound="upperBound"
    :max="max"
    :min="min"></dots>
  <marks
    :class="prefixCls + '-mark'"
    :marks="marks"
    :ncluded="isIncluded"
    :lower-bound="lowerBound"
    :upper-bound="upperBound"
    :max="max"
    :min="min"></marks>
  <slot></slot>
</div>
</template>

<script>
import { defaultProps, cx, oneOfType } from '../../../utils'
import Track from './Track.vue'
import Handle from './Handle.vue'
import Dots from './Dots.vue'
import Marks from './Marks.vue'

export default {
  props: defaultProps({
    prefixCls: 'vc-slider',
    className: '',
    tipTransitionName: '',
    min: 0,
    max: 100,
    step: 1,
    value: oneOfType([Number, Array]),
    defaultValue: oneOfType([Number, Array]),
    marks: {},
    included: true,
    disabled: false,
    dots: false,
    range: false,
    tipTransitionName: String,
    tipFormatter () {},
    onBeforeChange () {},
    onChange () {},
    onAfterChange () {}
  }),

  components: { Track, Handle, Dots, Marks },

  methods: {
    _isNotTouchEvent (e) {
      return e.touches.length > 1 ||
        (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)
    },

    _getTouchPosition (e) {
      return e.touches[0].pageX
    },

    _getMousePosition (e) {
      return e.pageX
    },

    _onTouchStart (e) {
      if (this.disabled) {
        return
      }
    },

    _onMouseDown (e) {
      if (this.disabled) {
        return
      }
    }
  }
}

</script>
