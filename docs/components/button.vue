<template lang="md">
# Button

---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 如何使用

- 通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`

- 按钮的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
type | 设置按钮类型，可选值为 `primary` `ghost` 或者不设 | Enum | undefined
htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 HTML标准 | Enum | `button`
shape | 设置按钮形状，可选值为 `circle` `circle-outline` 或者不设 | Enum | undefined
size | 设置按钮大小，可选值为 `sm` `lg` 或者不设 | Enum | undefined
loading | 设置按钮载入状态，存在为 `true`，不存在为 `false`，或直接设置值，如：`loading="true"` | Bool | false
onClick | `click` 事件的 handler | Function | `function() {}`

- `<Button>Hello world!</Button>` 最终会被渲染为 `<button>Hello world!</button>`，并且除了上表中的属性，其它属性都会直接传到 `<button></button>`

## 组件演示

<demo>
  <example title="按钮类型">
    <v-button type="primary">主按钮</v-button>
    <v-button>次按钮</v-button>
    <v-button type="ghost">幽灵按钮</v-button>
  </example>
  <example title="按钮尺寸">
    <v-button type="primary" size="large">大号按钮</v-button>
    <v-button type="primary">中号按钮(默认)</v-button>
    <v-button type="primary" size="small">小号按钮</v-button>
  </example>
  <example title="按钮形状">
    <v-button type="primary" shape="circle" size="large">
      <v-icon type="search" />
    </v-button>
    <v-button type="primary" shape="circle">
      <v-icon type="search" />
    </v-button>
    <v-button type="primary" shape="circle" size="small">
      <v-icon type="search" />
    </v-button>
    <br />
    <v-button type="ghost" shape="circle-outline" size="large">
      <v-icon type="search" />
    </v-button>
    <v-button type="ghost" shape="circle-outline">
      <v-icon type="search" />
    </v-button>
    <v-button type="ghost" shape="circle-outline" size="small">
      <v-icon type="search" />
    </v-button>
  </example>
  <example title="按钮状态">
    <h4>使用 `disabled` 属性</h4>
    <v-button type="primary">主按钮</v-button>
    <v-button type="primary" disabled>主按钮(失效)</v-button>
    <br>
    <v-button>次按钮</v-button>
    <v-button disabled>次按钮(失效)</v-button>
    <br>
    <h4>使用 `.disabled` class</h4>
    <v-button type="ghost">幽灵按钮</v-button>
    <v-button type="ghost" class="disabled">幽灵按钮(失效)</v-button>
  </example>
  <example title="按钮加载中">
    <v-button type="primary" :loading="true" size="large">加载中</v-button>
    <v-button type="primary" :loading="true">加载中</v-button>
    <v-button type="primary" :loading="true" size="small">加载中</v-button>
    <v-button type="primary" :loading="loading" @click="_enterLoading">点击变加载</v-button>
  </example>
  <example title="按钮组合">
    <h4>基本组合</h4>
    <v-button-group>
      <v-button type="primary">确定</v-button>
      <v-button type="primary">取消</v-button>
    </v-button-group>
    <v-button-group>
      <v-button>左</v-button>
      <v-button>中</v-button>
      <v-button>右</v-button>
    </v-button-group>
    <v-button-group>
      <v-button type="primary">左</v-button>
      <v-button type="ghost">中</v-button>
      <v-button type="ghost">中</v-button>
      <v-button>右</v-button>
    </v-button-group>

    <h4>带图标按钮组合 </h4>
    <v-button-group>
      <v-button type="primary">
        <v-icon type="left"></v-icon>
        <span>后退</span>
      </v-button>
      <v-button type="primary">
        前进
        <v-icon type="right"></v-icon>
      </v-button>
    </v-button-group>
    <v-button-group>
      <v-button type="primary">
        <v-icon type="cloud"></v-icon>
      </v-button>
      <v-button type="primary">
        <v-icon type="cloud-download"></v-icon>
      </v-button>
    </v-button-group>

    <h4>多个组合</h4>
    <v-button-group>
      <v-button type="ghost">1</v-button>
      <v-button type="ghost">2</v-button>
      <v-button type="ghost">3</v-button>
      <v-button type="ghost">4</v-button>
      <v-button type="ghost">
        <span>前进</span>
        <v-icon type="right"></v-icon>
      </v-button>
    </v-button-group>

    <h4>尺寸</h4>
    <v-button-group size="large">
      <v-button type="ghost">大</v-button>
      <v-button type="ghost">大</v-button>
      <v-button type="ghost">大</v-button>
    </v-button-group>
    <v-button-group>
      <v-button type="ghost">默认</v-button>
      <v-button type="ghost">默认</v-button>
      <v-button type="ghost">默认</v-button>
    </v-button-group>
    <v-button-group size="small">
      <v-button type="ghost">小</v-button>
      <v-button type="ghost">小</v-button>
      <v-button type="ghost">小</v-button>
    </v-button-group>
  </example>
  <example title="图标按钮">
    <v-button type="primary" shape="circle" size="large">
      <v-icon type="search"></v-icon>
    </v-button>
    <v-button type="primary" size="large">
      <v-icon type="search"></v-icon>
      <span>大按钮</span>
    </v-button>

    <br>

    <v-button type="primary" shape="circle">
      <v-icon type="search"></v-icon>
    </v-button>
    <v-button type="primary">
      <v-icon type="search"></v-icon>
      <span>中按钮</span>
    </v-button>

    <br>

    <v-button type="primary" shape="circle" size="small">
      <v-icon type="search"></v-icon>
    </v-button>
    <v-button type="primary" size="small">
      <v-icon type="search"></v-icon>
      <span>小按钮</span>
    </v-button>

    <br>

    <v-button type="ghost" shape="circle-outline" size="large">
      <v-icon type="search" />
    </v-button>
    <v-button type="ghost" shape="circle-outline">
      <v-icon type="search" />
    </v-button>
    <v-button type="ghost" shape="circle-outline" size="small">
      <v-icon type="search" />
    </v-button>
  </example>
</demo>
</template>

<script>
import vButton, { vButtonGroup } from '../../components/button'
import vIcon from '../../components/iconfont'

export default {
  data () {
    return {
      loading: false
    }
  },

  components: { vButton, vButtonGroup, vIcon },

  methods: {
    _enterLoading () {
      this.loading = true
    }
  }
}

</script>

<style scoped>
#components-button-demo-icon .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}

#components-button-demo-button-group .ant-btn {
    margin-bottom: 12px;
    margin-right: 0;
}
</style>
