<template>
<div :class="prefixCls + '-item'">
  <div role="tab"
    :class="prefixCls + '-header'"
    :aria-expanded="isActive"
    @click="_handleItemClick">
    <i class="arrow"></i>
    {{{header}}}
  </div>
  <animate
    :show="isActive"
    :exclusive="true"
    :animation="openAnimation">
    <div
      :class="contentCls"
      role="tabpanel">
      <div :class="prefixCls + '-content-box'">
        <slot></slot>
      </div>
    </div>
  </animate>
</div>
</template>

<script>
import { defaultProps, oneOfType } from '../../../utils'
import cx from 'classnames'
import Animate from '../animate'

export default {
  props: defaultProps({
    prefixCls: String,
    openAnimation: Object,
    header: oneOfType([String, Number]),
    isActive: false,
    onItemClick() {}
  }),

  components: { Animate },

  computed: {
    contentCls () {
      return cx({
        [`${this.prefixCls}-content`]: 1,
        [`${this.prefixCls}-content-active`]: this.isActive
      })
    }
  },

  methods: {
    _handleItemClick () {
      this.onItemClick()
    }
  }
}

</script>
