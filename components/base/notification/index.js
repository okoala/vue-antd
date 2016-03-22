import Notification from './Notification.vue'
import Vue from 'vue'
import { camelcaseToHyphen } from '../../../utils'

Notification.newInstance = properties => {
  const data = properties || {}

  let props = ''
  Object.keys(data).forEach(item => {
    props += ' :' + camelcaseToHyphen(item) + '=' + item
  })

  const div = document.createElement('div')
  div.innerHTML = `<notification ${props}></notification>`
  document.body.appendChild(div)

  const notification = new Vue({
    el: div,
    data: data,
    components: { Notification }
  }).$children[0]

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
