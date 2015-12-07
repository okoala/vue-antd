<template>
<tooltip v-if="!noTip"
  :prefix-cls="className.replace('slider-handle', 'tooltip')"
  :placement="top"
  :visible="isTooltipVisible"
  :delay="0"
  :transition-name="tipTransitionName">
  <span name="overlay">{{tipFormatter ? tipFormatter(value) : value}}</span>
  <div
    :class="className"
    :style="{left: offset + '%'}"
    :@mouseup="_showTooltip"
    :@mouseenter="_showTooltip"
    :@mouseleave="_hideTooltip"></div>
</tooltip>
<div v-if="noTip"
  :class="className"
  :style="{left: offset + '%'}"
  :@mouseup="_showTooltip"
  :@mouseenter="_showTooltip"
  :@mouseleave="_hideTooltip"></div>
</template>

<script>
import { cx } from '../../../utils'
import Tooltip from '../tooltip'

export default {
  props: ['className', 'offset', 'tipTransitionName',
    'tipFormatter', 'value', 'dragging', 'noTip'],

  components: { Tooltip },

  data () {
    return {
      isTooltipVisible: false
    }
  },

  methods: {
    _showTooltip () {
      this.isTooltipVisible = true
    },

    _hideTooltip () {
      this.isTooltipVisible = false
    }
  }
}
</script>
