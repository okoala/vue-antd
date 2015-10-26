<template>
<span v-bind:class="ckClassName" v-bind:style="style">
  <span v-bind:class="prefixCls + '-input'"></span>
  <input
    :defaultChecked="!!defaultChecked"
    :class="prefixCls + '-input'"
    :checked="!!checked"
    @change="_handleChange"/>
</span>
</template>

<script>
import { defaultProps } from '../utils'
import classnames from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-checkbox',
    style: {},
    type: 'checkbox',
    className: '',
    checked: 0,
    disabled: false,
    defaultChecked: 0,
    onChange: () => {}
  }),

  computed: {
    ckClassName () {
      return classnames({
        [this.className]: !!this.className,
        [this.prefixCls]: 1,
        [`${this.prefixCls}-checked`]: checked,
        [`${this.prefixCls}-checked-${this.checked}`]: !!this.checked,
        [`${this.prefixCls}-disabled`]: this.disabled
      })
    }
  }

  compiled () {
    this.checked = this.defaultChecked
  },

  methods: {
    _handleChange (e) {
      this.checked = e.target.checked
      this.onChange(e, this.checked)
    }
  }
}

</script>
