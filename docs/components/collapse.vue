<template lang="md">
# Collapse

---

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## 组件演示

<demo>
  <example title="折叠面板">
    <v-collapse :default-active-key="['1']" :on-change="_onChange">
      <v-panel header="This is panel header 1" key="1">
        <p>{{text}}</p>
      </v-panel>
      <v-panel header="This is panel header 2" key="2">
        <p>{{text}}</p>
      </v-panel>
      <v-panel header="This is panel header 3" key="3">
        <p>{{text}}</p>
      </v-panel>
    </v-collapse>
  </example>
  <example title="手风琴">
    <v-collapse :accordion="true">
      <v-panel header="This is panel header 1" key="1">
        <p>{{text}}</p>
      </v-panel>
      <v-panel header="This is panel header 2" key="2">
        <p>{{text}}</p>
      </v-panel>
      <v-panel header="This is panel header 3" key="3">
        <p>{{text}}</p>
      </v-panel>
    </v-collapse>
  </example>
  <example title="面板嵌套">
    <v-collapse :on-change="_onChange" :accordion="true">
      <v-panel header="This is panel header 1" key="1">
        <v-collapse default-active-key="1">
          <v-panel header="This is panel nest panel" key="1">
            <p>{{text}}</p>
          </v-panel>
        </v-collapse>
      </v-panel>
      <v-panel header="This is panel header 2" key="2">
        <p>{{text}}</p>
      </v-panel>
      <v-panel header="This is panel header 3" key="3">
        <p>{{text}}</p>
      </v-panel>
    </v-collapse>
  </example>
</demo>

## API

### Collapse

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| activeKey        | 当前激活 tab 面板的 key| Array or String   | 默认无，accordion模式下默认第一个元素|
| defaultActiveKey | 初始化选中面板的 key | String   | 无 |
| onChange         | 切换面板的回调                               | Function | 无                              |


### Collapse.Panel

| 参数 | 说明             | 类型                    | 默认值 |
|------|------------------|-------------------------|--------|
| key  | 对应 activeKey   | String                  | 无     |
| header | 面板头内容 | React.Element or String | 无     |
</template>

<script>
import vCollapse, { vPanel } from '../../components/collapse'
import message from '../../components/message'

export default {
  data () {
    return {
      text: `
          A dog is a type of domesticated animal.
          Known for its loyalty and faithfulness,
          it can be found as a welcome guest in many households across the world.
        `
    }
  },

  components: { vCollapse, vPanel },

  methods: {
    _onChange (key) {
      message.info(key)
    }
  }
}

</script>
