<template lang="md">
# Tooltip

---

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个`按钮/文字/操作`的文案解释。

## 组件演示

<demo>
  <example title="基本">
    <v-tooltip title="提示文字">
      <span>鼠标移上来就会出现提示</span>
    </v-tooltip>
  </example>
  <example title="位置">
    <div style="margin-left: 60px;">
      <v-tooltip placement="topLeft" :title="text">
        <v-button>上左</v-button>
      </v-tooltip>
      <v-tooltip placement="top" :title="text">
        <v-button>上边</v-button>
      </v-tooltip>
      <v-tooltip placement="topRight" :title="text">
        <v-button>上右</v-button>
      </v-tooltip>
    </div>
    <div style="width: 60px; float: left">
      <v-tooltip placement="leftTop" :title="text">
        <v-button>左上</v-button>
      </v-tooltip>
      <v-tooltip placement="left" :title="text">
        <v-button>左边</v-button>
      </v-tooltip>
      <v-tooltip placement="leftBottom" :title="text">
        <v-button>左下</v-button>
      </v-tooltip>
    </div>
    <div style="width: 60px; margin-left: 270px;">
      <v-tooltip placement="rightTop" :title="text">
        <v-button>右上</v-button>
      </v-tooltip>
      <v-tooltip placement="right" :title="text">
        <v-button>右边</v-button>
      </v-tooltip>
      <v-tooltip placement="rightBottom" :title="text">
        <v-button>右下</v-button>
      </v-tooltip>
    </div>
    <div style="margin-left: 60px; cleat: both;">
      <v-tooltip placement="bottomLeft" :title="text">
        <v-button>下左</v-button>
      </v-tooltip>
      <v-tooltip placement="bottom" :title="text">
        <v-button>下边</v-button>
      </v-tooltip>
      <v-tooltip placement="bottomRight" :title="text">
        <v-button>下右</v-button>
      </v-tooltip>
    </div>
  </example>
</demo>

## API

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| placement | 气泡框位置，可选 `top/left/right/bottom` | string     | top    |
| title     | 提示文字                                 | string/jsx | 无     |
</template>
<script>
import vTooltip from '../../components/tooltip'
import vButton from '../../components/button'

export default {
  data () {
    return {
      text: '提示文字',
      visible: false
    }
  },

  components: { vTooltip, vButton },

  methods: {

  }
}

</script>
<style scoped>
.code-box-demo .ant-btn {
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
