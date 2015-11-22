<template lang="md">
# Popover

---

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 组件演示

<demo>
  <example title="基本">
    <v-popover title="标题">
      <div slot="overlay">
        <p>内容</p>
        <p>内容</p>
      </div>
      <v-button type="primary">弹出卡片</v-button>
    </v-popover>
  </example>
  <example title="位置">
    <div style="margin-left: 60px;">
      <v-popover placement="topLeft" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>上左</v-button>
      </v-popover>
      <v-popover placement="top" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>上边</v-button>
      </v-popover>
      <v-popover placement="topRight" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>上右</v-button>
      </v-popover>
    </div>
    <div style="width: 60px; float: left">
      <v-popover placement="leftTop" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>左上</v-button>
      </v-popover>
      <v-popover placement="left" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>左边</v-button>
      </v-popover>
      <v-popover placement="leftBottom" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>左下</v-button>
      </v-popover>
    </div>
    <div style="width: 60px; margin-left: 270px;">
      <v-popover placement="rightTop" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>右上</v-button>
      </v-popover>
      <v-popover placement="right" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>右边</v-button>
      </v-popover>
      <v-popover placement="rightBottom" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>右下</v-button>
      </v-popover>
    </div>
    <div style="margin-left: 60px; cleat: both;">
      <v-popover placement="bottomLeft" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>下左</v-button>
      </v-popover>
      <v-popover placement="bottom" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>下边</v-button>
      </v-popover>
      <v-popover placement="bottomRight" :title="text" trigger="click">
        <div slot="overlay">
          <p>内容</p>
          <p>内容</p>
        </div>
        <v-button>下右</v-button>
      </v-popover>
    </div>
  </example>
  <example title="三种触发方式">
    <v-popover title="标题" trigger="hover">
      <div slot="overlay">
        <p>内容</p>
        <p>内容</p>
      </div>
      <v-button>移入</v-button>
    </v-popover>
    <v-popover title="标题" trigger="focus">
      <div slot="overlay">
        <p>内容</p>
        <p>内容</p>
      </div>
      <v-button>聚焦</v-button>
    </v-popover>
    <v-popover title="标题" trigger="click">
      <div slot="overlay">
        <p>内容</p>
        <p>内容</p>
      </div>
      <v-button>点击</v-button>
    </v-popover>
  </example>
  <example title="从浮层内关闭">
    <v-popover title="标题" trigger="click"
      :visible="visible"
      :on-visible-change="_handleVisibleChange">
      <div slot="overlay">
        <a @click="_hide">关闭卡片</a>
      </div>
      <v-button type="primary">点击弹出卡片</v-button>
    </v-popover>
  </example>
</demo>


## API

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| trigger   | 触发行为，可选 `hover/focus/click`       | string        | hover  |
| placement | 气泡框位置，可选 `top/left/right/bottom` | string        | top    |
| title     | 卡片标题                                 | React.Element | 无     |
| content   | 卡片内容                                 | React.Element | 无     |
| overlayClassName | 浮层的类名                        | string        | 无     |
</template>
<script>
import vPopover from '../../components/popover'
import vButton from '../../components/button'

export default {
  data () {
    return {
      text: '标题',
      visible: false
    }
  },

  components: { vPopover, vButton },

  methods: {
    _hide () {
      this.visible = false
    },

    _handleVisibleChange (visible) {
      this.visible = visible
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
