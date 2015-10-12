<template>
<span>
  <a v-if='href' v-bind:class="prefixCls + '-link'">
    <slot></slot>
  </a>
  <span v-else v-bind:class="prefixCls + '-link'">
    <slot></slot>
  </span>
  <span v-bind:class="prefixCls + '-slash'">/</span>
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
