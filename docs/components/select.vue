<template lang="md">
# Select

---

类似 Select2 的选择器。

## 何时使用

弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。

## 组件演示

<demo>
  <example title="">
    <v-select default-value="lucy" :on-change="_handleChange" :style="{width: '200px'}">
      <v-option value="jack">Jack</v-option>
      <v-option value="lucy">Lucy</v-option>
      <v-option value="disabled" disabled>Disabled</v-option>
      <v-option value="okoala">okoala</v-option>
    </v-select>
  </example>
</demo>

## API

### Select props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| value    | 指定当前选中的条目 | string/Array<String>   |  无  |
| defaultValue    | 指定默认选中的条目 | string/Array<String>   |  无  |
| multiple   | 支持多选 |   | false |
| filterOption | 是否根据输入项进行筛选 |  | true     |
| tags | 可以把随意输入的条目作为tag，输入项不需要与下拉选项匹配 | |false |
| onSelect | 被选中时调用，参数为选中的option value值 | function | 无   |
| onDeselect | 取消选中时调用，参数为选中的option value值，仅在multiple或tags模式下生效 | function | 无   |
| onChange | 选中option，或input的value变化(combobox模式下)时，调用此函数 | function | 无 |
| allowClear | 显示清除按钮 | | false |
| placeholder | 选择框默认文字 | string | 无 |
| searchPlaceholder | 搜索框默认文字 | string | 无 |
| optionFilterProp | 输入项过滤对应的 option 属性 | string | value |
| combobox | 输入框自动提示模式 | | false |
| size    | 选择框大小  | String      |      无      |

### Option props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| disabled    | 是否禁用 | Boolean   |  false  |
| key   | 如果react需要你设置此项，此项值与value的值相同，然后可以省略value设置 |  String |  |
| value   | 默认根据此属性值进行筛选 | String | - |

### OptGroup props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| label    | 组名 | String/React.Element   |  无  |
| key   |  |  String | - |
</template>

<script>
import vSelect, { vOption } from '../../components/select'

export default {

  components: { vSelect, vOption },

  methods: {
    _handleChange (value) {
      console.log('selectd ', value)
    }
  }

}
</script>
