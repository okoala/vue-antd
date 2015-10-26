<template lang="md">
# Radio

---

单选框。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。


## DEMO

<div class="code-boxes">
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-radio :on-change="_change">Radio</v-radio>
      </div>
    </div>
  </div>
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-radio :default-checked="false" :disabled="disabled">不可用</v-radio>
        <br>
        <v-radio :default-checked="true" :disabled="disabled">不可用</v-radio>
        <div style="margin-top: 20px">
          <button type="button" class="ant-btn ant-btn-primary" @click="_toggleDisabled">
            <span>Toggle disabled</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

## API

### Radio

| 参数           | 说明                                     | 类型       |  可选值 | 默认值 |
|----------------|------------------------------------------|------------|---------|--------|
| checked        | 指定当前是否选中                         | Boolean    |         | false  |
| defaultChecked | 初始是否选中                             | Boolean    |         | false  |
| value          | 根据 value 进行比较，判断是否选中        | String     |         | 无     |

### RadioGroup

单选框组合，用于包裹一组 `Radio`。

| 参数           | 说明                             | 类型              | 可选值 | 默认值 |
|----------------|----------------------------------|-------------------|--------|--------|
| onChange       | 选项变化时的回调函数             | Function(e:Event) | 无     | 无     |
| value          | 用于设置当前选中的值             | String            | 无     | 无     |
| defaultValue   | 默认选中的值                     | String            | 无     | 无     |
</template>

<script>
import vRadio from '../../../src/components/radio'

export default {
  data () {
    return {
      disabled: true
    }
  },

  components: { vRadio },

  methods: {
    _change () {

    },

    _toggleDisabled () {
      this.disabled = !this.disabled
    }
  }
}

</script>
