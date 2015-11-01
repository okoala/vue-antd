<template>
<span :class="wrapClassName" :style="style">
  <span :class="prefixCls + '-inner'"></span>
  <input
    :defaultChecked="defaultChecked"
    :class="prefixCls + 'input'"
    :checked="!!checked"
    @change="_handleChange"/>
</span>
</template>

<script>
import cx from 'classnames'
import { defaultProps, oneOfType } from '../../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-checkbox',
    style: {},
    type: 'checkbox',
    className: '',
    checked: oneOfType([Number, Boolean]),
    defaultChecked: oneOfType([Number, Boolean], 0),
    onChange: () => {}
  }),

  computed: {
    wrapClassName () {
      return cx({
        [this.className]: !!this.className,
        [this.prefixCls]: 1,
        [`${this.prefixCls}-checked`]: this.checked,
        [`${this.prefixCls}-checked-${this.checked}`]: !!this.checked,
        [`${this.prefixCls}-disabled`]: this.disabled,
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
      this.onChange(e, this.checked)
    }
  }
}

</script>
