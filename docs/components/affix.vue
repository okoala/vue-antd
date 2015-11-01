<template lang="md">
# Affix

---

将页面元素钉在可视范围。

## 何时使用

当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。

页面可视范围过小时，慎用此功能以免遮挡页面内容。

## 组件演示

<demo>
  <example title="基本">
    <v-affix>
      <v-button type="primary">固定在顶部</v-button>
    </v-affix>
  </example>
  <example title="偏移">
    <v-affix offset="75">
      <v-button type="primary">固定在距离顶部 75px 的位置</v-button>
    </v-affix>
  </example>
</demo>

## API


| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| offset      | 达到指定偏移量后触发   | Number | 0        |

</template>

<script>
import vAffix from '../../components/affix'
import vButton from '../../components/button'

export default {

  components: { vAffix, vButton }

}

</script>
