<template>
<div class='slick-track'>
  <slot></slot>
</div>
</template>

<script>
import { cx, addStyle, addClass, insertBefore, insertAfter, strToObj } from '../../../utils'

const getSlideClasses = function (spec) {
  let slickActive, slickCenter, slickCloned
  let centerOffset, index

  if (spec.rtl) {
    index = spec.slideCount - 1 - spec.index
  } else {
    index = spec.index
  }

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

  ready () {
    this.children = this.$el.children
    this.preClone = this.children[0].cloneNode(true)
    this.postClone = this.children[this.children.length - 1].cloneNode(true)

    this._mapPropsToChild()

    Object.keys(this.$data).map(item => {
      this.$watch(item, this._mapPropsToChild)
    })
  },

  methods: {
    _mapPropsToChild () {
      let key
      const count = this.children.length

      ;[...this.children].forEach((el, index) => {
        let child

        if (!this.lazyLoad | (this.lazyLoad && this.lazyLoadedList.indexOf(index) >= 0)) {
          child = el
        } else {
          child = document.createElement('div')
        }
        const childStyle = getSlideStyle(Object.assign({}, this.$data, {index: index}))
        const slickClasses = getSlideClasses(Object.assign({index: index}, this.$data))
        let cssClasses

        if (child.className) {
          cssClasses = cx(slickClasses, strToObj(child.className))
        } else {
          cssClasses = slickClasses
        }

        child.setAttribute('key', index)
        child.setAttribute('data-index', index)
        addClass(child, cssClasses)
        addStyle(child, childStyle)

        if (this.infinite && this.fade === false) {
          const infiniteCount = this.variableWidth ? this.slidesToShow + 1 : this.slidesToShow
          if (index >= (count - infiniteCount)) {
            key = -(count - index)
            this.preClone.setAttribute('key', key)
            this.preClone.setAttribute('data-index', key)
            addClass(this.preClone, getSlideClasses(Object.assign({index: key}, this)))
            addStyle(this.preClone, childStyle)
            insertBefore(this.preClone, child)
          }
          if (index < infiniteCount) {
            key = count + index
            this.postClone.setAttribute('key', key)
            this.postClone.setAttribute('data-index', key)
            addClass(this.postClone, getSlideClasses(Object.assign({index: key}, this)))
            addStyle(this.postClone, childStyle)
            insertAfter(this.postClone, child)
          }
        }
      })
    }
  }
}
</script>
