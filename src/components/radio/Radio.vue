<template>
<label :class="wrapClassName">
  <span :class="radioClassName">
    <span :class="prefixCls + '-inner'"></span>
    <input
      type="radio"
      :disabled="disabled"
      :value="value"
      :checked="!!checked"
      :class="prefixCls + '-input'"
      @change="_handleChange">
  </span>
  <slot>Radio</slot>
</label>
</template>

<script>
import { defaultProps } from '../../utils'
import classnames from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-radio',

    checked: Boolean,
    defaultChecked: false,
    value: String,
    onChange: () => {},

    disabled: Boolean,

    style: {},
    className: ''
  }),

  computed: {
    wrapClassName () {
      return classnames({
        [this.className]: !!this.className,
        [`${this.className}-checked`]: this.checked
      })
    },

    radioClassName () {
      return classnames({
        [this.className]: !!this.className,
        [this.prefixCls]: true,
        [`${this.prefixCls}-checked`]: this.checked,
        [`${this.prefixCls}-checked-${this.checked ? 1 : 0}`]: !!this.checked,
        [`${this.prefixCls}-disabled`]: this.disabled
      })
    }
  },

  compiled () {
    if (this.checked == null) {
      this.checked = this.defaultChecked
    }
  },

  methods: {
    _handleChange (e) {
      const checked = e.target.checked
      this.onChange(e)
    }
  }
}

</script>

<style>
label.ant-radio-button > .ant-radio {
  display: none
}

</style>
