<template lang="md">
# Checkbox

---

多选框。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `switch`的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## DEMO

<div class="code-boxes">
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-checkbox :default-checked="false" :on-change="_change"><span>Checkbox</span></v-checkbox>
      </div>
    </div>
  </div>
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-checkbox :default-checked="false" :disabled="true"><span>不可用</span></v-checkbox>
        <br>
        <v-checkbox :default-checked="true" :disabled="true"><span>不可用</span></v-checkbox>
      </div>
    </div>
  </div>
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-checkbox :checked="checked" :disabled="disabled"><span>{{checkedStatus}}-{{disabledStatus}}</span></v-checkbox>
        <br>
        <p style="margin-top: 20px">
          <button type="button" class="ant-btn ant-btn-primary ant-btn-sm" @click="_toggleChecked">
            <span>{{checkedStatus}}</span>
          </button>
          <button type="button" class="ant-btn ant-btn-primary ant-btn-sm" @click="_toggleDisable">
            <span>{{disabledStatus}}</span>
          </button>
        </p>
      </div>
    </div>
  </div>
</div>

## API

### Checkbox

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  checked | 指定当前是否选中 | boolean  |   | false    |
|  default-checked | 初始是否选中 | boolean |  | false |
|  on-change | 变化时回调函数 | Function(e:Event) |  |  | |
</template>

<script>
import vCheckbox from '../../src/components/checkbox'

export default {
  data () {
    return {
      checked: true,
      disabled: false
    }
  },

  components: { vCheckbox },

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
