<template>
<div :class="wrapClasses" :style="style">
  <Animate v-for="notice in notices" :transitionName="_getTransitionName()">
    <Notice
      :prefix-cls="prefixCls"
      :content="notice.content"
      :on-close="notice.onClose"
      :duration="notice.duration"
      :closable="notice.closable">
    </Notice>
  </Animate>
</div>
</template>

<script>
import Vue from 'vue'
import cx from 'classnames'
import Animate from '../animate'
import { defaultProps } from '../../../utils'
import Notice from './Notice.vue'

let seed = 0
const now = Date.now()

function getUuid () {
  return 'antNotification_' + now + '_' + (seed++)
}

export default {
  props: defaultProps({
    prefixCls: 'ant-notification',
    animation: 'fade',
    style: {
      top: 65,
      left: '50%'
    },
    className: String,
    transitionName: String
  }),

  components: { Notice, Animate },

  data () {
    return {
      notices: []
    }
  },

  compiled () {

  },

  computed: {
    wrapClasses () {
      return cx({
        [this.prefixCls]: 1,
        [this.className]: !!this.className
      })
    }
  },

  methods: {
    add (notice) {
      const key = notice.key = notice.key || getUuid()
      const notices = this.notices

      if (!notices.filter(v => v.key === key).length) {
        this.notices = notices.concat(
          Object.assign({
            content: '',
            duration: 0.5,
            closable: false,
            onClose: () => {}
          }, notice)
        )
      }
    },

    remove (key) {
      this.notices = this.notices.filter(notice => {
        return notice.key !== key
      })
    },

    _getTransitionName () {
      let transitionName = this.transitionName

      if (!transitionName && this.animation) {
        transitionName = `${this.prefixCls}-${this.animation}`
      }

      return transitionName
    }
  }
}

</script>
