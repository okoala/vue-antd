<template>
<div :class="wrapClasses">
  <div
    v-el:list
    class="slick-list"
    @mousedown="swipeStart"
    @mousemove="swipeMove"
    @mouseup="swipeEnd"
    @mouseleave="swipeEnd"
    @touchstart="swipeStart"
    @touchmove="swipeMove"
    @touchend="swipeEnd"
    @touchcancel="swipeEnd">
    <track v-rel:track
      :fade="fade"
      :css-ease="cssEase"
      :speed="speed"
      :infinite="infinite"
      :centermode="centerMode"
      :currentslide="currentSlide"
      :lazy-load="lazyLoad"
      :lazy-loaded-list="lazyLoadedList"
      :slide-width="slideWidth"
      :slides-to-show="slidesToShow"
      :slide-count="slideCount"
      :track-style="trackStyle"
      :variable-width="variableWidth">
      <slot></slot>
    </track>
  </div>
  <button key='0' type='button' data-role='none'
    v-if="arrows"
    v-el:previous
    :class="prevClasses"
    :style="{display: 'block'}"
    @click="_prevHandler"> Previous</button>
  <button key='0' type='button' data-role='none'
    v-if="arrows"
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
import { defaultProps, cx, addEndEventListener, removeEndEventListener } from '../../../utils'
import Track from './Track.vue'
import { getTrackCSS, getTrackLeft, getTrackAnimateCSS } from './helpers/track'

const getDotCount = function (spec) {
  return Math.ceil(spec.slideCount / spec.slidesToScroll)
}

export default {
  props: defaultProps({
    className: '',
    adaptiveHeight: false,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    centerMode: false,
    centerPadding: '50px',
    cssEase: 'ease',
    dots: false,
    dotsClass: 'slick-dots',
    idraggable: true,
    easing: 'linear',
    edgeFriction: 0.35,
    fade: false,
    focusOnSelect: false,
    infinite: true,
    initialSlide: 0,
    lazyLoad: false,
    responsive: null,
    rtl: false,
    slide: 'div',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    swipe: true,
    swipeToSlide: false,
    touchMove: true,
    touchThreshold: 5,
    useCSS: true,
    variableWidth: false,
    vertical: false,
    afterChange: null,
    beforeChange: null,
    edgeEvent: null,
    swipeEvent: null,
    clickHandler() {},
    init() {}
  }),

  components: { Track },

  data () {
    return {
      animating: false,
      dragging: false,
      autoPlayTimer: null,
      currentDirection: 0,
      currentLeft: null,
      currentSlide: 0,
      direction: 1,
      slideCount: null,
      slideWidth: null,
      swipeLeft: null,
      touchObject: {
        startX: 0,
        startY: 0,
        curX: 0,
        curY: 0
      },
      lazyLoadedList: [],
      mounted: false,
      initialized: false,
      edgeDragged: false,
      swiped: false,
      trackStyle: {},
      trackWidth: 0
    }
  },

  computed: {
    wrapClasses () {
      return cx({
        ['slick-initialized']: 1,
        ['slick-slider']: 1,
        [`${this.className}`]: !!this.className
      })
    },

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

  compiled () {
    if (this.init) {
      this.init()
    }
  },

  ready () {
    this.children = this.$refs.track.children
    this.mounted = true
    this.initialize()
    this.adaptHeight()
    if (window.addEventListener) {
      window.addEventListener('resize', this._onWindowResized)
    } else {
      window.attachEvent('onresize', this._onWindowResized)
    }
    const lazyLoadedList = []
    for (var i = 0; i < this.children.length; i++) {
      if (i >= this.currentSlide && i < this.currentSlide + this.slidesToShow) {
        lazyLoadedList.push(i);
      }
    }

    if (this.lazyLoad && this.lazyLoadedList.length === 0) {
      this.lazyLoadedList = lazyLoadedList
    }
  },

  beforeDestory () {
    if (window.addEventListener) {
      window.removeEventListener('resize', this._onWindowResized)
    } else {
      window.detachEvent('onresize', this._onWindowResized)
    }
    if (this.autoPlayTimer) {
      window.clearTimeout(this.autoPlayTimer)
    }
  },

  methods: {
    _initialize () {
      const slideCount = this.children.length
      const listWidth = this.getWidth(ReactDOM.findDOMNode(this.$els.list))
      const trackWidth = this.getWidth(ReactDOM.findDOMNode(this.$refs.track))
      const slideWidth = this.getWidth(ReactDOM.findDOMNode(this))/this.slidesToShow

      const currentSlide = this.rtl ? slideCount - 1 - this.initialSlide : this.initialSlide

      this.slideCount = slideCount
      this.slideWidth = slideWidth
      this.listWidth = listWidth
      this.trackWidth = trackWidth
      this.currentSlide = currentSlide

      const targetLeft = getTrackLeft(Object.assign({
        slideIndex: this.currentSlide,
        trackRef: this.$refs.track
      }, this))
      // getCSS function needs previously set state
      const trackStyle = getTrackCSS(Object.assign({left: targetLeft}, this))

      this.trackStyle = trackStyle
      this.autoPlay() // once we're set up, trigger the initial autoplay.
    },

    _getWidth (elem) {
      return elem.getBoundingClientRect().width || elem.offsetWidth
    },

    _adaptHeight () {
      if (this.adaptiveHeight) {
        const selector = '[data-index="' + this.currentSlide +'"]'
        if (this.$els.list) {
          const slickList = this.$els.list
          slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';
        }
      }
    },

    _slideHandler (index) {
      // Functionality of animateSlide and postSlide is merged into this function
      // console.log('slideHandler', index);
      let targetSlide, currentSlide
      let targetLeft, currentLeft
      let callback

      if (this.currentSlide === index) {
        return;
      }

      if (this.fade) {
        currentSlide = this.currentSlide;

        //  Shifting targetSlide back into the range
        if (index < 0) {
          targetSlide = index + this.slideCount;
        } else if (index >= this.slideCount) {
          targetSlide = index - this.slideCount;
        } else {
          targetSlide = index;
        }

        if (this.lazyLoad && this.lazyLoadedList.indexOf(targetSlide) < 0) {
          this.lazyLoadedList = this.lazyLoadedList.concat(targetSlide)
        }

        callback = () => {
          this.animating = false
          if (this.afterChange) {
            this.afterChange(currentSlide)
          }
          removeEndEventListener(ReactDOM.findDOMNode(this.refs.track).children[currentSlide], callback)
        }

        this.setState({
          animating: true,
          currentSlide: targetSlide
        }, function () {
          addEndEventListener(ReactDOM.findDOMNode(this.refs.track).children[currentSlide], callback)
        });

        if (this.beforeChange) {
          this.beforeChange(this.state.currentSlide, currentSlide)
        }

        this.autoPlay()
        return
      }

      targetSlide = index;
      if (targetSlide < 0) {
        if(this.props.infinite === false) {
          currentSlide = 0;
        } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
          currentSlide = this.state.slideCount - (this.state.slideCount % this.props.slidesToScroll);
        } else {
          currentSlide = this.state.slideCount + targetSlide;
        }
      } else if (targetSlide >= this.state.slideCount) {
        if(this.props.infinite === false) {
          currentSlide = this.state.slideCount - this.props.slidesToShow;
        } else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
          currentSlide = 0;
        } else {
          currentSlide = targetSlide - this.state.slideCount;
        }
      } else {
        currentSlide = targetSlide;
      }

      targetLeft = getTrackLeft(assign({
        slideIndex: targetSlide,
        trackRef: this.refs.track
      }, this.props, this.state));

      currentLeft = getTrackLeft(assign({
        slideIndex: currentSlide,
        trackRef: this.refs.track
      }, this.props, this.state));

      if (this.props.infinite === false) {
        targetLeft = currentLeft;
      }

      if (this.props.beforeChange) {
        this.props.beforeChange(this.state.currentSlide, currentSlide);
      }

      if (this.props.lazyLoad) {
        var loaded = true;
        var slidesToLoad = [];
        for (var i = targetSlide; i < targetSlide + this.props.slidesToShow; i++ ) {
          loaded = loaded && (this.state.lazyLoadedList.indexOf(i) >= 0);
          if (!loaded) {
            slidesToLoad.push(i);
          }
        }
        if (!loaded) {
          this.setState({
            lazyLoadedList: this.state.lazyLoadedList.concat(slidesToLoad)
          });
        }
      }

      // Slide Transition happens here.
      // animated transition happens to target Slide and
      // non - animated transition happens to current Slide
      // If CSS transitions are false, directly go the current slide.

      if (this.props.useCSS === false) {

        this.setState({
          currentSlide: currentSlide,
          trackStyle: getTrackCSS(assign({left: currentLeft}, this.props, this.state))
        }, function () {
          if (this.props.afterChange) {
            this.props.afterChange(currentSlide);
          }
        });

      } else {

        var nextStateChanges = {
          animating: false,
          currentSlide: currentSlide,
          trackStyle: getTrackCSS(assign({left: currentLeft}, this.props, this.state)),
          swipeLeft: null
        };

        callback = () => {
          this.setState(nextStateChanges);
          if (this.props.afterChange) {
            this.props.afterChange(currentSlide);
          }
          ReactTransitionEvents.removeEndEventListener(ReactDOM.findDOMNode(this.refs.track), callback);
        };

        this.setState({
          animating: true,
          currentSlide: targetSlide,
          trackStyle: getTrackAnimateCSS(assign({left: targetLeft}, this.props, this.state))
        }, function () {
          ReactTransitionEvents.addEndEventListener(ReactDOM.findDOMNode(this.refs.track), callback);
        });

      }

      this.autoPlay();
    },

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
    },

    _onWindowResized (e) {

    }
  }
}
</script>
