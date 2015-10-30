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
    <v-tag></v-tag>
  </example>
  <example title="四种颜色的类型"></example>
</demo>

## API

| 参数           | 说明                           | 类型       |  可选值 | 默认值 |
|----------------|--------------------------------|------------|---------|--------|
| href           | 链接的地址，会传给 a 标签      | string     |         | false  |
| closable       | 标签是否可以关闭               | boolean    |         | false  |
| onClose        | 组合时根据此项判定checked      | function   |         | 无     |
| color          | 标签的色彩                     | string     | blue green yellow red | 无 |
</template>

<script>
import vTag from '../../src/components/tag'

export default {

  components: { vTag }

}

</script>
