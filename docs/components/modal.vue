<template lang="md">
# Modal

---

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的确认框询问用户时，可以使用精心封装好的 `ant.Modal.confirm()` 等方法。

## 组件演示

<demo>
  <example title="基本">
    <v-button type="primary" @click="_showModal">显示对话框</v-button>
    <v-modal title="第一个 Modal"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :on-ok="_handleOk"
      :on-cancel="_handleCancel">
      <p>对话框的内容</p>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
    </v-modal>
  </example>
</demo>

## API

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| visible    | 对话框是否可见 | Boolean          | 无           |
| confirm-loading | 确定按钮 loading | Boolean    | 无           |
| title      | 标题           | slot node    | 无           |
| on-ok       | 点击确定回调       | function     | 无           |
| on-cancel   | 点击遮罩层或右上角叉或取消按钮的回调  | function  | 无           |
| width      | 宽度           | String or Number | 520           |
| ok-text          | 确定文本     | String | 确定           |
| cancel-text      | 取消文本     | String | 取消           |


### Modal.xxx()

包括：

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| title      | 标题           | React.Element or String    | 无           |
| on-ok       | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭      | function         | 无           |
| on-cancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭       | function         | 无           |
| width      | 宽度           | String or Number | 416           |
| iconClassName | 图标 Icon 类型 | String | question-circle |
</template>

<script>
import vButton from '../../components/button'
import vModal from '../../components/modal'
import message from '../../components/message'

export default {
  data () {
    return {
      confirmLoading: true,
      visible: false
    }
  },

  components: { vModal, vButton },

  methods: {
    _showModal () {
      this.visible = true
    },

    _handleOk () {
      message.success('点击了确定')
      this.confirmLoading = false
      this.visible = false
    },

    _handleCancel () {
      message.info('点击了取消')
      this.visible = true
    }
  }
}

</script>

<style scoped>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>
