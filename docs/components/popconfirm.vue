<template lang="md">
# Popconfirm

---

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## 组件演示

<demo>
  <example title="基本">
    <v-popconfirm title="确定要删除这个任务吗？"
      :on-confirm="_confirm"
      :on-cancel="_cancel">
      <a href="javascript:;">删除</a>
    </v-popconfirm>
  </example>
  <example title="偏移">
    <div style="margin-left: 60px;">
      <v-popconfirm placement="topLeft" :title="text" :on-confirm="_confirm">
        <v-button>上左</v-button>
      </v-popconfirm>
      <v-popconfirm placement="top" :title="text" :on-confirm="_confirm">
        <v-button>上边</v-button>
      </v-popconfirm>
      <v-popconfirm placement="topRight" :title="text" :on-confirm="_confirm">
        <v-button>上右</v-button>
      </v-popconfirm>
    </div>
    <div style="width: 60px; float: left">
      <v-popconfirm placement="leftTop" :title="text" :on-confirm="_confirm">
        <v-button>左上</v-button>
      </v-popconfirm>
      <v-popconfirm placement="left" :title="text" :on-confirm="_confirm">
        <v-button>左边</v-button>
      </v-popconfirm>
      <v-popconfirm placement="leftBottom" :title="text" :on-confirm="_confirm">
        <v-button>左下</v-button>
      </v-popconfirm>
    </div>
    <div style="width: 60px; margin-left: 270px;">
      <v-popconfirm placement="rightTop" :title="text" :on-confirm="_confirm">
        <v-button>右上</v-button>
      </v-popconfirm>
      <v-popconfirm placement="right" :title="text" :on-confirm="_confirm">
        <v-button>右边</v-button>
      </v-popconfirm>
      <v-popconfirm placement="rightBottom" :title="text" :on-confirm="_confirm">
        <v-button>右下</v-button>
      </v-popconfirm>
    </div>
    <div style="margin-left: 60px; cleat: both;">
      <v-popconfirm placement="bottomLeft" :title="text" :on-confirm="_confirm">
        <v-button>下左</v-button>
      </v-popconfirm>
      <v-popconfirm placement="bottom" :title="text" :on-confirm="_confirm">
        <v-button>下边</v-button>
      </v-popconfirm>
      <v-popconfirm placement="bottomRight" :title="text" :on-confirm="_confirm">
        <v-button>下右</v-button>
      </v-popconfirm>
    </div>
  </example>
</demo>


## API

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| placement | 气泡框位置，可选 `top/left/right/bottom` | string        | top    |
| title     | 确认框的描述                             | string        | 无     |
| onConfirm | 点击确认的回调                           | function      | 无     |
| onCancel  | 卡片内容                                 | function      | 无     |
</template>

<script>
import vPopconfirm from '../../components/popconfirm'
import vButton from '../../components/button'
import message from '../../components/message'

export default {
  data () {
    return {
      text: '确定要删除这个任务吗？'
    }
  },

  components: { vPopconfirm, vButton },

  methods: {
    _confirm () {
      message.success('点击了确定')
    },

    _cancel () {
      message.error('点击了取消')
    }
  }
}

</script>
<style scoped>
.code-box-demo .ant-btn {
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
