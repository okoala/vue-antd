<template>
<span :class="wrapClasses" @click="_toggle">
  <span :class="prefixCls + '-inner'">
    <slot v-if="checked" name="checkedChildren"></slot>
    <slot v-if="!checked" name="unCheckedChildren"></slot>
  </span>
</span>
</template>

<script>
import { defaultProps } from '../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-switch',
    style: {},
    className: '',
    disabled: Boolean,
    checked: Boolean,
    defaultChecked: false,
    onChange: () => {}
  }),

  compiled () {
    if (this.checked == null) {
      this.checked = this.defaultChecked
    }
  },

  computed: {
    wrapClasses () {
      return cx({
        [this.className]: !!this.className,
        [this.prefixCls]: true,
        [`${this.prefixCls}-checked`]: this.checked,
        [`${this.prefixCls}-disabled`]: this.disabled
      })
    }
  },

  methods: {
    _toggle () {
      if (this.disabled) return () => {}

      this.checked = !this.checked
      this.onChange(this.checked)
    }
  }
}

</script>
