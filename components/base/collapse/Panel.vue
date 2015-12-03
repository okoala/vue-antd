<template>
<div role="tab" :class="prefixCls + '-item'">
  <div
    v-el:header
    :class="prefixCls + '-header'"
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
    key: oneOfType([String, Number]),
    prefixCls: String,
    openAnimation: Object,
    header: oneOfType([String, Number]),
    isActive: false,
    onItemClick() {}
  }),

  components: { Animate },

  ready () {
    this._setAriaExpend(this.$els.header, this.isActive)
  },

  watch: {
    isActive (value) {
      this._setAriaExpend(this.$els.header, value)
    }
  },

  computed: {
    contentCls () {
      return cx({
        [`${this.prefixCls}-content`]: 1,
        [`${this.prefixCls}-content-active`]: this.isActive
      })
    }
  },

  methods: {
    _setAriaExpend (el, value) {
      el.setAttribute('aria-expanded', value)
    },

    _handleItemClick () {
      this.onItemClick()
    }
  }
}

</script>
