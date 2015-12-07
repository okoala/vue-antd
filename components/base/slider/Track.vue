<template>
<div :class="className" :style="style"></div>
</template>

<script>
import { cx } from '../../../utils'

export default {
  props: ['offset', 'length', 'included', 'className'],
  computed: {
    wrapStyle () {
      return cx({
        left: this.offset + '%',
        width: this.length + '%',
        visibility: this.included ? 'visible' : 'hidden'
      })
    }
  }
}

</script>
