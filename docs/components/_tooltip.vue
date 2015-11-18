<template lang="md">
# Tooltip

---


## 组件演示

<demo>
  <example title="简单使用">
    <div style="margin-top: 100px; margin-left: 100px; margin-bottom: 100px">
      <tooltip
        :visible="visible"
        :animation="zoom"
        :trigger="[]">
        <span slot="tooltip" style="z-index: 1000;">required!</span>
        <input @change="_onChange"/>
      </tooltip>
    </div>
  </example>
</demo>

</template>

<script>
import Tooltip from '../../components/base/tooltip'

export default {
  data () {
    return {
      visible: false
    }
  },

  components: { Tooltip },

  methods: {
    _onChange (e) {
      this.visible = e.target.value
    }
  }
}
</script>

<style scoped>


</style>
