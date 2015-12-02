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
    openAnimation: openAnimation,
    onChange() {},
    accordion: false
  }),

  compiled () {
    let { activeKey, accordion, defaultActiveKey } = this
    if (!accordion) {
      defaultActiveKey = defaultActiveKey || [];
    }
    this.activeKey = activeKey || defaultActiveKey

    this._mapPropsToChildComponent()
  },

  methods: {
    _mapPropsToChildComponent () {
      const activeKey = this._getActivityKey()
      const self = this
      const len = this.$children.length - 1
      this.$children.forEach((child, index) => {
        const key = child.key || index
        const header = child.header
        let isActive = false
        if (accordion) {
          isActive = activeKey === key
        } else {
          isActive = activeKey.indexOf(key) > -1
        }
        child.prefixCls = self.prefixCls
        child.openAnimation = self.openAnimation
        child.isActive = isActive
        child.onItemClick = self._handleClickItem(key).bind(this)
      })
    },

    _handleClickItem (key) {
      return () => {
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

        this.onChange(key)
      }
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

export var Panel

</script>
