<template lang="md">
# Badge

---

图标右上角的圆形徽标数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 组件演示

<demo>
  <example title="简单的徽章显示">
    <v-badge :count="5">
      <a href="javascript:;" class="head-example"></a>
    </v-badge>
  </example>
  <example title="超过99的会显示为99+">
    <v-badge :count="99">
      <a href="javascript:;" class="head-example"></a>
    </v-badge>
    <v-badge :count="200">
      <a href="javascript:;" class="head-example"></a>
    </v-badge>
  </example>
  <example title="没有具体的数字">
    <v-badge :dot="true">
      <v-icon :type="'notification'"></v-icon>
    </v-badge>
    <v-badge :dot="true">
      <a href="javascript:;">一个链接</a>
    </v-badge>
  </example>
  <example title="用a标签进行包裹即可">
    <a href="#">
      <v-badge :dot="true">
        <span class="head-example"></span>
      </v-badge>
    </a>
  </example>
</demo>

## API


| 参数           | 说明                             | 类型       |  可选值 | 默认值 |
|----------------|----------------------------------|------------|---------|--------|
| count          | 展示的数字，大于 99 时显示为 99+ | Number     |         |        |
| dot            | 不展示数字，只有一个小红点       | boolean    |         | false  |
</template>

<script>
import vBadge from '../../components/badge'
import vIcon from '../../components/iconfont'

export default {

  components: { vBadge, vIcon }

}

</script>

<style scoped>
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: #eee;
  display: inline-block;
}
</style>
