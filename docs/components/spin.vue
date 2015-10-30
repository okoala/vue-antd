<template lang="md">
# Spin

---

用于页面和区块的loading状态。

## 何时使用

页面局部处于等待数据渲染时。

## 组件演示

<demo>
  <example title="通过添加loading属性，可以进入加载状态">
    <v-spin size="large" :hide="!loading">
      <div style="text-align: center;">
        <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" width="200px" height="200px" />
        <div>我是一张图片</div>
      </div>
    </v-spin>
    <br>
    <div style="text-align: center">
      <v-button type="primary" @click="_enterLoading">点击切换</v-button>
    </div>
  </example>
  <example title="作为页面元素使用">
    <div>
      <v-spin></v-spin>
    </div>
  </example>
</demo>

## API

| 参数       | 类型            | 默认值       |说明           |
|-----------|----------------|-------------|--------------|
| size        | enum      | default       | spin组件中点的大小，可选值为small default large
</template>

<script>
import vSpin from '../../src/components/spin'
import vButton from '../../src/components/button'

export default {
  data () {
    return {
      loading: true
    }
  },

  components: { vSpin, vButton },

  methods: {
    _enterLoading () {
      this.loading = !this.loading
    }
  }

}

</script>
