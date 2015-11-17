<template>
<label :class="wrapClasses">
  <span :class="ckClasses" :style="style">
    <span :class="prefixCls + '-inner'"></span>
    <input
      type="checkbox"
      :disabled="disabled"
      :defaultChecked="!!defaultChecked"
      :value="value"
      :class="prefixCls + '-input'"
      :checked="!!checked"
      @change="_handleChange"/>
  </span>
  <slot></slot>
</label>
</template>

<script>
import { defaultProps, any } from '../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-checkbox',
    style: {},
    value: any,
    type: 'checkbox',
    className: '',
    disabled: false,
    checked: Boolean,
    defaultChecked: false,
    onChange: () => {}
  }),

  computed: {
    wrapClasses () {
      return cx({
        [this.className]: !!this.className,
        [`${this.className}-checked`]: this.checked
      })
    },

    ckClasses () {
      return cx({
        [this.className]: !!this.className,
        [this.prefixCls]: 1,
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
      this.checked = e.target.checked
      this.onChange(e)
    }
  }
}

</script>
