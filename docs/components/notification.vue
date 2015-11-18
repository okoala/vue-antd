<template lang="md">
# Notification

---

全局展示通知提醒信息。

## 何时使用

在系统右上角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 组件演示

<demo>
  <example title="基本">
    <v-button type="primary" @click="_openNotification">打开通知提醒框</v-button>
  </example>
  <example title="自动关闭的延时">
    <v-button type="primary" @click="_openNotification2">打开通知提醒框</v-button>
  </example>
  <example title="带有Icon的通知提醒框">
    <v-button @click="_openNotificationWithIcon('success')">成功</v-button>
    <v-button @click="_openNotificationWithIcon('info')">消息</v-button>
    <v-button @click="_openNotificationWithIcon('warn')">警告</v-button>
    <v-button @click="_openNotificationWithIcon('error')">错误</v-button>
  </example>
  <example title="回调函数">
    <v-button type="primary" @click="_openNotification3">打开通知提醒框</v-button>
  </example>
  <example title="自定义">
    <v-button type="primary" @click="_openNotification4">打开通知提醒框</v-button>
  </example>
</demo>

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warn(config)`
- `notification.open(config)`
- `notification.close(key: String)`

config 参数如下：

| 参数        | 说明                                            | 类型         | 默认值 |
|----------- |---------------------------------------------    | ----------- |--------|
| message    | 通知提醒标题，必选                                 | React.Element or String      | 无     |
| description | 通知提醒内容，必选                                | React.Element or String      | 无     |
| btn        | 自定义关闭按钮                                    | React.Element      | 无     |
| key        | 当前通知唯一标志                                   | String      | 无     |
| onClose    | 点击默认关闭按钮时触发的回调函数                     | Function    | 无     |
| duration   | 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭         | Number    | 4.5     |

还提供了一个全局配置方法，需要在调用前提前配置，一次有效。

- `notification.config(options)`

```js
message.config({
  top: 100
});
```

| 参数       | 说明               | 类型                       | 默认值       |
|------------|--------------------|----------------------------|--------------|
| top        | 消息距离顶部的位置 | Number                     | 24px         |
</template>

<script>
import notification from '../../components/notification'
import message from '../../components/message'
import vButton from '../../components/button'

const close = function() {
  message.info('成功关闭')
}

export default {
  components: { vButton },

  methods: {
    _openNotification () {
      notification.open({
        message: "这是标题",
        description: "这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案"
      })
    },

    _openNotification2 () {
      notification.open({
        message: "我不会自动关闭",
        description: "我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，",
        duration: 0
      })
    },

    _openNotificationWithIcon (type) {
      notification[type]({
        message: "这是标题",
        description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案"
      })
    },

    _openNotification3 () {
      notification.open({
        message: "这是标题",
        description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
        onClose: close
      })
    },

    _openNotification4 () {
      message.error('暂不支持')
      // const key='open'+Date.now()
      // const btnClick = function() {
      //   // 隐藏提醒框
      //   notification.close(key)
      // }
      // notification.open({
      //   message: "这是标题",
      //   description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
      //   btn: `
      //     <v-button type="primary" size="small" @click="btnClick">自定义关闭按钮并触发回调函数</v-button>
      //   `,
      //   key: key,
      //   onClose: close
      // });
    }
  }
}
</script>
