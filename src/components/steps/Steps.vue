<template>
<div :class="wrapClasses">
  <slot></slot>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
import classnames from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-steps',
    iconPrefix: 'ant',
    size: 'default',
    maxDescriptionWidth: 100,
    direction: '',
    current: 0
  }),

  data () {
    return {
      init: false,
      tailWidth: 0,
      previousStepsWidth: 0,
      itemsWidth: []
    }
  },

  computed: {
    wrapClasses () {
      return classnames({
        [this.prefixCls]: 1,
        [`${this.prefixCls}-small`]: this.size === 'small',
        [`${this.prefixCls}-vertical`]: this.direction === 'vertical'
      })
    }
  },

  ready () {
    if (this.direction === 'vertical') {
      this.maxDescriptionWidth = 'auto'
    }

    const dom = this.$el
    const len = this.$el.children.length - 1
    this.itemsWidth = new Array(len + 1)

    let i = 0
    for (; i <= len - 1; i++) {
      const _item = this.$el.children[i].children
      this.itemsWidth[i] = Math.ceil(_item[0].offsetWidth + _item[1].children[0].offsetWidth)
    }

    this.itemsWidth[i] = Math.ceil(this.$el.children[len].offsetWidth)
    this.previousStepsWidth = Math.floor(this.$el.offsetWidth)
    this._update()

    this.$el.children[len].style.position = 'absolute'

    setTimeout(() => {
      this._resize()
    })

    if (window.attachEvent) {
      window.attachEvent('onresize', this._resize)
    } else {
      window.addEventListener('resize', this._resize)
    }
  },

  beforeDestroy () {
    if (this.direction === 'vertical') {
      return
    }

    if (window.attachEvent) {
      window.attachEvent('onresize', this._resize)
    } else {
      window.removeEventListener('resize', this._resize)
    }
  },

  methods: {
    _resize () {
      const w = Math.floor(this.$el.offsetWidth)
      if (this.previousStepsWidth === w) {
        return
      }
      this.previousStepsWidth = w
      this._update()
    },

    _update () {
      const len = this.$children.length - 1
      let tw = 0
      this.itemsWidth.forEach(w => {
        tw += w
      })

      const dw = Math.floor((this.previousStepsWidth - tw) / len) - 1
      if (dw <= 0) {
        return
      }

      this.init = true
      this.tailWidth = ew
    }
  }
}

</script>
