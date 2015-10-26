<template lang="md">
# Switch

---

开关选择器。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox `的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## demo
<div class="code-boxes">
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-switch :on-change="_change"></v-switch>
      </div>
    </div>
  </div>
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-switch :disabled="disabled"></v-switch>
        <button @click="_toogle" type="button" class="ant-btn ant-btn-small ant-btn-primary"><span>Toggle disabled</span></button>
      </div>
    </div>
  </div>
  <div class="code-boxes-col-2-1">
    <div class="code-box">
      <div class="code-box-demo">
        <v-switch :disabled="disabled">
          <span slot="checkedChildren">开</span>
          <span slot="unCheckedChildren">关</span>
        </v-switch>
        <v-switch :disabled="disabled">
          <span slot="checkedChildren">
            <i class=" anticon anticon-check"></i>
          </span>
          <span slot="unCheckedChildren">
            <i class=" anticon anticon-cross"></i>
          </span>
        </v-switch>
      </div>
    </div>
  </div>
</div>

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
import vSwitch from '../../../src/components/switch'
import { defaultProps } from '../../../src/utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-switch'
  }),

  data () {
    return {
      disabled: false,
    }
  },

  components: { vSwitch },

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
