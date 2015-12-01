<template lang="md">
# Dialog

---

## 组件演示

<demo>
  <example title="简单使用">
    <div>
      <p>
        <v-button type="primary" @click="_onClick">show dialog</v-button>
        &nbsp;
        <label>destroy on close:
        <input type="checkbox"
          :checked="destroyOnClose"
          :on-change="_onDestroyOnCloseChange"/></label>
      </p>
      <dialog title="第二个弹框" animation="zoom" mask-animation="fade"
        :style="{'width': width + 'px'}"
        :visible="visible"
        :align="align"
        :on-close="_onClose"
        :mouse-position="mousePosition">
        <input />
        <p>basic modal</p>
        <button @click="_changeWidth">change width</button>
        <div :style="{height: 200}"></div>
      </dialog>
    </div>
  </example>
</demo>

</template>

<script>
import Dialog from '../../components/base/dialog'
import vButton from '../../components/button'

export default {
  data () {
    return {
      visible: false,
      width: 600,
      align: {
        points: ['tc', 'tc'],
        offset: [0, 100]
      },
      mousePosition: {},
      destroyOnClose: false
    }
  },

  components: { Dialog, vButton },

  methods: {
    _onClick (e) {
      this.mousePosition = {
        x: e.pageX,
        y: e.pageY
      }
      this.visible = true
    },

    _onDestroyOnCloseChange (e) {
      this.destroyOnClose = e.target.checked
    },

    _onClose () {
      this.visible = false
    },

    _changeWidth () {
      this.width = this.width === 600 ? 800 : 600
      this.align = Object.assign({}, this.align)
    }
  }
}
</script>

<style>
.vc-dialog {
  outline: none;
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: 1000;
}
.vc-dialog-hidden {
  display: none;
}
.vc-dialog-title {
  margin: 0;
  font-size: 14px;
  line-height: 21px;
  font-weight: bold;
}
.vc-dialog-content {
  position: relative;
  background-color: #ffffff;
  border: none;
  border-radius: 6px 6px;
  background-clip: padding-box;
  outline: 0;
}
.vc-dialog-close {
  cursor: pointer;
  outline: none;
  font-size: 21px;
  position: absolute;
  right: 20px;
  top: 12px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
  text-decoration: none;
}
.vc-dialog-close-x:after {
  content: '×';
}
.vc-dialog-close:hover {
  opacity: 1;
  filter: alpha(opacity=100);
  text-decoration: none;
}
.vc-dialog-header {
  padding: 13px 20px 14px 20px;
  border-radius: 5px 5px 0 0;
  background: #fff;
  color: #666;
  border-bottom: 1px solid #e9e9e9;
}
.vc-dialog-body {
  padding: 20px;
}
.vc-dialog-footer {
  border-top: 1px solid #e9e9e9;
  padding: 10px 20px 10px 10px;
  text-align: right;
  border-radius: 0 0 5px 5px;
}
.vc-dialog-zoom-enter,
.vc-dialog-zoom-appear {
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  animation-play-state: paused;
}
.vc-dialog-zoom-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
  animation-play-state: paused;
}
.vc-dialog-zoom-enter.vc-dialog-zoom-enter-active,
.vc-dialog-zoom-appear.vc-dialog-zoom-appear-active {
  animation-name: vcDialogZoomIn;
  animation-play-state: running;
}
.vc-dialog-zoom-leave.vc-dialog-zoom-leave-active {
  animation-name: vcDialogZoomOut;
  animation-play-state: running;
}

@keyframes vcDialogZoomIn {
  0% {
    opacity: 0;
    transform: scale(0, 0);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

@keyframes vcDialogZoomOut {
  0% {
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform: scale(0, 0);
  }
}
.vc-dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #373737;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
  z-index: 1000;
  filter: alpha(opacity=50);
}
.vc-dialog-mask-hidden {
  display: none;
}
.vc-dialog-fade-enter,
.vc-dialog-fade-appear {
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.vc-dialog-fade-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.vc-dialog-fade-enter.vc-dialog-fade-enter-active,
.vc-dialog-fade-appear.vc-dialog-fade-appear-active {
  animation-name: vcDialogFadeIn;
  animation-play-state: running;
}
.vc-dialog-fade-leave.vc-dialog-fade-leave-active {
  animation-name: vcDialogFadeOut;
  animation-play-state: running;
}
@keyframes vcDialogFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes vcDialogFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
