<template>
<div :class="wrapClasses">
  <span v-if="status === 'exception' || status === 'success'" :class="prefixCls + '-line-text'">
    <v-icon type="exclamation-circle"></v-icon>
  </span>
  <span v-else :class="prefixCls + '-line-text'">
    {{ percent }}%
  </span>

  <div :class="prefixCls + '-line-outer'">
    <div :class="prefixCls + '-line-inner'">
      <div
        :class="prefixCls + '-line-bg'"
        :style="{width: percent + '%', height: strokeWidth}"></div>
    </div>
  </div>
</div>
</template>

<script>
import { defaultProps, oneOf } from '../../utils'
import vIcon from '../iconfont'
import classnames from 'classnames'

export default {
  props: defaultProps({
    prefixCls: 'ant-progress',

    status: oneOf(['normal', 'exception', 'active', 'success']),
    showInfo: true,
    percent: 0,
    strokeWidth: 10
  }),

  data () {
    return {
      status: 'normal'
    }
  },

  computed: {
    wrapClasses () {
      return classnames({
        [`${this.prefixCls}-line-wrap`]: 1,
        [`clearfix`]: 1,
        [`status-${this.status}`]: this.status,
        [`${this.prefixCls}-line-wrap-full`]: !this.showInfo
      })
    }
  }
}

</script>
