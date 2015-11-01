<template>
<li :title="title" :class="classnames" @click="onClick">
  <a>{{page}}</a>
</li>
</template>

<script>
import { defaultProps } from '../../../utils'

export default {
  props: defaultProps({
    rootPrefixCls: '',
    page: Number,
    active: Boolean,
    last: Boolean,
    onClick: () => {}
  }),

  computed: {
    classnames () {
      const prefixCls = `${this.rootPrefixCls}-item`
      let cls = `${prefixCls} ${prefixCls}-${this.page}`

      if (this.active) {
        cls = `${cls} ${prefixCls}-active`
      }

      return cls
    },

    title () {
      let title

      if (this.page === 1) {
        title = 'First Page'
      } else if (this.last) {
        title = ('Last Page: ' + this.page)
      } else {
        title = ('Page ' + this.page)
      }

      return title
    }
  }
}

</script>
