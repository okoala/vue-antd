<template>
<div v-if="!closed" :class="wrapClasses">
  <a :class="prefixCls + '-text'" :href="href"><slot></slot></a>
  <v-icon v-if="closable" type="cross" @click="_close"></v-icon>
</div>
</template>

<script>
import cx from 'classnames'
import { defaultProps, oneOf } from '../../utils'
import vIcon from '../iconfont'

export default {
  props: defaultProps({
    prefixCls: 'ant-tag',

    href: String,
    closable: false,
    onClose: () => {},
    color: oneOf(['blue', 'green', 'yellow', 'red'])
  }),

  data () {
    return {
      closed: false
    }
  },

  components: { vIcon },

  computed: {
    wrapClasses () {
      return cx({
        [this.prefixCls]: 1,
        [`${this.prefixCls}-${this.color}`]: this.color,
        [`${this.prefixCls}-close`]: this.closing
      })
    }
  },

  methods: {
    _close (e) {
      // let dom = this.$el
      // dom.style.width = dom.offsetWidth + 'px'
      // dom.style.height = dom.offsetHeight + 'px'
      this.closed = true
      this.onClose.call(this, e)
    }
  }

}

</script>
