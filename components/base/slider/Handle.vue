<template>
<tooltip v-if="!noTip"
  placement="top"
  :prefix-cls="className.replace('slider-handle', 'tooltip')"
  :visible="isTooltipVisible"
  :watch-props="offset"
  :transition-name="tipTransitionName">
  <span slot="tooltip">{{tipValue}}</span>
  <div
    :class="className"
    :style="{left: offset + '%'}"
    @mouseup="_showTooltip"
    @mouseenter="_showTooltip"
    @mouseleave="_hideTooltip"></div>
</tooltip>
<div v-if="noTip"
  :class="className"
  :style="{left: offset + '%'}"
  @mouseup="_showTooltip"
  @mouseenter="_showTooltip"
  @mouseleave="_hideTooltip"></div>
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

  computed: {
    tipValue () {
      return this.tipFormatter ? this.tipFormatter(this.value) : this.value
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
