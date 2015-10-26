<template>
<label :class="wrapClassName">
  <span :class="radioClassName" style="style">
    <span :class="prefixCls + '-inner'"></span>
    <input
      type="radio"
      :disabled="disabled"
      :checked="!!checked"
      :class="prefixCls + '-input'"
      @change="_handleChange">
  </span>
  <slot><span>Radio</span></slot>
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
      let classString = this.className

      if (classString) {
        classString += this.checked ? (' ' + classString + '-checked') : ''
      }

      return classString
    },

    radioClassName () {
      return classnames({
        [this.className]: !!this.className,
        [this.prefixCls]: true,
        [`${this.prefixCls}-checked`]: this.checked,
        [`${this.prefixCls}-checked-${this.checked}`]: !!this.checked,
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
      this.checked = checked ? 1 : 0
      this.onChange(this.checked)
    }
  }
}

</script>
