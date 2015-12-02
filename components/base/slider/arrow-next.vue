<template>
  <button type='button' data-role='none' style='display: block' @click='clickHandler' v-bind:class="nextBtnClassName"></button>
</template>

<script>
import cx from 'classnames'

export default {
  props: {
    className: String,
    infinite: Boolean,
    currentSlide: Number,
    slideCount: Number,
    slidesToShow: Boolean,
    clickHandler: {
      type: Function,
      default: function() {}
    }
  },

  data () {
    return {
      this.nextClasses = {'slider-next': true}
    }
  },

  computed: {
    nextBtnClassName () {
      return classnames(this.prevClasses)
    }
  },

  compiled () {
    if (!this.infinite) {
      if (this.centerMode && this.currentSlide >= (this.slideCount - 1)) {
        this.nextClasses['slick-disabled'] = true
        this.clickHandler = function(){}
      } else {
        if (this.currentSlide >= (this.slideCount - this.slidesToShow)) {
          this.nextClasses['slick-disabled'] = true
          this.clickHandler = function(){}
        }
      }

      if (this.slideCount <= this.slidesToShow) {
        this.nextClasses['slick-disabled'] = true
        this.clickHandler = function(){}
      }
    }
  },

  methods: {
    _clickHandler (e) {
      e.preventDefault()
      this.clickHandler({message: 'next'}, e)
    }
  }
}
</script>
