<template lang="md">
# Tag

---

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 组件演示

<demo>
  <example title="基本">
    <v-tag>标签一</v-tag>
    <v-tag>标签二</v-tag>
    <v-tag closable :on-close="_onClose">标签三</v-tag>
    <v-tag href="http://www.baidu.com">标签四 (链接)</v-tag>
  </example>
  <example title="四种颜色的类型">
    <v-tag closable color="blue">蓝色</v-tag>
    <v-tag closable color="green">绿色</v-tag>
    <v-tag closable color="yellow">黄色</v-tag>
    <v-tag closable color="red">红色</v-tag>
  </example>
</demo>

## API

| 参数           | 说明                           | 类型       |  可选值 | 默认值 |
|----------------|--------------------------------|------------|---------|--------|
| href           | 链接的地址，会传给 a 标签      | string     |         | false  |
| closable       | 标签是否可以关闭               | boolean    |         | false  |
| on-close        | 组合时根据此项判定checked      | function   |         | 无     |
| color          | 标签的色彩                     | string     | blue green yellow red | 无 |
</template>

<script>
import vTag from '../../components/tag'

export default {

  components: { vTag },

  methods: {
    _onClose () {
      console.log('tag 关闭')
    }
  }

}

</script>
