<template>
<div :class="wrapClasses">
  <div
    v-el:list
    class="slick-list"
    @mousedown="_swipeStart"
    @mousemove="_swipeMove"
    @mouseup="_swipeEnd"
    @mouseleave="_swipeEnd"
    @touchstart="_swipeStart"
    @touchmove="_swipeMove"
    @touchend="_swipeEnd"
    @touchcancel="_swipeEnd">
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
      }, this.$data))
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
          removeEndEventListener(this.$refs.track.children[currentSlide], callback)
        }

        this.animating = true
        this.currentSlide = targetSlide
          addEndEventListener(this.$refs.track.children[currentSlide], callback)

        if (this.beforeChange) {
          this.beforeChange(this.currentSlide, currentSlide)
        }

        this.autoPlay()
        return
      }

      targetSlide = index;
      if (targetSlide < 0) {
        if(this.infinite === false) {
          currentSlide = 0;
        } else if (this.slideCount % this.slidesToScroll !== 0) {
          currentSlide = this.slideCount - (this.slideCount % this.slidesToScroll);
        } else {
          currentSlide = this.slideCount + targetSlide;
        }
      } else if (targetSlide >= this.slideCount) {
        if(this.infinite === false) {
          currentSlide = this.slideCount - this.slidesToShow;
        } else if (this.slideCount % this.slidesToScroll !== 0) {
          currentSlide = 0;
        } else {
          currentSlide = targetSlide - this.slideCount;
        }
      } else {
        currentSlide = targetSlide;
      }

      targetLeft = getTrackLeft(Object.assign({
        slideIndex: targetSlide,
        trackRef: this.$refs.track
      }, this.$data));

      currentLeft = getTrackLeft(Object.assign({
        slideIndex: currentSlide,
        trackRef: this.$refs.track
      }, this.$data));

      if (this.infinite === false) {
        targetLeft = currentLeft;
      }

      if (this.beforeChange) {
        this.beforeChange(this.currentSlide, currentSlide);
      }

      if (this.lazyLoad) {
        var loaded = true;
        var slidesToLoad = [];
        for (var i = targetSlide; i < targetSlide + this.slidesToShow; i++ ) {
          loaded = loaded && (this.lazyLoadedList.indexOf(i) >= 0);
          if (!loaded) {
            slidesToLoad.push(i);
          }
        }
        if (!loaded) {
          this.lazyLoadedList = this.lazyLoadedList.concat(slidesToLoad)
        }
      }

      // Slide Transition happens here.
      // animated transition happens to target Slide and
      // non - animated transition happens to current Slide
      // If CSS transitions are false, directly go the current slide.

      if (this.useCSS === false) {
        this.currentSlide = currentSlide
        this.trackStyle = getTrackCSS(Object.assign({left: currentLeft}, this.$data))
        if (this.afterChange) {
          this.afterChange(currentSlide);
        }
      } else {

        var nextStateChanges = {
          animating: false,
          currentSlide: currentSlide,
          trackStyle: getTrackCSS(Object.assign({left: currentLeft}, this.$data)),
          swipeLeft: null
        };

        callback = () => {
          this.animating = nextStateChanges.animating
          this.currentSlide = nextStateChanges.currentSlide
          this.trackStyle = nextStateChanges.trackStyle
          this.swipeLeft = nextStateChanges.swipeLeft
          if (this.afterChange) {
            this.afterChange(currentSlide);
          }
          removeEndEventListener(this.$refs.track, callback);
        };

        this.animating = true
        this.currentSlide = targetSlide,
        this.trackStyle = getTrackAnimateCSS(Object.assign({left: targetLeft}, this.$data))
        addEndEventListener(ReactDOM.findDOMNode(this.refs.track), callback)
      }

      this.autoPlay()
    },

    _swipeDirection (touchObject) {
      let xDist, yDist, r, swipeAngle

      xDist = touchObject.startX - touchObject.curX
      yDist = touchObject.startY - touchObject.curY
      r = Math.atan2(yDist, xDist)

      swipeAngle = Math.round(r * 180 / Math.PI)
      if (swipeAngle < 0) {
          swipeAngle = 360 - Math.abs(swipeAngle)
      }
      if ((swipeAngle <= 45) && (swipeAngle >= 0) || (swipeAngle <= 360) && (swipeAngle >= 315)) {
          return left
      }
      if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
          return right
      }

      return 'vertical'
    },

    _autoPlay () {
      const play = () => {
        if (this.mounted) {
          this.slideHandler(this.currentSlide + this.slidesToScroll)
        }
      }
      if (this.autoplay) {
        window.clearTimeout(this.autoPlayTimer)
        this.autoPlayTimer = window.setTimeout(play, this.autoplaySpeed)
      }
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

    },

    _changeSlide (options) {
      let indexOffset, slideOffset, unevenOffset, targetSlide
      unevenOffset = (this.slideCount % this.slidesToScroll !== 0)
      indexOffset = unevenOffset ? 0 : (this.slideCount - this.currentSlide) % this.slidesToScroll

      if (options.message === 'previous') {
        slideOffset = (indexOffset === 0) ? this.slidesToScroll : this.slidesToShow - indexOffset
        targetSlide = this.currentSlide - slideOffset
      } else if (options.message === 'next') {
        slideOffset = (indexOffset === 0) ? this.slidesToScroll : indexOffset
        targetSlide = this.currentSlide + slideOffset
      } else if (options.message === 'dots') {
        // Click on dots
        targetSlide = options.index * options.slidesToScroll
        if (targetSlide === options.currentSlide) {
          return
        }
      }

      this._slideHandler(targetSlide)
    },

    _swipeStart (e) {
      let touches, posX, posY

      if ((this.swipe === false) || ('ontouchend' in document && this.swipe === false)) {
        return
      } else if (this.draggable === false && e.type.indexOf('mouse') !== -1) {
        return
      }
      posX = (e.touches !== undefined) ? e.touches[0].pageX : e.clientX
      posY = (e.touches !== undefined) ? e.touches[0].pageY : e.clientY

      this.dragging = true
      this.touchObject = {
        startX: posX,
        startY: posY,
        curX: posX,
        curY: posY
      }
    },

    _swipeMove (e) {
      if (!this.dragging) {
        return
      }
      if (this.animating) {
        return
      }
      let swipeLeft
      let curLeft, positionOffset
      const touchObject = this.touchObject

      curLeft = getTrackLeft(Object.assign({
        slideIndex: this.currentSlide,
        trackRef: this.$refs.track
      }, this.$data))

      touchObject.curX = (e.touches) ? e.touches[0].pageX : e.clientX
      touchObject.curY = (e.touches) ? e.touches[0].pageY : e.clientY
      touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)))

      positionOffset = -1 * (touchObject.curX > touchObject.startX ? 1 : -1)

      var currentSlide = this.currentSlide
      var dotCount = Math.ceil(this.slideCount / this.slidesToScroll)
      var swipeDirection = this.swipeDirection(this.touchObject)
      var touchSwipeLength = touchObject.swipeLength

      if (this.infinite === false) {
        if ((currentSlide === 0 &&
          swipeDirection === 'right') ||
          (currentSlide + 1 >= dotCount && swipeDirection === 'left')) {
          touchSwipeLength = touchObject.swipeLength * this.edgeFriction

          if (this.edgeDragged === false && this.edgeEvent) {
            this.edgeEvent(swipeDirection)
            this.edgeDragged = true
          }
        }
      }

      if (this.swiped === false && this.swipeEvent) {
        this.swipeEvent(swipeDirection)
        this.swiped = true
      }

      swipeLeft = curLeft + touchSwipeLength * positionOffset
      this.touchObject = touchObject
      this.swipeLeft = swipeLeft
      this.trackStyle = getTrackCSS(Object.assign({left: swipeLeft}, this.$data))

      if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8){
        return
      }
      if (touchObject.swipeLength > 4) {
        e.preventDefault()
      }
    },

    _swipeEnd (e) {
      if (!this.dragging) {
        return
      }
      const touchObject = this.touchObject
      const minSwipe = this.listWidth/this.touchThreshold
      const swipeDirection = this.swipeDirection(touchObject)

      // reset the state of touch related state variables.
      this.dragging = false
      this.edgeDragged = false
      this.swiped = false
      this.swipeLeft = null
      this.touchObject = {}
      // Fix for #13
      if (!touchObject.swipeLength) {
        return
      }
      if (touchObject.swipeLength > minSwipe) {
        e.preventDefault()
        if (swipeDirection === 'left') {
          this.slideHandler(this.currentSlide + this.slidesToScroll)
        } else if (swipeDirection === 'right') {
          this.slideHandler(this.currentSlide - this.slidesToScroll)
        } else {
          this.slideHandler(this.currentSlide)
        }
      } else {
        // Adjust the track back to it's original position.
        var currentLeft = getTrackLeft(Object.assign({
          slideIndex: this.state.currentSlide,
          trackRef: this.$refs.track
        }, this.$data))

        this.trackStyle = getTrackAnimateCSS(Object.assign({left: currentLeft}, this.$data))
      }
    }
  }
}
</script>
