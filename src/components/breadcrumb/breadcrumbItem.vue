<template>
<span>
  <a v-if='href' :href="href" :class="prefixCls + '-link'">
    <slot></slot>
  </a>
  <span v-else :class="prefixCls + '-link'">
    <slot></slot>
  </span>
  <span :class="prefixCls + '-slash'">/</span>
</span>
</template>

<script>
import { defaultProps } from '../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-breadcrumb',
    href: String
  })
}
</script>
