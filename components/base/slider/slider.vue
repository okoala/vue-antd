<template>
<div>

</div>
</template>

<script>
import enquire from 'enquire.js'
import json2mp from 'json2mp'

export default {
  props: {
    adaptiveHeight: {
      type: Boolean,
      default: false
    },
    arrows: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplaySpeed: {
      type: Number,
      default: 3000
    },
    centerMode: {
      type: Boolean,
      default: false
    },
    centerPadding: {
      type: String,
      default: '50px'
    },
    cssEase: {
      type: String,
      default: 'ease'
    },
    dots: {
      type: Boolean,
      default: true
    },
    dotsClass: {
      type: String,
      default: 'slick-dots'
    },
    draggable: {
      type: Boolean,
      default: true
    },
    easing: {
      type: String,
      default: 'linear'
    },
    edgeFriction: {
      type: Number,
      default: 0.35
    },
    fade: {
      type: Boolean,
      default: false
    },
    focusOnSelect: {
      type: Boolean,
      default: false
    },
    infinite: {
      type: Boolean,
      default: true
    },
    initialSlide: {
      type: Number,
      default: 0
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    responsive: Array,
    rtl: {
      type: Boolean,
      default: false
    },
    slide: {
      type: String,
      default: 'div'
    },
    slidesToShow: {
      type: Number,
      default: 1
    },
    slidesToScroll: {
      type: Number,
      default: 1
    },
    speed: {
      type: Number,
      default: 500
    },
    swipe: {
      type: Boolean,
      default: true
    },
    swipeToSlide: {
      type: Boolean,
      default: false
    },
    touchMove: {
      type: Boolean,
      default: true
    },
    touchThreshold: {
      type: Number,
      default: 5
    },
    useCSS: {
      type: Boolean,
      default: true
    },
    variableWidth: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    afterChange: Function,
    beforeChange: Function,
    edgeEvent: Function,
    init: Function,
    swipeEvent: Function,
    nextArrow: Function,
    prevArrow: Function
  },

  data () {
    return {
      className: 'ant-carousel',
      breakpoint: null
    }
  },

  compiled () {
    if (this.effect === 'fade') {
      this.fade = true,
      this.draggable = false
    }

    if (this.vertical) {
      this.className += ' ant-carousel-vertical'
    }
  },

  methods: {
    _media (query, handler) {
      query = json2mq(query);

      if (typeof handler === 'function') {
        handler = {
          match: handler
        }
      }

      enquire.register(query, handler)

      // Queue the handlers to unregister them at unmount
      if (! this._responsiveMediaHandlers) {
        this._responsiveMediaHandlers = []
      }

      this._responsiveMediaHandlers.push({query: query, handler: handler})
    },

    ready () {
      if (this.responsive) {
        var breakpoints = this.responsive.map(breakpt => breakpt.breakpoint);
        breakpoints.sort((x, y) => x - y)

        breakpoints.forEach((breakpoint, index) => {
          var bQuery;
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
        var query = json2mq({minWidth: breakpoints.slice(-1)[0]});

        this.media(query, () => {
          this.breakpoint = null
        });
      }
    }

    beforeDestroy () {
      if (this._responsiveMediaHandlers) {
        this._responsiveMediaHandlers.forEach(obj => {
          enquire.unregister(obj.query, obj.handler)
        })
      }
    }
  }
}
</script>
