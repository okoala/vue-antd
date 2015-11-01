<template>
<div :class="wrapClasses">
  <slot></slot>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
import cx from 'classnames'

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
      return cx({
        [this.prefixCls]: 1,
        [`${this.prefixCls}-small`]: this.size === 'small',
        [`${this.prefixCls}-vertical`]: this.direction === 'vertical'
      })
    }
  },

  compiled () {
    // console.log(this.$children)
  },

  ready () {
    const self = this

    if (this.direction === 'vertical') {
      this.maxDescriptionWidth = 'auto'
    }

    this._mapPropsToChildComponent(true)

    // 延迟执行，一边子组件可能更新完props的状态。
    setTimeout(() => {
      this._handleTailWidth()
    }, 30)
  },

  watch: {
    current () {
      this._mapPropsToChildComponent()
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
    _mapPropsToChildComponent (isInit) {
      const self = this
      const len = this.$children.length - 1
      this.$children.forEach((child, index) => {
        child.stepNumber = (index + 1).toString()
        child.stepLast = index === len
        // child.tailWidth = (self.itemsWidth.length === 0 || index === len) ? 'auto' : self.itemsWidth[index] + self.tailWidth + 'px'
        child.prefixCls = self.prefixCls
        child.maxDescriptionWidth = self.maxDescriptionWidth
        child.iconPrefix = self.iconPrefix

        // 如果是初始化状态且已经存在了status，这样就不需要根据current来设置status了
        if (isInit && child.status) {
          return
        }

        if (index === self.current) {
          child.status = 'process'
        } else if (index < self.current) {
          child.status = 'finish'
        } else {
          child.status = 'wait'
        }
      })
    },

    _handleTailWidth () {
      if (this.direction === 'vertical') {
        return
      }

      const self = this
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

      // 算出tailWidth, 动态更新子组件
      this.$children.forEach((child, index) => {
        child.tailWidth = (self.itemsWidth.length === 0 || index === len) ? 'auto' : self.itemsWidth[index] + self.tailWidth + 'px'
      })
    },

    _bindResize () {
      setTimeout(() => {
        this._resize()
      })

      if (window.attachEvent) {
        window.attachEvent('onresize', this._resize)
      } else {
        window.addEventListener('resize', this._resize)
      }
    },

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
      this.tailWidth = dw
    }
  }
}

</script>
