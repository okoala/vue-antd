<template lang="md">
# Menu

---

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

## 组件演示

<demo>
  <example title="顶部导航">
    <v-menu :on-click="handleClick"
      :selected-keys="[this.current]"
      :mode="horizontal">
      <v-menu-item key="mail">
        <v-menu type="mail" />导航一
      </v-menu-item>
      <v-menu-item key="app" disabled>
        <v-icon type="appstore"></v-icon>导航二
      </v-menu-item>
      <v-sub-menu>
        <span slot="title"><v-icon type="setting"></v-icon>导航 - 子菜单</span>
        <v-menu-item key="setting:1">选项1</v-menu-item>
        <v-menu-item key="setting:2">选项2</v-menu-item>
        <v-menu-item key="setting:3">选项3</v-menu-item>
        <v-menu-item key="setting:4">选项4</v-menu-item>
      </v-sub-menu>
      <v-menu-item key="alipay">
        <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
      </v-menu-item>
    </v-menu>
  </example>
</demo>

## API

### Menu props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| mode    | 菜单类型 | enum: 'vertical', 'horizontal', 'inline' | vertical |
| selectedKeys | 当前选中的菜单项 key 数组 |  |      |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 |  |      |
| openKeys | 当前展开的菜单项 key 数组 |  |      |
| defaultOpenKeys | 初始展开的菜单项 key 数组 |  |      |
| onSelect | 被选中时调用，参数 {item, key, selectedKeys} 对象 | function | 无   |
| onDeselect | 取消选中时调用，参数 {item, key, selectedKeys} 对象，仅在 multiple 生效 | function | 无   |
| onClick | 点击 menuitem 调用此函数，参数为 {item, key} | function | 无 |
| style | 根节点样式 | object | | |

### Menu.Item props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| disabled    | 是否禁用 | Boolean   |  false  |
| key   | item 的唯一标志 |  String |  | |

### Menu.SubMenu props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 子菜单项值 | String or React.Element   |    |
| children   | (MenuItem or SubMenu)[] |  子菜单的菜单项 | | |
</template>

<script>
import vMenu, { vSubMenu, vMenuItem } from '../../components/menu'
import vIcon from '../../components/iconfont'

export default {
  data () {
    return {
      current: '1'
    }
  },

  components: { vMenu, vSubMenu, vMenuItem, vIcon },

  methods: {
    handleClick (e) {
      console.log('click ', e)
      this.current = e.key
    }
  }
}

</script>
