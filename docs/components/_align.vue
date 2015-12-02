<template lang="md">
# Align

---

## 组件演示

<demo>
  <example title="简单使用">
    <v-checkbox :default-value="show" :on-change="_toggleAlign"><span>force align</span></v-checkbox>
    <v-checkbox :default-value="show" :on-change="_toggleMonitor"><span>toggle monitor</span></v-checkbox>
    <div v-el:container id="container" style="width: 80%; height: 500px; border: 1px solid red">
      <align
        :align="align"
        :target="_getTarget"
        :monitor-window-resize="monitor">
        <div style="position: absolute; width: 50px; height: 50px; background: yellow">source</div>
      </align>
    </div>
  </example>
</demo>

</template>

<script>
import Align from '../../components/base/align'
import vCheckbox from '../../components/checkbox'

export default {
  data () {
    return {
      align: {
        points: ['cc', 'cc']
      },
      monitor: true
    }
  },

  components: { Align, vCheckbox },

  methods: {
    _getTarget () {
      let el = this.$els.container;
      if (!el) {
        // parent ref not attached
        el = document.getElementById("container")
      }
      return el
    },

    _toggleAlign () {
      this.show = !this.show
    },

    _toggleMonitor () {
      this.monitor = !this.monitor
    }
  }
}
</script>

<style scoped>


</style>
