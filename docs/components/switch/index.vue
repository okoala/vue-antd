<template lang="md">
# Switch

---

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox `的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## demo
<div>
  <v-switch></v-switch>
</div>

## API

### Switch

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  checked | 指定当前是否选中 | boolean  |   | false    |
|  defaultChecked | 初始是否选中 | boolean |  | false |
|  onChange | 变化时回调函数 | Function(checked:boolean) |  |  |
|  checkedChildren | 选中时的内容 | React Node |  |  |
|  unCheckedChildren | 非选中时的内容 | React Node |  |  |

</template>

<script>
import vSwitch from '../../../src/components/switch'
import { defaultProps } from '../../../src/utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-switch'
  }),

  components: { vSwitch }
}

</script>
