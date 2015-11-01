<template>
<div :class="prefixCls">

</div>
</template>

<script>
import defaultProps from '../utils'
import Panel from './collapse.panel.vue'
import { openAnimation, oneOfType } from '../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-collapse',
    activeKey: oneOfType([String, Array]),
    defaultActiveKey: oneOfType([String, Array]),
    openAnimation: openAnimation,
    onChange: () => {},
    accordion: false
  }),

  methods: {
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
    },

    _getItems () {
      const activeKey = this._getActivityKey()

    }
  }
}

export var Panel

</script>
