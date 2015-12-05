<template>
<div :class="wrapClasses">
  <carousel
    :dots="dots"
    :arrows="arrows"
    :effect="effect"
    :fade="fade"
    :autoplay="autoplay"
    :easing="easing"
    :draggable="draggable"
    :vertical="vertical"
    :before-change="beforeChange"
    :after-change="afterChange">
    <slot></slot>
  </carousel>
</div>
</template>

<script>
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = function matchMediaPolyfill() {
    return {
      matches: false,
      addListener: function () {
      },
      removeListener: function () {
      }
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import { defaultProps } from '../../utils'
import cx from 'classnames'
import Carousel from '../base/carousel'

export default {
  props: defaultProps({
    prefixCls: 'ant-carousel',
    dots: true,
    arrows: false,
    effect: 'scrollx',
    fade: false,
    draggable: true,
    vertical: false,
    easing: 'linear',
    autoplay: false,
    beforeChange() {},
    afterChange() {}
  }),

  components: { Carousel },

  watch: {
    effect (value) {
      this._setEffect()
    }
  },

  compiled () {
    this._setEffect()
  },

  computed: {
    wrapClasses () {
      return cx({
        [`${this.prefixCls}`]: 1,
        [`${this.prefixCls}-vertical`]: this.vertical
      })
    }
  },

  methods: {
    _setEffect () {
      if (this.effect === 'fade') {
        this.fade = true
        this.draggable = false
      }
    }
  }
}
</script>
