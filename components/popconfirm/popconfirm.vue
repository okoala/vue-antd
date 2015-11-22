<template>
<tooltip
  :prefix-cls="prefixCls"
  :placement="placement"
  :on-visible-change="_onVisibleChange"
  :transition-name="'ant-trigger-popup-zoom'"
  :visible="visible"
  :trigger="trigger">
  <div slot="tooltip">
    <div :class="prefixCls + '-content'">
      <p :class="prefixCls + '-message'">
        <v-icon type="exclamation-circle"></v-icon>
        {{title}}
      </p>

      <div :class="prefixCls + '-buttons'">
        <v-button @click="_cancel" type="ghost" size="small">取消</v-button>
        <v-button @click="_confirm" type="primary" size="small">确定</v-button>
      </div>
    </div>
  </div>
  <span slot="trigger"><slot></slot></span>
</tooltip>
</template>

<script>
import { defaultProps } from '../../utils'
import Tooltip from '../base/tooltip'
import vIcon from '../iconfont'
import vButton from '../button'

export default {
  props: defaultProps({
    prefixCls: 'ant-popover',
    title: '',
    transitionName: '',
    placement: 'top',
    trigger: {
      default: function() {return ['click']}
    },
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

  computed: {
    transitionName () {
      return ({
        top: 'zoom-down',
        bottom: 'zoom-up',
        left: 'zoom-right',
        right: 'zoom-left',
        topLeft: 'zoom-down',
        bottomLeft: 'zoom-up',
        leftTop: 'zoom-right',
        rightTop: 'zoom-left',
        topRight: 'zoom-down',
        bottomRight: 'zoom-up',
        leftBottom: 'zoom-right',
        rightBottom: 'zoom-left'
      })[this.placement]
    }
  },

  methods: {
    _confirm () {
      this.onConfirm()
      this.visible = false
    },

    _cancel () {
      this.onCancel()
      this.visible = false
    },

    _onVisibleChange (value) {
      this.visible = value
    }
  }
}

</script>
