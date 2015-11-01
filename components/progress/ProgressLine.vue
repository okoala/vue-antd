<template>
<div :class="wrapClasses">
  <span v-if="showInfo === true">
    <span v-if="status === 'exception' || status === 'success'" :class="prefixCls + '-line-text'">
      <v-icon type="exclamation-circle"></v-icon>
    </span>
    <span v-else :class="prefixCls + '-line-text'">
      {{ percent }}%
    </span>
  </span>

  <div :class="prefixCls + '-line-outer'">
    <div :class="prefixCls + '-line-inner'">
      <div
        :class="prefixCls + '-line-bg'"
        :style="{width: percent + '%', height: strokeWidth + 'px'}"></div>
    </div>
  </div>
</div>
</template>

<script>
import { defaultProps, oneOf } from '../../utils'
import vIcon from '../iconfont'
import cx from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-progress',

    status: oneOf(['normal', 'exception', 'active', 'success'], 'normal'),
    showInfo: true,
    percent: 0,
    strokeWidth: 10
  }),

  components: { vIcon },

  computed: {
    wrapClasses () {
      return cx({
        [`${this.prefixCls}-line-wrap`]: 1,
        [`clearfix`]: 1,
        [`status-${this.status}`]: this.status,
        [`${this.prefixCls}-line-wrap-full`]: !this.showInfo
      })
    }
  },

  compiled () {
    this._handleStatus()
  },

  watch: {
    percent () {
      this._handleStatus()
    }
  },

  methods: {
    _handleStatus () {
      if (parseInt(this.percent, 10) === 100) {
        this.status = 'success'
      }
    }
  }
}

</script>
