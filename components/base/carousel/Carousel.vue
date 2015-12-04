<template>
<inner-slider
  :dots="dots"
  :arrows="arrows"
  :fade="fade"
  :autoplay="autoplay"
  :easing="easing"
  :draggable="draggable"
  :vertical="vertical"
  :before-change="beforeChange"
  :after-change="afterChange">
  <slot></slot>
</inner-slider>
</template>

<script>
import props from './props'
import InnerSlider from './InnerSlider.vue'
import json2mq from 'json2mq'
import ResponsiveMixin from './mixins/responsive'

export default {
  mixins: [ResponsiveMixin],

  props: props,

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
