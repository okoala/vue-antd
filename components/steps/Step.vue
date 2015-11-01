<template>
<div :class="wrapClasses" :style="{'width': tailWidth}">
  <div v-if="!stepLast" :class="prefixCls + '-tail'"><i></i></div>
  <div :class="prefixCls + '-head'">
    <div :class="prefixCls + '-head-inner'">
      <span v-if="!icon && status !== 'finish'" :class="prefixCls + '-icon'">{{stepNumber}}</span>
      <span v-else :class="prefixCls + '-icon ' + iconPrefix + 'icon ' + iconPrefix + 'icon-' + iconName"></span>
    </div>
  </div>
  <div :class="prefixCls + '-main'" :style="{'maxWidth': maxDescriptionWidth}">
    <div :class="prefixCls + '-title'">{{title}}</div>
    <div v-if="description" :class="prefixCls + '-description'">{{description}}</div>
  </div>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
import cx from 'classnames'

export default {
  props: defaultProps({
    status: String,
    title: '',
    description: '',
    prefixCls: '',
    iconPrefix: '',
    maxDescriptionWidth: '',
    tailWidth: String,
    icon: String,
    stepNumber: Number,
    stepLast: Boolean
  }),

  computed: {
    iconName () {
      return this.icon ? this.icon : 'check'
    },

    wrapClasses () {
      return cx({
        [`${this.prefixCls}-item`]: 1,
        [`${this.prefixCls}-item-last`]: this.stepLast,
        [`${this.prefixCls}-status-${this.status}`]: 1,
        [`${this.prefixCls}-custom`]: this.icon
      })
    }
  }
}

</script>
