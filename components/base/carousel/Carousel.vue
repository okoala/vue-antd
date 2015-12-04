<template>
<inner-slider
  :dots="dots">
  <slot></slot>
</inner-slider>
</template>

<script>
import { defaultProps } from '../../../utils'
import InnerSlider from './InnerSlider.vue'
import json2mq from 'json2mq'
import ResponsiveMixins from './mixins/responsive'

export default {
  mixins: [ResponsiveMixins],

  props: defaultProps({
    prefixCls: 'vc-carousel',
    responsive: Array,
    dots: true,
    arrows: false,
    effect: 'scrollx',
    fade: Boolean,
    draggable: Boolean,
    vertical: false,
    easing: 'linear',
    autoplay: true,
    beforeChange() {},
    afterChange() {}
  }),

  components: { InnerSlider },

  data () {
    return {
      breakpoint: null
    }
  },

  ready () {
    if (this.responsive) {
      var breakpoints = this.responsive.map(breakpt => breakpt.breakpoint)
      breakpoints.sort((x, y) => x - y)

      breakpoints.forEach((breakpoint, index) => {
        var bQuery
        if (index === 0) {
          bQuery = json2mq({minWidth: 0, maxWidth: breakpoint})
        } else {
          bQuery = json2mq({minWidth: breakpoints[index-1], maxWidth: breakpoint})
        }
        this.media(bQuery, () => {
          this.breakpoint = breakpoint
        })
      })

      // Register media query for full screen. Need to support resize from small to large
      var query = json2mq({minWidth: breakpoints.slice(-1)[0]})

      this.media(query, () => {
        this.breakpoint = null
      })
    }
  }

}

</script>
