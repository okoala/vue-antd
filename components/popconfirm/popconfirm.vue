<template></template>

<script>
import { defaultProps } from '../../utils'
import Tooltip from '../base/tooltip'
import vIcon from '../iconfont'
import vButton from '../button'

export default {
  props: defaultProps({
    prefixCls: 'ant-popover',
    transitionName: '',
    placement: 'top',
    trigger: 'click',
    overlayStyle: {
      default: function() {return{}}
    },
    onConfirm: () => {},
    onCancel: () => {}
  }),

  components: { Tooltip, vIcon, vButton },

  data () {
    return {
      visible: false
    }
  },

  methods: {
    _confirm () {

    }
  }
}

</script>
