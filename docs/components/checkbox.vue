<template lang="md">
# Checkbox

---

多选框。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `switch`的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 组件演示

<demo>
  <example title="基本用法">
    <v-checkbox :default-checked="false" :on-change="_change"><span>Checkbox</span></v-checkbox>
  </example>
  <example title="不可用">
    <v-checkbox :default-checked="false" :disabled="true"><span>不可用</span></v-checkbox>
    <br>
    <v-checkbox :default-checked="true" :disabled="true"><span>不可用</span></v-checkbox>
  </example>
  <example title="和外部组件通信">
    <v-checkbox :checked="checked" :disabled="disabled"><span>{{checkedStatus}}-{{disabledStatus}}</span></v-checkbox>
    <br>
    <br>
    <v-button type="primary" size="small" @click="_toggleChecked">{{checkedStatus}}</v-button>
    <v-button type="primary" size="small" @click="_toggleDisable">{{disabledStatus}}</v-button>
  </example>
</demo>

## API

### Checkbox

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  checked | 指定当前是否选中 | boolean  |   | false    |
|  default-checked | 初始是否选中 | boolean |  | false |
|  on-change | 变化时回调函数 | Function(e:Event) |  |  | |
</template>

<script>
import vCheckbox from '../../components/checkbox'
import vButton from '../../components/button'

export default {
  data () {
    return {
      checked: true,
      disabled: false
    }
  },

  components: { vCheckbox, vButton },

  computed: {
    checkedStatus () {
      return this.checked ? '选中' : '取 消'
    },

    disabledStatus () {
      return this.disabled ? '不可用' : '可 用'
    }
  },

  methods: {
    _change (e) {
      console.log('checked=' + e.target.checked)
    },

    _toggleChecked () {
      this.checked = !this.checked
    },

    _toggleDisable () {
      this.disabled = !this.disabled
    }
  }
}

</script>
