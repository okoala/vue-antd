<template lang="md">
# Carousel

---

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 组件演示

<demo>
  <example title="基本">
    <v-carousel :after-change="onChange">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </v-carousel>
  </example>
  <example title="垂直">
    <v-carousel :vertical="true">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </v-carousel>
  </example>
  <example title="渐显">
    <v-carousel effect="fade">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </v-carousel>
  </example>
</demo>

## API

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| effect           | 动画效果函数，可取 scrollx, fade | String | scrollx |
| dots | 是否显示面板指示点 | Boolean   | true |
| vertical | 垂直显示 | Boolean   | false |
| autoplay | 是否自动切换 | Boolean   | false |
| easing | 动画效果 | String   | linear |
| onChange         | 切换面板的回调                               | Function | 无
</template>

<script>
import vCarousel from '../../components/carousel'
import message from '../../components/message'

export default {

  components: { vCarousel },

  methods: {
    onChange (current) {
      message.info(current)
    }
  }

}

</script>
<style>
.ant-carousel .slick-slide h3{
  text-align: center;
  height: 100px;
  line-height: 100px;
  background: #71B5DE;
  color: #fff;
  overflow: hidden;
  margin: 0;
}
#components-carousel-demo-vertical .ant-carousel {
  margin-right: 35px;
}
</style>
