<template>
<div class='slick-track' :style="trackStyle">
  <slot></slot>
</div>
</template>

<script>
import { cx, addStyle, addClass, removeClass, insertBefore, insertAfter, strToObj } from '../../../utils'

const getSlideClasses = function (spec) {
  let slickActive, slickCenter, slickCloned
  let centerOffset, index = spec.index

  slickCloned = (index < 0) || (index >= spec.slideCount)
  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2)
    slickCenter = (spec.currentSlide === index)
    if ((index > spec.currentSlide - centerOffset - 1) && (index <= spec.currentSlide + centerOffset)) {
      slickActive = true
    }
  } else {
    slickActive = (spec.currentSlide <= index) && (index < spec.currentSlide + spec.slidesToShow)
  }

  return cx({
    'slick-slide': true,
    'slick-active': slickActive,
    'slick-center': slickCenter,
    'slick-cloned': slickCloned
  })
}

const getSlideStyle = function (spec) {
  let style = {}

  if (spec.variableWidth === undefined || spec.variableWidth === false) {
    style.width = spec.slideWidth + 'px'
  }

  if (spec.fade) {
    style.position = 'relative'
    style.left = -spec.index * spec.slideWidth + 'px'
    style.opacity = (spec.currentSlide === spec.index) ? 1 : 0
    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase
    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase
  }

  return style
}

export default {
  props: [
    'fade', 'cssEase', 'speed', 'infinite', 'centerMode',
    'currentSlide', 'lazyLoad', 'lazyLoadedList',
    'slideWidth', 'slidesToShow', 'slideCount', 'trackStyle', 'variableWidth'
  ],

  data () {
    return {
      hasPreInit: false,
      hasPostInit: false
    }
  },

  ready () {
    this.children = []

    for (let i = 0; i < this.$el.children.length; i++) {
      this.children.push(this.$el.children[i])
    }

    this.preClone = this.children[0].cloneNode(true)
    this.postClone = this.children[this.children.length - 1].cloneNode(true)
    this.slideCount = this.children.length

    this._mapPropsToChild()

    Object.keys(this.$data).map(item => {
      this.$watch(item, this._mapPropsToChild)
    })
  },

  methods: {
    _mapPropsToChild () {
      this.children.forEach((el, index) => {
        let child
        let key

        if (!this.lazyLoad | (this.lazyLoad && this.lazyLoadedList.indexOf(index) >= 0)) {
          child = el
        } else {
          child = document.createElement('div')
        }
        const childStyle = getSlideStyle(Object.assign({}, this.$data, {index: index}))
        const slickClasses = getSlideClasses(Object.assign({index: index}, this.$data))
        let cssClasses

        removeClass(child, 'slick-active')

        if (child.className) {
          cssClasses = cx(Object.assign(strToObj(slickClasses), strToObj(child.className)))
        } else {
          cssClasses = slickClasses
        }

        child.setAttribute('key', index)
        child.setAttribute('data-index', index)
        addClass(child, cssClasses)
        addStyle(child, childStyle)
      })

      if (this.infinite && this.fade === false) {
        const infiniteCount = this.variableWidth ? this.slidesToShow + 1 : this.slidesToShow
        ;(function() {
          removeClass(this.preClone, 'slick-active')
          const child = this.children[this.slideCount - 1]
          const key = this.slideCount
          this.preClone.setAttribute('key', key)
          this.preClone.setAttribute('data-index', key)

          const childStyle = getSlideStyle(Object.assign({}, this.$data, {index: this.slideCount - 1}))
          addClass(this.preClone, getSlideClasses(Object.assign({index: key}, this)))
          addStyle(this.preClone, childStyle)
          if (!this.hasPreInit) {
            insertAfter(this.preClone, child)
            this.hasPreInit = true
          }
        }.bind(this))()
        ;(function() {
          removeClass(this.postClone, 'slick-active')
          const child = this.children[0]
          const key = -1
          this.postClone.setAttribute('key', key)
          this.postClone.setAttribute('data-index', key)
          const childStyle = getSlideStyle(Object.assign({}, this.$data, {index: 0}))
          addClass(this.postClone, getSlideClasses(Object.assign({index: key}, this)))
          addStyle(this.postClone, childStyle)
          if (!this.hasPostInit) {
            insertBefore(this.postClone, child)
            this.hasPostInit = true
          }
        }.bind(this))()
      }
    }
  }
}
</script>
