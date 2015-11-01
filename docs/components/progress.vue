<template lang="md">
# Progress

---

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

* 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时；
* 当需要显示一个操作完成的百分比时。

## 组件演示

<demo>
  <example title="进度条">
    <v-progress-line :percent="30"></v-progress-line>
    <v-progress-line :percent="50" status="active"></v-progress-line>
    <v-progress-line :percent="70" status="exception"></v-progress-line>
    <v-progress-line :percent="100"></v-progress-line>
    <v-progress-line :percent="50" :show-info="false"></v-progress-line>
  </example>
  <example title="小型进度条">
    <v-progress-line :percent="30"  :stroke-width="5"></v-progress-line>
    <v-progress-line :percent="50"  :stroke-width="5" status="active"></v-progress-line>
    <v-progress-line :percent="70"  :stroke-width="5" status="exception"></v-progress-line>
    <v-progress-line :percent="100" :stroke-width="5"></v-progress-line>
  </example>
  <example title="进度圈">
    <v-progress-circle :percent="30"></v-progress-circle>
    <v-progress-circle :percent="70" status="exception"></v-progress-circle>
    <v-progress-circle :percent="100"></v-progress-circle>
  </example>
  <example title="小型进度圈">
    <v-progress-circle :percent="30"  :width="80"></v-progress-circle>
    <v-progress-circle :percent="70"  :width="80" status="exception"></v-progress-circle>
    <v-progress-circle :percent="100" :width="80"></v-progress-circle>
  </example>
  <example title="进度圈动态展示">
    <v-progress-circle :percent="percent"></v-progress-circle>
    <v-button-group>
      <v-button type="ghost" @click="_decline">
        <v-icon type="minus"></v-icon>
      </v-button>
      <v-button type="ghost" @click="_increase">
        <v-icon type="plus"></v-icon>
      </v-button>
    </v-button-group>
  </example>
  <example title="动态展示">
    <v-progress-line :percent="percent"></v-progress-line>
    <v-button-group>
      <v-button type="ghost" @click="_decline">
        <v-icon type="minus"></v-icon>
      </v-button>
      <v-button type="ghost" @click="_increase">
        <v-icon type="plus"></v-icon>
      </v-button>
    </v-button-group>
  </example>
</demo>

## API

## Progress Bar

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|-------------|
| percent  | 百分比         | number   | 0           |
| status   | 状态，有两个值normal、exception、active三种状态 | string   | normal |
| strokeWidth | 进度条线的宽度，单位是px | number | 1           |
| showInfo | 是否显示进度数值和状态图标 | bool | true           |

### Progress Circle

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|-------------|
| percent  | 百分比         | number   | 0           |
| status   | 状态，有两个值normal、exception | string   | normal |
| strokeWidth | 进度条线的宽度，单位是进度条画布宽度的百分比 | number | 1           |
| width | 必填，进度条画布宽度，单位px。这里没有提供height属性设置，Line型高度就是strokeWidth，Circle型高度等于width | number | null |
</template>

<script>
import { vProgressLine, vProgressCircle } from '../../components/progress'
import vButton, { vButtonGroup } from '../../components/button'
import vIcon from '../../components/iconfont'

export default {
  data () {
    return {
      percent: 0
    }
  },

  components: { vProgressLine, vProgressCircle, vButtonGroup, vButton, vIcon },

  methods: {
    _decline () {
      let percent = this.percent - 10;
      if (percent < 0) {
        percent = 0;
      }
      this.percent = percent
    },

    _increase () {
      let percent = this.percent + 10;
      if (percent > 100) {
        percent = 100;
      }
      this.percent = percent
    }
  }

}

</script>
