<template lang="md">
# InputNumber

---

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## 组件演示

<demo>
  <example title="基本">
    <v-input-number min="1" max="10" default-value="3" :on-change="_handleChange"></v-input-number>
  </example>
  <example title="三种大小">
    <v-input-number size="large" min="1" max="100000" default-value="3" :on-change="_handleChange"></v-input-number>
    <v-input-number min="1" max="100000" default-value="3" :on-change="_handleChange"></v-input-number>
    <v-input-number size="small" min="1" max="100000" default-value="3" :on-change="_handleChange"></v-input-number>
  </example>
  <example title="不可用">
    <v-input-number min="1" max="10" :disabled="disabled" default-value="3"></v-input-number>
    <div style="margin-top: 20px">
      <v-button @click="_toggle" type="primary">Toggle disabled</v-button>
    </div>
  </example>
  <example title="大步数">
    <v-input-number default-value="1" step="10"></v-input-number>
  </example>
</demo>

## API

属性如下

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| min     | 最小值   | Number | -Infinity        |
| max     | 最大值       | Number      | Infinity           |
| value     | 当前值       | Number      |            |
| step     | 每次改变步数       | Number      |      1      |
| defaultValue     | 初始值       | Number      |            |
| onChange     | 变化回调       | Function      |            |
| disabled     | 禁用       | Boolean      |      false      |
| size    | 输入框大小  | String      |      无      |
</template>

<script>
import vInputNumber from '../../components/input-number'
import vButton from '../../components/button'

export default {
  data () {
    return {
      disabled: true
    }
  },

  components: { vInputNumber, vButton },

  methods: {
    _handleChange (value) {
      console.log('changed ', value)
    },

    _toggle () {
      this.disabled = !this.disabled
    }
  }

}

</script>
