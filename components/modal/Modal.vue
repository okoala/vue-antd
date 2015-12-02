<template>
<dialog
  :title="title"
  :prefix-cls="prefixCls"
  :on-close="_handleCancel"
  :visible="visible"
  :style="{'width': width + 'px'}"
  :closable="closable"
  :transition-name="transitionName"
  :mask-animation="maskAnimation"
  :mouse-position="mousePosition">
  <slot></slot>
  <div slot="footer">
    <v-button key="cancel" type="ghost" size="large"
      @click="_handleCancel">
      {{cancelText}}
    </v-button>
    <v-button key="confirm" type="primary" size="large" :loading="confirmLoading"
      @click="_handleOk">
      {{okText}}
    </v-button>
  </div>
</dialog>
</template>

<script>
import { defaultProps, KeyCode } from '../../utils'
import cx from 'classnames'
import Dialog from '../base/dialog'
import vButton from '../button'

export default {
  props: defaultProps({
    visible: false,
    confirmLoading: false,
    title: String,
    width: 520,
    cancelText: '取消',
    okText: '确定',
    onOk: () => {},
    onCancel: () => {},

    closable: true,
    prefixCls: 'ant-modal',
    transitionName: 'zoom',
    maskAnimation: 'fade'
  }),

  data () {
    return {
      mousePosition: {},
      mousePositionEventBinded: null
    }
  },

  components: { Dialog, vButton },

  compiled () {
    // 只有点击事件支持从鼠标位置动画展开
    document.addEventListener('click', (e) => {
      this.mousePosition = {
        x: e.pageX,
        y: e.pageY
      }

      // 20ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => this.mousePosition = {}, 20)
    }, false)

    this.mousePositionEventBinded = true
  },

  methods: {
    _handleCancel () {
      this.onCancel()
    },

    _handleOk () {
      this.confirmLoading = true
      this.onOk()
    }
  }
}
</script>
