<template>

</template>

<script>
import { defaultProps } from '../../utils'

let mousePosition
let mousePositionEventBinded

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

    closeable: true,
    prefixCls: 'ant-modal',
    transitionName: 'zoom',
    maskAnimation: 'fade'
  }),

  compiled () {
    // 只有点击事件支持从鼠标位置动画展开
    document.addEventListener('click', (e) => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      }

      // 20ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 20)
    }, false)

    mousePositionEventBinded = true
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

<script>
