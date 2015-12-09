<template>
<li
  role: 'menuitem'
  :style="style"
  :title="title"
  :class="wrapClasses"
  v-bind="{'aria-selected': selected, 'aria-disabled': disabled}"
  @click="_onClick"
  @keydown="_onKeyDown"
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
    multiple: Boolean,
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

  beforeDestory () {
    if (this.onDestory) {
      this.onDestory(this.eventKey)
    }
  },

  methods: {
    _onClick (e) {
      if (!this.disabled) {
        const eventKey = this.eventKey
        const info = {
          key: eventKey,
          keyPath: [eventKey],
          item: this,
          domEvent: e
        }
        this.onClick(info)
        if (this.multiple) {
          if (this.selected) {
            this.onDeselect(info)
          } else {
            this.onSelect(info)
          }
        } else if (!this.selected) {
          this.onSelect(info)
        }
      }
    },

    _onKeyDown (e) {
      const keyCode = e.keyCode
      if (keyCode === KeyCode.ENTER) {
        this._onClick(e)
        return true
      }
    },

    _onMouseLeave (e) {
      if (!this.disabled) {
        const eventKey = this.eventKey
        const info = {
          key: eventKey,
          item: this,
          hover: true,
          trigger: 'mouseleave'
        }
        this.onItemHover(info)
      }
    },

    _onMouseEnter (e) {
      if (!this.disabled) {
        const eventKey = this.eventKey
        const info = {
          key: eventKey,
          item: this,
          hover: true,
          trigger: 'mouseenter'
        }
        this.onItemHover(e)
      }
    }
  }
}
</script>
