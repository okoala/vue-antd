<template>
<ul v-bind:class="dotsClass" v-bind:style="{display: 'block'}">
  <li v-for="item in dotArray" v-bind:class="{'slick-active': currentSlide === $index * slidesToScroll}">
    <button
      @click="clickHandler.bind(this, {
        message: 'dots',
        index: i,
        slidesToScroll: slidesToScroll,
        currentSlide: currentSlide})"
    ></button>
  </li>
</ul>
</template>

<script>
import cx from 'classnames'

const getDotCount = (spec) => {
  let dots
  dots = Math.ceil(spec.slideCount / spec.slidesToScroll)

  return dots
}

export default {
  props: {
    dotsClass: String,
    slidesCount: Number,
    slidesToScroll: Boolean,
    clickHandler: {
      type: Function,
      default: function() {}
    }
  }

  computed: {
    dotCount () {
      return getDotCount({
        slidesCount: this.slidesCount,
        slidesToScroll: this.slidesToScroll
      })
    },

    dotArray () {
      return Array.apply(null, Array(this.dotCount + 1).join('0').split(''))
    }
  }

  methods: {
    _clickHandler (options, e) {
      e.preventDefault()
      this.clickHandler(options)
    }
  }

}

</script>
