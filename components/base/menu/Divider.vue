<template>
<li :class="className"></li>
</template>

<script>
import defaultProps from '../../../utils'

export default {
  props: defaultProps({
    rootPrefixCls: '',
    className: '',
    disabled: true
  }),

  compiled () {
    this.className += ' ' + `${this.rootPrefixCls}-item-divider`
  },

  methods: {

  }
}

</script>
