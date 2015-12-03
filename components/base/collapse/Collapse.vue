<template>
<div :class="prefixCls">
  <slot></slot>
</div>
</template>

<script>
import { defaultProps, oneOfType } from '../../../utils'
import Panel from './Panel.vue'
import openAnimation from './openAnimation'

export default {
  props: defaultProps({
    prefixCls: 'ant-collapse',
    activeKey: oneOfType([String, Array]),
    defaultActiveKey: oneOfType([String, Array]),
    openAnimation: Object,
    onChange() {},
    accordion: false
  }),

  compiled () {
    let { activeKey, accordion, defaultActiveKey } = this
    if (!accordion) {
      defaultActiveKey = defaultActiveKey || [];
    }
    this.activeKey = activeKey || defaultActiveKey

    if (!this.openAnimation) {
      this.openAnimation = openAnimation
    }
  },

  ready () {
    this._mapPropsToChildComponent()
  },

  methods: {
    _mapPropsToChildComponent () {
      const activeKey = this._getActivityKey()
      const self = this
      const $children = this.$el.querySelectorAll('[role="tab"]');
      [...$children].forEach(($child, index) => {
        const child = $child.__vue__
        const key = child.key || index
        const header = child.header
        let isActive = false
        if (self.accordion) {
          isActive = activeKey === key
        } else {
          isActive = activeKey.indexOf(key) > -1
        }
        child.prefixCls = self.prefixCls
        child.openAnimation = self.openAnimation
        child.isActive = isActive
        child.onItemClick = self._handleClickItem.bind(this, key)
      })
    },

    _setChildAcitve () {
      const activeKey = this._getActivityKey()
      const self = this
      const $children = this.$el.querySelectorAll('[role="tab"]');
      [...$children].forEach(($child, index) => {
        const child = $child.__vue__
        const key = child.key || index
        let isActive = false
        if (self.accordion) {
          isActive = activeKey === key
        } else {
          isActive = activeKey.indexOf(key) > -1
        }
        child.isActive = isActive
      })
    },

    _handleClickItem (key, e) {
      const activeKey = this._getActivityKey()

      if (this.accordion) {
        this.activeKey = key === activeKey ? null : key
      } else {
        const index = activeKey.indexOf(key)
        const isActive = index > -1

        if (isActive) activeKey.splice(index, 1)
        else activeKey.push(key)

        this.activeKey = activeKey
      }
      this._setChildAcitve()
      this.onChange(key)
    },

    _getActivityKey () {
      let activeKey = this.activeKey
      const accordion = this.accordion

      if (accordion && Array.isArray(activeKey)) {
        activeKey = activeKey[0]
      }

      if (!accordion && !Array.isArray(activeKey)) {
        activeKey = activeKey ? [activeKey] : []
      }

      return activeKey
    }
  }
}
</script>
