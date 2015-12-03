<template>
<div :class="className">
  <div
    ref='list'
    class="slick-list"
    @mousedown="swipeStart"
    @mousemove="swipeMove"
    @mouseup="swipeEnd"
    @mouseleave="swipeEnd"
    @touchstart="swipeStart"
    @touchmove="swipeMove"
    @touchend="swipeEnd"
    @touchcancel="swipeEnd">
    <track v-rel:track>
      <slot></slot>
    </track>
  </div>
  <button key='0' type='button' data-role='none'
    v-el:previous
    :class="prevClasses"
    :style="{display: 'block'}"
    @click="_prevHandler"> Previous</button>
  <button key='0' type='button' data-role='none'
    v-el:next
    :class="nextClasses"
    :style="{display: 'block'}"
    @click="_nextHandler"> Next</button>
  <ul :class="dotsClass" :style="{display: 'block'}">
    <li v-for="dot in dots" :key="$index" :class="{'slick-active': currentSlide === $index * slidesToScroll}">
      <button @click="clickHandler.bind(this, $index)">{{$index}}</button>
    </li>
  </ul>
</div>

</template>

<script>
import { defaultProps } from '../../../utils'
import cx from 'classnames'
import Track from './Track.vue'

const getDotCount = function (spec) {
  return Math.ceil(spec.slideCount / spec.slidesToScroll)
}

export default {
  props: defaultProps({
    infinite: false,
    currentSlide: 0,
    centerMode: Boolean,
    slideCount: Number,
    slidesToShow: Number,
    clickHandler() {}
  }),

  components: { Track },

  computed: {
    isPrevFinite () {
      return !this.infinite && (this.currentSlide === 0 || this.slideCount <= this.slidesToShow)
    },

    isNextFinite () {
      if (!this.infinite) {
        if (this.centerMode && this.currentSlide >= (this.slideCount - 1)) {
          return true
        } else {
          if (this.currentSlide >= (this.slideCount - this.slidesToShow)) {
            return true
          }
        }
        if (this.slideCount <= this.slidesToShow) {
          return true
        }
      } else {
        return false
      }
    },

    prevClasses () {
      return cx({
        ['slick-prev']: 1,
        ['slick-disabled']: this.isPrevFinite
      })
    },

    nextClasses () {
      return cx({
        ['slick-next']: 1,
        ['slick-disabled']: this.isNextFinite
      })
    },

    dots () {
      const dotCount = Math.ceil(this.slideCount / this.slidesToScroll)
      return Array.apply(null, Array(dotCount + 1).join('0').split(''))
    }
  },

  methods: {
    _clickHandler (options, e) {
      e.preventDefault();
      this.clickHandler(options, e)
    },

    _prevHandler () {
      if (this.isPrevFinite) {
        return
      }
      this.clickHandler.call(this, {message: 'previous'})
    },

    _nextHandler () {
      if (this.isNextFinite) {
        return
      }
      this.clickHandler.call(this, {message: 'next'})
    },

    _dotHandler (e, i) {
      this._clickHandler({
        message: 'dots',
        index: i,
        slidesToScroll: this.slidesToScroll,
        currentSlide: this.currentSlide
      })
    }
  }
}
</script>
