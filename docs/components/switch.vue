<template lang="md">
# Switch

---

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox `的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 组件演示

<demo>
  <example title="最简单的用法">
    <v-switch :on-change="_change"></v-switch>
  </example>
  <example title="不可用">
    <v-switch :disabled="disabled"></v-switch>
    <br>
    <br>
    <v-button :type="'primary'" @click="_toogle">Toggle disabled</v-button>
  </example>
  <example title="带文字和图标">
    <v-switch :disabled="disabled">
      <span slot="checkedChildren">开</span>
      <span slot="unCheckedChildren">关</span>
    </v-switch>
    <v-switch :disabled="disabled">
      <span slot="checkedChildren">
        <i class="anticon anticon-check"></i>
      </span>
      <span slot="unCheckedChildren">
        <i class="anticon anticon-cross"></i>
      </span>
    </v-switch>
  </example>
</demo>

## API

### Switch

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  checked | 指定当前是否选中 | boolean  |   | false    |
|  defaultChecked | 初始是否选中 | boolean |  | false |
|  onChange | 变化时回调函数 | Function(checked:boolean) |  |  |
|  slot::checkedChildren | 选中时的内容 | slot node |  |  |
|  slot::unCheckedChildren | 非选中时的内容 | slot node |  |  |

</template>

<script>
import vSwitch from '../../components/switch'
import vButton from '../../components/button'
import { defaultProps } from '../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-switch'
  }),

  data () {
    return {
      disabled: false,
    }
  },

  components: { vSwitch, vButton },

  methods: {
    _change (value) {
      console.log('current', value)
    },

    _toogle () {
      this.disabled = !this.disabled
    }
  }
}

</script>
