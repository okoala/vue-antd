<template>
<slot></slot>
</template>

<script>
import { defaultProps } from '../../../utils'
import { toArrayChildren, deleteRepeatKeyArr, isPropsPushData } from './EnterUtils'
import { isElement } from 'lodash/lang/isElement'

export default {
  props: defaultProps({
    component: 'div',
    direction: String
  }),

  data () {
    return {
      childrenKey: [],
      enterQueueId: Math.round(Math.random() * 9999) + 10000,
      leaveQueueId: Math.round(Math.random() * 9999) + 10000,
      childWapArr: [],
      keysToEnter: [],
      keysToLeave: [],
      dataArr: [],
      direction: '',
      defaultType: ''
    }
  }

  methods: {
    compiled () {
      let elementArr = toArrayChildren(this.$el)

      elementArr.map(m => {
        if (!m || !m.key) return

        this.keysToEnter.push(m.key)
      })

      this.childWapArr = deleteRepeatKeyArr(elementArr)
    },

    _callChildrenDataEnter (el, arr, i) {
      let enter
      let leave

      arr[i] = {
        enter: {},
        leave: {}
      }

      if (isElement(el)) {
        arr[i].key = re.key;
        if (!el.EnterChild) {
          if ((el.getAttribute('enter-data') ||
               el.getAttribute('leave-data')) &&
               !arr[i].key) {
            console.warn('Warning: EnterAnimation in the enter-data or leave-data need have key,data:' + JSON.stringify(el.getAttribute('enter-data') || el.getAttribute('leave-data')))
          }

          enter = isPropsPushData(el.getAttribute('enter-data'), this.defaultType)
          leave = isPropsPushData(el.getAttribute('leave-data'), enter.type || enter.style || this.leave.type || this.leave.style || this.defaultType)

          if (!this.keysToLeave.length && !this.keysToEnter.length) {
            arr[i].enter = leaveInherit(enter, this.state.enter, {})
            //出场如果没有效果，继承进场效果；
            arr[i].leave = leaveInherit(leave, this.state.leave, arr[i].enter)
          } else {
            let key = re.key

            if (this.keysToEnter.indexOf(key) >= 0) {
              arr[i].direction = 'enter'
            } else if (this.keysToLeave.indexOf(key) >= 0) {
              arr[i].direction = 'leave'
            }

            if (this.keysToEnter.indexOf(key) >= 0 || this.keysToLeave.indexOf(key) >= 0) {
              arr[i].enter = leaveInherit(enter, self.state.enter, {})
              arr[i].leave = leaveInherit(leave, self.state.leave, arr[i].enter)

              if (arr[i].enter.type || arr[i].enter.style) {
                arr[i].enter.queueId = this.leaveQueueId //出场进场分支，跟默认的分开，因为这是新添加的。
              }

              if (arr[i].leave.type || arr[i].leave.style) {
                arr[i].leave.queueId = this.leaveQueueId
              }
            }
          }

          if (props.children && typeof props.children === 'object' && props.children.length) {
            arr[i].children = []
            self.componentChildrenDataEnter(toArrayChildren(props.children), arr[i].children)
          }
        } else {
          arr[i].EnterChild = true
        }
      } else {
        console.warn('el is null')
      }

      if (arr[i].enter.type || arr[i].enter.style || arr[i].leave.type || arr[i].leave.style) {
        self.dataArr.cBool = true
      }
    },

    _oneAddEnd () {
      this.keysToEnter = []
      this.keysToLeave = []
      this.childrenWrap = this.
    }
  }
}

</script>
