<template>
<span>
  <a v-if='href' :class="prefixCls + '-link'">
    <slot></slot>
  </a>
  <span v-else :class="prefixCls + '-link'">
    <slot></slot>
  </span>
  <span :class="prefixCls + '-slash'">/</span>
</span>
</template>

<script>
export default {
  props: {
    prefixCls: String,
    href: String
  }
}
</script>
