<template lang="md">
# Radio

---

单选框。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。


## 组件演示

<demo>
  <example title="最基本的用法">
    <v-radio :on-change="_change"><span>Radio</span></v-radio>
  </example>
  <example title="不可用">
    <v-radio :default-checked="false" :disabled="disabled"><span>不可用</span></v-radio>
    <br>
    <v-radio :default-checked="true" :disabled="disabled"><span>不可用</span></v-radio>
    <br>
    <br>
    <v-button :type="'primary'" @click="_toggleDisabled">Toggle disabled</v-button>
  </example>
  <example title="一组互斥的Radio配合使用">
    <v-radio-group
      :on-change="_onGroupChange"
      :value="groupValue"
      :radios="[{value: 'a', name: 'A'},{value: 'b', name: 'B'},{value: 'c', name: 'C'},{value: 'd', name: 'D'}]">
    </v-radio-group>
    <br>
    <br>
    <p>你选中的是： <span>{{groupValue}}</span></p>
  </example>
  <example title="按钮样式的单选组合">
    <v-radio-group
      :type="'button'"
      :on-change="_onCityChange"
      :default-value="'hangzhou'"
      :radios="[{value: 'hangzhou', name: '杭州'},{value: 'shanghai', name: '上海'},{value: 'beijing', name: '北京'},{value: 'chengdu', name: '成都'}]">
    </v-radio-group>
    <div style="margin-top: 20px" v-if="cityName">
      <span>你选中的是： </span><span>{{cityName}}</span>
    </div>
  </example>
</demo>

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
import vRadio, { vRadioGroup } from '../../components/radio'
import vButton from '../../components/button'

export default {
  data () {
    return {
      disabled: true,
      groupValue: 'a',
      cityName: null
    }
  },

  components: { vRadio, vRadioGroup, vButton },

  methods: {
    _change () {

    },

    _toggleDisabled () {
      this.disabled = !this.disabled
    },

    _onGroupChange (e) {
      console.log('radio checked:' + e.target.value)
      this.groupValue = e.target.value
    },

    _onCityChange (e) {
      console.log('当前城市: ' + e.target.name)
      this.cityName = e.target.name
    }
  }
}

</script>
