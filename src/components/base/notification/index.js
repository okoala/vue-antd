import Notification from './Notification.vue'
import Vue from 'vue'

Notification.newInstance = (props) => {
  props = props || {}

  const div = document.createElement('div')
  document.body.appendChild(div)

  const notification = new Vue({
    el: div,
    components: { Notification }
  })

  return {
    notice (noticeProps) {
      notification._add(noticeProps)
    },

    removeNotice (key) {
      notification.remove(key)
    },

    component: notification,

    destory () {
      document.body.removeChild(div)
    }
  }
}

export default Notification
