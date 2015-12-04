<template>
<div class='slick-track' :style="trackStyle">
  <slot></slot>
</div>
</template>

<script>
import { addStyle } from '../../../utils'
import cx from 'classnames'

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
    style.width = spec.slideWidth
  }

  if (spec.fade) {
    style.position = 'relative'
    style.left = -spec.index * spec.slideWidth
    style.opacity = (spec.currentSlide === spec.index) ? 1 : 0
    style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase
    style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase
  }

  return style
}

export default {
  ready () {
    this._mapPropsToChild()
  },

  methods: {
    _mapPropsToChild () {
      const $children = this.$el.children;
      const preClone = $children[0].cloneNode(true)
      const postClone = $children[$children.length - 1].cloneNode(true)

      [...$children].forEach((el, index) => {
        if (!this.lazyLoad | (this.lazyLoad && this.lazyLoadedList.indexOf(index) >= 0)) {
          child = elem;
        } else {
          child = document.createElement('div')
        }
        const childStyle = getSlideStyle(Object.assign({}, this, {index: index}))
        const slickClasses = getSlideClasses(Object.assign({index: index}, this))
        let cssClasses

        if (child.classList) {
          cssClasses = cx(slickClasses, child.classList)
        } else {
          cssClasses = slickClasses
        }

        child.setAttribute('key', index)
        child.setAttribute('data-index', index)
        child.setAttribute('class', cssClasses)
        addStyle('child', childStyle)
      })
    }
  }
}

</script>
