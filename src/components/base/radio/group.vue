<template>
<div :class="prefixCls">
  <slot></slot>
</div>
</template>

<script>
import Radio from './radio.vue'
import { defaultProps } from '../../../utils'

function getCheckedValue (children) {
  let checkValue = null

  children.forEach(radio => {
    if (radio.checked) {
      checkedValue = radio.value
    }
  })

  return checkedValue
}

export default {
  props: defaultProps({
    value: String,
    defaultValue: String,
    prefixCls: 'ant-radio-group',
    onChange: () => {}
  }),

  components: { Radio },

  methods: {
    compiled () {
      this.value = this.value || this.defaultValue || getCheckedValue(this.$children)
    },

    _onRadioChange (e) {
      this.value = e.target.value
      this.onChange(e)
    }
  }
}

</script>
