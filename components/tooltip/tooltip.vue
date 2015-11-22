<template>
<tooltip
  :transition-name="transitionName"
  :overlay="title"
  :visible="visible"
  :on-visible-change="_onVisibleChange">
  <span slot="trigger"><slot></slot></span>
</tooltip>
</template>

<script>
import { defaultProps, any } from '../../utils'
import Tooltip from '../base/tooltip'

const transitionNameMap =

export default {
  props: defaultProps({
    prefixCls: 'ant-tooltip',
    placement: 'top',
    title: any,
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1
  }),

  components: { Tooltip },

  data () {
    return {
      visible: false
    }
  },

  computed: {
    transitionName () {
      return ({
        top: 'zoom-down',
        bottom: 'zoom-up',
        left: 'zoom-right',
        right: 'zoom-left',
        topLeft: 'zoom-down',
        bottomLeft: 'zoom-up',
        leftTop: 'zoom-right',
        rightTop: 'zoom-left',
        topRight: 'zoom-down',
        bottomRight: 'zoom-up',
        leftBottom: 'zoom-right',
        rightBottom: 'zoom-left'
      })[this.placement]
    }
  },

  watch () {
    title (val) {
      if (!val) {
        this.visible = false
      }
    }
  }

  compiled () {
    if (!this.title) {
      this.visible = false
    }
  },

  methods: {
    _onVisibleChange (visible) {
      this.visible = visible
    }
  }
}

</script>
