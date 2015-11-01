<template>
<div :class="classnames" :style="style">
  <Animate :transitionName="_getTransitionName()">
    <Notice></Notice>
  </Animate>
</div>
</template>

<script>
import Vue from 'vue'
import Animate from '../animate'
import {createChainedFunction, classSet} from 'rc-util'
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
      default: {
        top: 65,
        left: '50%'
      }
    },
    className: String,
    transitionName: String
  }),

  data () {
    return {
      notices: []
    }
  },

  components: { Notice, Animate },

  computed: {
    classnames () {
      return classSet({
        [this.prefixCls]: 1,
        [this.className]: !!this.className
      })
    }
  }

  methods: {
    _remove (key) {
      this.notices = this.notices.filter(notice => {
        return notice.key !== key
      })
    },

    _add (notice) {
      const key = notice.key = notice.key || getUuid()
      const notices = this.notices

      if (!notices.filter(v => v.key === key).length) {
        this.notices = notices.concat(notice)
      }
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
