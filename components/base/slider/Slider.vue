<template>
<div :class="sliderClasses"
     @touchstart="_onTouchStart"
     @mousedown="_onMouseDown">
  <handle
    :class="prefixCls + '-handle'"
    :no-tip="isNoTip"
    :tip-transition-name="tipTransitionName"
    :tip-formatter="tipFormatter"
    :offset="upperOffset"
    :value="upperBound"
    :dragging="handle === 'upperBound'"></handle>
  <handle
    v-if="range"
    :class="prefixCls + '-handle'"
    :no-tip="isNoTip"
    :tip-transition-name="tipTransitionName"
    :tip-formatter="tipFormatter"
    :offset="lowerOffset"
    :value="lowerBound"
    :dragging="handle === 'lowerBound'"></handle>
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
    :included="isIncluded"
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

  compile () {
    const {range, min, max} = this.$data
    const initialValue = range ? [min, min] : min
    const defaultValue = this.defaultValue != null ? this.defaultValue : initialValue
    const value = this.value != null ? this.value : defaultValue)

    let upperBound
    let lowerBound
    if (this.range) {
      lowerBound = this._trimAlignValue(value[0])
      upperBound = this._trimAlignValue(value[1])
    } else {
      upperBound = this._trimAlignValue(value)
    }

    let recent;
    if (this.range && upperBound === lowerBound) {
      if (lowerBound === max) {
        recent = 'lowerBound'
      }
      if (upperBound === min) {
        recent = 'upperBound'
      }
    } else {
      recent = 'upperBound'
    }

    this.handle = null,
    this.recent = recent,
    this.upperBound = upperBound,
    this.lowerBound = (lowerBound || min)
  },

  computed: {
    sliderClasses () {
      return cx({
        [this.prefixCls]: true,
        [this.prefixCls + '-disabled']: this.disabled,
        [this.className]: !!this.className
      })
    },

    isNoTip () {
      return (this.step === null) && !this.tipFormatter
    },

    upperOffset () {
      return this._calcOffset(this.upperBound)
    },

    lowerOffset () {
      return this._calcOffset(this.lowerBound)
    }
  },

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
    },

    addDocumentEvents (type) {
      if (type === 'touch') {
        // just work for chrome iOS Safari and Android Browser
        this.onTouchMoveListener = DomUtils.addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
        this.onTouchUpListener = DomUtils.addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
      } else if (type === 'mouse') {
        this.onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
        this.onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
      }
    }

    _removeEvents (type) {
      if (type === 'touch') {
        this.onTouchMoveListener.remove();
        this.onTouchUpListener.remove();
      } else if (type === 'mouse') {
        this.onMouseMoveListener.remove();
        this.onMouseUpListener.remove();
      }
    }

    _end (type) {
      this._removeEvents(type);
      this.onAfterChange(this._getValue())
      this.handle = null
    }
  }
}

</script>
