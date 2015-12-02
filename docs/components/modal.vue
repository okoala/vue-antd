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
      :on-ok="_handleOk"
      :on-cancel="_handleCancel">
      <p>对话框的内容</p>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
    </v-modal>
  </example>
  <example title="异步关闭">
    <v-button type="primary" @click="_showModal2">显示对话框</v-button>
    <v-modal title="对话框标题"
      :visible="visible2"
      :confirm-loading="confirmLoading"
      :on-ok="_handleOk2"
      :on-cancel="_handleCancel2">
      <p>{{modalText}}</p>
    </v-modal>
  </example>
  <example title="确认对话框">
    <v-button @click="_showConfirm">确认对话框</v-button>
  </example>
  <example title="确认对话框">
    <v-button @click="_showConfirm2">确认对话框</v-button>
  </example>
  <example title="确认对话框">
    <v-button @click="info">信息提示</v-button>
    <v-button @click="success">成功提示</v-button>
    <v-button @click="error">失败提示</v-button>
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

const confirm = vModal.confirm
const info = vModal.info
const success = vModal.success
const error = vModal.error

export default {
  data () {
    return {
      modalText: '对话框的内容',
      confirmLoading: false,
      visible: false,
      visible2: false
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
      this.visible = false
    },

    _showModal2 () {
      this.visible2 = true
    },

    _handleOk2 () {
      message.success('点击了确定')
      this.modalText = '对话框将在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible2 = false
        this.confirmLoading = false
      }, 2000)
    },

    _handleCancel2 () {
      message.info('点击了取消')
      this.visible2 = false
    },

    _showConfirm () {
      confirm({
        title: '您是否确认要删除这项内容',
        content: '一些解释',
        onOk: function() {
          console.log('确定')
        },
        onCancel: function() {}
      })
    },

    _showConfirm2 () {
      confirm({
        title: '您是否确认要删除这项内容',
        content: '点确认 1 秒后关闭',
        onOk: function() {
          return new Promise(function(resolve) {
            setTimeout(resolve, 1000)
          })
        },
        onCancel: function() {}
      })
    },

    info() {
      info({
        title: '这是一条通知信息',
        content: '一些附加信息一些附加信息一些附加信息',
        onOk: function() {}
      })
    },

    success() {
      success({
        title: '这是一条通知信息',
        content: '一些附加信息一些附加信息一些附加信息'
      })
    },

    error() {
      error({
        title: '这是一条通知信息',
        content: '一些附加信息一些附加信息一些附加信息'
      })
    }
  }
}

</script>

<style scoped>
.code-box-demo .ant-btn {
  margin-right: 8px;
}
</style>
