<template>
<div :class="prefixCls + '-item'">
  <div
    :class="prefixCls + '-header'"
    @click="_handleItemClick"
    role="tab"
    :aria-expanded="isActive">
    <i class="arrow"></i>
    <slot name="header"></slot>
  </div>
  <Animate
    showProp='data-active'
    :exclusive="true"
    :animation="openAnimation">
    <div
      :class="contentCls"
      :data-active="isActive"
      role="tabpanel">
      <div :class="prefixCls + '-content-box'">
        <slot></slot>
      </div>
    </div>
  </Animate>
</div>
</template>

<script>
import cx from 'classnames'
import Animate from './base/animate'
import { defaultProps, oneOfType } from '../utils'

export default {
  props: defaultProps({
    openAnimation: Object,
    prefixCls: String,
    header: oneOfType([String, Number]),
    isActive: false,
    onItemClick: () => {}
  }),
  components: { Animate },
  computed: {
    contentCls () {
      return cx({
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-content-active`]: this.isActive
      })
    }
  }
  methods: {
    _handleItemClick () {
      this.onItemClick()
    }
  }
}

</script>
