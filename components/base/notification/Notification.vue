<template>
<div :class="wrapClasses" :style="style">
  <Animate v-for="notice in notices" :show="notice.show" :on-end="_remove.bind(null, notice.key)" :transition-name="_getTransitionName()">
    <Notice
      :prefix-cls="prefixCls"
      :style="notice.style"
      :show.sync="notice.show"
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
      type: Object,
      default: function() {
        return {
          top: '65px',
          left: '50%'
        }
      }
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
      const self = this
      const key = notice.key = notice.key || getUuid()
      const notices = this.notices

      if (!notices.filter(v => v.key === key).length) {
        let _notice = Object.assign({
          show: true,
          style: {
            right: '50%'
          },
          content: '',
          duration: 0.5,
          closable: false
        }, notice)

        _notice.onClose = function() {
          notice.onClose && notice.onClose()
          self._close(_notice)
        }

        this.notices = notices.concat(_notice)
      }
    },

    remove (key) {
      this.notices.map(notice => {
        if (notice.key === key) {
          notice.show = false
        }
      })
    },

    _remove (key) {
      this.notices = this.notices.filter(notice => {
        return notice.key !== key
      })
    },

    _close (notice) {
      notice.show = false
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
