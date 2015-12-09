<template>
<li
  role: 'menuitem'
  :style="style"
  :title="title"
  :class="wrapClasses"
  v-bind="{'aria-selected': selected, 'aria-disabled': disabled}"
  @click="_onClick"
  @mouseleave="_onMouseLeave"
  @mouseenter="_onMouseEnter">
  <slot></slot>
</li>
</template>

<script>
import { defaultProps, cx, KeyCode } from '../../../utils'

export default {
  props: defaultProps({
    rootPrefixCls: '',
    className: '',
    eventKey: '',
    active: Boolean,
    selected: Boolean,
    disabled: Boolean,
    title: '',
    mode: '',
    inlineIndent: Number,
    level: Number,
    onSelect () {},
    onClick () {},
    onDeselect () {},
    onItemHover () {},
    onDestory () {}
  }),

  computed: {
    prefixCls () {
      return this.rootPrefixCls + '-item'
    },

    style () {
      let res = {}
      if (this.mode === 'inline') {
        res.paddingLeft = this.inlineIndent * this.level + 'px'
      }
      return res
    },

    wrapClasses () {
      return cx({
        [`${this.prefixCls}`]: 1,
        [`${this.prefixCls}-active`]: !this.disabled && this.active,
        [`${this.prefixCls}-selected`]: this.selected,
        [`${this.prefixCls}-disabled`]: this.disabled,
        [`${this.className}`]: !!this.className
      })
    }
  },

  methods: {
    _onClick (e) {
      if (!this.disabled) {
        this.onClick(e)
      }
    },

    _onMouseLeave (e) {
      if (!this.disabled) {
        this.onMouseLeave(e)
      }
    },

    _onMouseEnter (e) {
      if (!this.disabled) {
        this.onMouseEnter(e)
      }
    }
  }
}
</script>
