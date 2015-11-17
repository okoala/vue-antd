import Notification from './Notification.vue'
import Vue from 'vue'

Notification.newInstance = (properties) => {
  const data = properties || {}

  const div = document.createElement('div')
  div.innerHTML = '<notification></notification>'
  document.body.appendChild(div)

  const notification = new Vue({
    el: div,
    data: data,
    components: { Notification }
  })

  return {
    notice (noticeProps) {
      notification.add(noticeProps)
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
