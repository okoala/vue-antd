<template lang="md">
# Message

---

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 组件演示

<demo>
  <example title="成功">
    <v-button type="primary" @click="_success">显示成功提示</v-button>
  </example>
  <example title="错误或失败">
    <v-button type="primary" @click="_error">显示失败提示</v-button>
  </example>
  <example title="普通提示">
    <v-button type="primary" @click="_info">显示普通提醒</v-button>
  </example>
  <example title="修改延时">
    <v-button type="primary" @click="_customTime">自定义时长提示</v-button>
  </example>
  <example title="加载中">
    <v-button type="primary" @click="_showLoading">显示加载中...</v-button>
  </example>
</demo>

## API

- `message.success(content, duration)`
- `message.error(content, duration)`
- `message.info(content, duration)`
- `message.loading(content, duration)`

组件提供了三个静态方法，参数如下：

| 参数       | 说明           | 类型                       | 默认值       |
|------------|----------------|----------------------------|--------------|
| content    | 提示内容       | React.Element or String    | 无           |
| duration   | 自动关闭的延时 | number                     | 1.5          |


还提供了一个全局配置方法：

- `message.config(options)`

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
import message from '../../components/message'
import vButton from '../../components/button'

export default {
  components: { vButton },

  methods: {
    _success () {
      message.success('这是一条成功的提示')
    },

    _error () {
      message.error('这是一条失败的提示这是一条失败的提示这是一条失败的提示')
    },

    _info () {
      message.info('这是一条普通的提醒')
    },

    _customTime () {
      message.success('这是一条成功的提示,并将于10秒后消失', 10)
    },

    _showLoading () {
      const hide = message.loading('正在执行中...', 0)
      // 异步手动移除
      setTimeout(hide, 2500)
    }
  }
}
</script>
