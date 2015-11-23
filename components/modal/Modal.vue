<template>
<div :class="wrapClasses" v-el:dialog>

</div>
</template>

<script>
import { defaultProps, KeyCode } from '../../utils'
import cx from 'classnames'

let mousePosition
let mousePositionEventBinded

function getScroll(w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset']
  const method = 'scroll' + (top ? 'Top' : 'Left')

  if (typeof ret !== 'number') {
    const d = w.document
    ret = d.documentElement[method]

    if (typeof ret !== 'number') {
      ret = d.body[method]
    }
  }

  return ret
}

function setTransformOrigin(node, value) {
  const style = node.style

  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix)=> {
    style[`${prefix}TransformOrigin`] = value
  })

  style[`transformOrigin`] = value
}

function offset(el) {
  const rect = el.getBoundingClientRect()
  const doc = el.ownerDocument
  const w = doc.defaultView || doc.parentWindow
  const pos = {
    left: rect.left,
    top: rect.top,
  }

  pos.left += getScroll(w)
  pos.top += getScroll(w, 1)

  return pos
}

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

  computed: {
    wrapClasses () {
      return cx({
        [`${this.prefixCls}-wrap`]: 1,
        [`${this.prefixCls}-wrap-hidden`]: !this.visible
      })
    }
  },

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
    _close () {

    },

    _handleCancel () {
      this.onCancel()
    },

    _handleOk () {
      this.confirmLoading = true
      this.onOk()
    },

    _onMaskClick () {
      if (this.closeable) {
        this._close()
      }

      this.$els.dialog.focus()
    }

    // _onKeyDown (e) {
    //   if (this.closeable) {
    //     if (e.KeyCode === KeyCode.ESC) {
    //       this._close()
    //     }
    //   }

    //   // keep focus inside dialog
    //   if (this.visible) {
    //     if (e.keyCode === KeyCode.TAB) {
    //       const activeElement = document.activeElement
    //       const dialogRoot = this.$els.dialog
    //       const sentinel = this.refs.sentinel

    //       if (e.shiftKey) {
    //         if (activeElement === dialogRoot) {
    //           sentinel.focus()
    //         }
    //       } else if (activeElement === this.refs.sentinel) {
    //         dialogRoot.focus()
    //       }
    //     }
    //   }
    // }
  }
}
</script>
