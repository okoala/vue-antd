<template>
  <button type='button' data-role='none' style='display: block' @click='clickHandler' v-bind:class="prevBtnClassName"></button>
</template>

<script>
import classnames from 'classnames'

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
      this.prevClasses = {'slider-prev': true}
    }
  },

  computed: {
    prevBtnClassName: () {
      return classnames(this.prevClasses)
    }
  },

  methods: {
    _clickHandler (e) {
      e.preventDefault()
      this.clickHandler({message: 'previous'}, e)
    },

    compiled () {
      if (!this.infinite && (this.currentSlide === 0 || this.slideCount <= this.slidesToShow)) {
        this.prevClasses['slick-disabled'] = true;
        this.clickHandler = function(){}
      }
    }
  }
}
</script>
