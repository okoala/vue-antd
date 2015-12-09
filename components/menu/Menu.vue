<template>
<menu
  :theme="theme"
  :mode="mode"
  :selected-keys="selectedKeys"
  :default-selected-keys="defaultSelectedKeys"
  :open-keys="openKeys"
  :default-open-keys="defaultOpenKeys"
  :style="style"
  :on-click="_handleClick"
  :on-open="_handleOpenKeys"
  :on-close="_handleCloseKeys"
  :on-select="onSelect"
  :on-deselect="onDeselect"
  :class-name="className + ' ' + prefixCls + '-' + theme">
  <slot></slot>
</menu>
</template>

<script>
import { defaultProps, oneOf } from '../../utils'
import Menu from '../base/menu'

export default {
  props: defaultProps({
    theme: oneOf(['light', 'dark'], 'light'),
    mode: oneOf(['vertical', 'horizontal', 'inline'], 'vertical'),
    selectedKeys: Array,
    defaultSelectedKeys: Array,
    openKeys: Array,
    defaultOpenKeys: Array,
    style: Object,
    onClick () {},
    onSelect () {},
    onDeselect () {}
  }),

  components: { Menu },

  methods: {
    _handleClick (e) {
      this.openKeys = []
      this.onClick()
    },

    _handleOpenKeys (e) {
      this.openKeys = e.openKeys
      this.onOpen()
    },

    _handleCloseKeys (e) {
      this.openKeys = e.openKeys
      this.onClose()
    }
  }
}
</script>
