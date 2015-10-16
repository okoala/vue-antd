<template>
<label>
  <Checkbox ref="checkbox"></Checkbox>
  <slot></slot>
</label>
</template>

<script>
import Checkbox from '../checkbox'
import defaultProps from '../../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-radio',
    type: 'radio',
    checked: Boolean,
    className: 'ant-radio-button'
  }),

  components: { Checkbox },

  computed: {
    wrapClassName () {
      let classString = this.className

      if (classString) {
        classString += this.checked ? (' ' + classString + '-checked') : ''
      }

      return classString
    }
  }
}

</script>
