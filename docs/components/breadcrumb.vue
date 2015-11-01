<template lang="md">
# Breadcrumb

---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户“你在哪里”时；
- 当需要向上导航的功能时。

## 组件演示

<demo>
  <example title="基本">
    <v-breadcrumb>
      <v-breadcrumb-item>首页</v-breadcrumb-item>
      <v-breadcrumb-item :href="'#'">应用中心</v-breadcrumb-item>
      <v-breadcrumb-item :href="'#'">应用列表</v-breadcrumb-item>
      <v-breadcrumb-item>某应用</v-breadcrumb-item>
    </v-breadcrumb>
  </example>
  <example title="带图标">
    <v-breadcrumb>
      <v-breadcrumb-item><v-icon :type="'home'"></v-icon>首页</v-breadcrumb-item>
      <v-breadcrumb-item><v-icon :type="'user'"></v-icon>应用列表</v-breadcrumb-item>
      <v-breadcrumb-item>应用</v-breadcrumb-item>
    </v-breadcrumb>
  </example>
</demo>

## API

### Breadcrumb

| 参数      | 说明                                     | 类型       |  可选值 | 默认值 |
|-----------|------------------------------------------|------------|---------|--------|
| router    | 可传入 react-router 的实例               | Object     |         | -      |
| routes    | router 的路由栈信息                      | Array      |         | -      |
| params    | 路由的参数                               | Object     |         | -      |

### Breadcrumb.Item

| 参数      | 说明                                     | 类型       |  可选值 | 默认值 |
|-----------|------------------------------------------|------------|---------|--------|
| href      | 链接，如不传则不可点击                   | string     |         | -      |
</template>

<script>
import vBreadcrumb, { BreadcrumbItem as vBreadcrumbItem } from '../../components/breadcrumb'
import vIcon from '../../components/iconfont'

export default {

  components: { vBreadcrumb, vBreadcrumbItem, vIcon }

}

</script>
