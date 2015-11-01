import { getTrackCSS, getTrackLeft, getTrackAnimateCSS } from './trackHelper'

export default {
  methods: {
    // Event handler for previous and next
    changeSlide (options) {
      var indexOffset, slideOffset, unevenOffset, targetSlide

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

      this.slideHandler(targetSlide)
    },

    swipeStart (e) {
      var touches, posX, posY;

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

    swipeMove (e) {
      if (!this.dragging) {
        return
      }

      if (this.animating) {
        return
      }

      let swipeLeft
      let curLeft
      let positionOffset
      let touchObject = this.touchObject

      curLeft = getTrackLeft(Object.assign({
        slideIndex: this.currentSlide,
        trackRef: this.refs.track
      }, this, this))

      touchObject.curX = (e.touches) ? e.touches[0].pageX : e.clientX
      touchObject.curY = (e.touches) ? e.touches[0].pageY : e.clientY
      touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)))

      positionOffset = (this.rtl === false ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1)

      var currentSlide = this.currentSlide
      var dotCount = Math.ceil(this.slideCount / this.slidesToScroll)
      var swipeDirection = this.swipeDirection(this.touchObject)
      var touchSwipeLength = touchObject.swipeLength

      if (this.infinite === false) {
        if ((currentSlide === 0 && swipeDirection === 'right') || (currentSlide + 1 >= dotCount && swipeDirection === 'left')) {
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
      this.trackStyle = getTrackCSS(Object.assign({left: swipeLeft}, this, this))

      if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) return
      if (touchObject.swipeLength > 4) {
        e.preventDefault()
      }
    },

    swipeEnd (e) {
      if (!this.dragging) {
        return
      }

      let touchObject = this.touchObject
      let minSwipe = this.listWidth/this.touchThreshold
      let swipeDirection = this.swipeDirection(touchObject)

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
          slideIndex: this.currentSlide,
          trackRef: this.refs.track
        }, this, this));

        this.trackStyle = getTrackAnimateCSS(Object.assign({left: currentLeft}, this, this))
      }
    }
  }
}
