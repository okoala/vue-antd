<template lang="md">
# Animate

---

基础组件

通常情况下原始的 ```v-transition``` 已经够用了。


## 组件演示

<demo>
  <example title="简单的徽章显示">
    <v-checkbox :default-value="show" :on-change="_toggle"><span>显示</span></v-checkbox>
    <v-animate >
      <div></div>
    </v-animate>
  </example>
</demo>

</template>

<script>
import vAnimate from '../../components/base/animate'
import vCheckbox from '../../components/checkbox'

export default {
  data () {
    return {
      show: false
    }
  },

  components: { vAnimate, vCheckbox },

  methods: {
    _toggle () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>

</style>
