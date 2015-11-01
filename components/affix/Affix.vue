<template>
<div>
  <div :class="wrapClasses" :style="affixStyle">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { defaultProps, oneOfType } from '../../utils'
import cx from 'classnames'

function getScroll (w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset']
  let method = 'scroll' + (top ? 'Top' : 'Left')
  if (typeof ret !== 'number') {
    let d = w.document;
    //ie6,7,8 standard mode
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      //quirks mode
      ret = d.body[method]
    }
  }
  return ret
}

function getOffset (element) {
  let rect = element.getBoundingClientRect()
  let body = document.body
  let clientTop = element.clientTop || body.clientTop || 0
  let clientLeft = element.clientLeft || body.clientLeft || 0
  let scrollTop = getScroll(window, true)
  let scrollLeft = getScroll(window)

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export default {
  props: defaultProps({
    prefixCls: 'ant-affix',

    className: String,
    offset: oneOfType([Number, String], 0)
  }),

  data () {
    return {
      affix: false,
      affixStyle: {}
    }
  },

  computed: {
    wrapClasses () {
      return cx({
        [this.className]: !!this.className,
        [this.prefixCls]: this.affix
      })
    }
  },

  ready () {
    window.addEventListener('scroll', this._handleScroll, false)
    window.addEventListener('resize', this._handleScroll, false)
  },

  beforeDestory () {
    window.removeEventListener('scorll', this._handleScroll, false)
    window.removeEventListener('resize', this._handleScroll, false)
  },

  methods: {
    _handleScroll () {
      const affix = this.affix
      const scrollTop = getScroll(window, true)
      const elemOffset = getOffset(this.$el)

      if (!affix && (elemOffset.top - this.offset) < scrollTop) {
        this.affix = true
        this.affixStyle = {
          top: this.offset + 'px',
          left: elemOffset.left + 'px',
          width: this.$el.offsetWidth + 'px'
        }
      } else if (affix && (elemOffset.top - this.offset) > scrollTop) {
        this.affix = false
        this.affixStyle = null
      }
    }
  }
}

</script>
