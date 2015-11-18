<template lang="md">
# Notification

---


## 组件演示

<demo>
  <example title="使用">
    <v-button type="primary" @click="_simple">simple show</v-button>
    <v-button type="primary" @click="_duration">duration=0</v-button>
    <v-button type="primary" @click="_closable">closable</v-button>
  </example>
</demo>

</template>

<script>
import Notification from '../../components/base/notification'
import vButton from '../../components/button'

const notification = Notification.newInstance({
  prefixCls: 'ant-basic-notification'
})

export default {
  data () {
    return {}
  },

  components: { vButton },

  methods: {
    close (key) {
      notification.removeNotice(key)
    },

    _simple () {
      notification.notice({
        key: 'simple',
        content: `<span>simple show</span>`,
        onClose() {
          console.log('simple close')
        }
      })
    },

    _duration () {
      notification.notice({
        content: `<span>can not close...</span>`,
        duration: null
      })
    },

    _closable () {
      notification.notice({
        content: `<span>closable</span>`,
        duration: null,
        onClose() {
          console.log('closable close')
        },
        closable: true
      })
    }

    // _manualClose () {
    //   const key = 'manual'
    //   notification.notice({
    //     content: `<div>
    //       <p>click below button to close</p>
    //       <v-button @click="close.bind(null, ${key})">close</v-button>
    //     </div>`,
    //     key: key,
    //     duration: null
    //   })
    // }
  }
}
</script>

<style>
.ant-basic-notification {
  position: fixed;
  z-index: 1000;
}
.ant-basic-notification-notice {
  padding: 7px 20px 7px 10px;
  border-radius: 3px 3px;
  border: 1px solid #999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 0px solid rgba(0, 0, 0, 0);
  background: #fff;
  display: block;
  width: auto;
  line-height: 1.5;
  vertical-align: middle;
  position: relative;
  margin: 10px 0;
}
.ant-basic-notification-notice-closable {
  padding-right: 20px;
}
.ant-basic-notification-notice-close {
  position: absolute;
  right: 5px;
  top: 3px;
  color: #000;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
  text-decoration: none;
}
.ant-basic-notification-notice-close-x:after {
  content: "\E62D";
  font-family: "anticon" !important;
}
.ant-basic-notification-notice-close:hover {
  opacity: 1;
  filter: alpha(opacity=100);
  text-decoration: none;
}
.ant-basic-notification-fade-enter {
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.ant-basic-notification-fade-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.ant-basic-notification-fade-enter.ant-basic-notification-fade-enter-active {
  animation-name: rcNotificationFadeIn;
  animation-play-state: running;
}
.ant-basic-notification-fade-leave.ant-basic-notification-fade-leave-active {
  animation-name: rcDialogFadeOut;
  animation-play-state: running;
}

@keyframes rcNotificationFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes rcDialogFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
