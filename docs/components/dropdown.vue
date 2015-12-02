<template lang="md">
# Dropdown

---

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## 组件演示

<demo>
  <example title="基本">
    <v-dropdown>
      <div slot="overlay">
        <ul class="ant-dropdown-menu ant-dropdown-menu-vertical  ant-dropdown-menu-light ant-dropdown-menu-root">
          <li class="ant-dropdown-menu-item"><a target="_blank" href="http://www.alipay.com/">第一个菜单项</a></li>
          <li class="ant-dropdown-menu-item"><a target="_blank" href="http://www.taobao.com/">第二个菜单项</a></li>
          <li class="ant-dropdown-menu-item"><a target="_blank" href="http://www.tmall.com/">第三个菜单项</a></li>
        </ul>
      </div>
      <v-button>
        某按钮 <v-icon type="down"></v-icon>
      </v-button>
    </v-dropdown>
  </example>
</demo>

## API

属性如下

| 成员        | 说明             | 类型               | 默认值       |
|-------------|------------------|--------------------|--------------|
| trigger     | 触发下拉的行为   | "click" or "hover" | hover        |
| overlay     | 菜单节点         | React.Element      | 无           |
| onSelect    | 选择后的回调     | function(e) {}     | 无           |


菜单可由 `antd.Menu` 取得，可设置 `onSelect` 回调，菜单还包括菜单项 `antd.Menu.Item`，分割线 `antd.Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
</template>

<script>
import vDropdown from '../../components/dropdown'
import vButton from '../../components/button'
import vIcon from '../../components/iconfont'

export default {
  components: { vDropdown, vButton, vIcon },

  methods: {

  }
}

</script>
