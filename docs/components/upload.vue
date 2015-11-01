<template lang="md">
# Upload

---

文件选择上传和拖拽上传控件。

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## 组件演示

<demo>
  <example title="点击上传">
    <v-upload :name="name" :action="action" :on-change="onChange">
      <v-button type="ghost">
        <v-icon type="upload"></v-icon> 点击上传
      </v-button>
    </v-upload>
  </example>
  <example title="传入已上传的文件">
    <v-upload :name="name" :action="action" :default-file-list="defaultFileList" :on-change="onChange">
      <v-button type="ghost">
        <v-icon type="upload"></v-icon> 点击上传
      </v-button>
    </v-upload>
  </example>
  <example title="拖拽上传1">
    <v-upload :name="name" :action="action" type="drag" :on-change="onChange">
      <p class="ant-upload-drag-icon">
        <v-icon type="inbox"></v-icon>
      </p>
      <p class="ant-upload-text">点击或将文件拖拽到此区域上传</p>
      <p class="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
    </v-upload>
  </example>
  <example title="拖拽上传2">
    <div style="width: 246px; height: 146px">
      <v-upload :name="name" :action="action" type="drag" :on-change="onChange">
        <v-icon type="plus"></v-icon>
      </v-upload>
    </div>
  </example>
  <example title="多文件选择">
    <v-upload :name="name" :action="action" :multiple="true" :on-change="onChange">
      <v-button type="ghost">
        <v-icon type="upload"></v-icon> 点击上传
      </v-button>
    </v-upload>
  </example>
</demo>

## API

| 参数       | 说明                                                         | 类型        | 默认值|
|------------|--------------------------------------------------------------| ----------- |-------|
| name       | 可选参数, 上传的文件                                         | String      | file  |
| action     | 必选参数, 上传的地址                                         | String      | 无    |
| data       | 可选参数, 上传所需参数                                       | Object      | 无    |
| multiple   | 可选参数, 是否支持多选文件，支持 `ie10+`                     | Boolean     | false |
| accept     | 可选参数, 接受上传的文件类型, 详见 input accept Attribute    | String      | 无    |
| onChange   | 可选参数, 上传文件改变时的状态，详见 onChange                | Function    | 无    |

### onChange

文件状态改变的回调，返回为：

```js
{
  file: { ... },
  fileList: [ ... ],
  event: { ... }
}
```

1. `file` 当前操作的文件对象。

   ```js
   {
      uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png'   // 文件名
      status: 'done',  // 状态有：uploading done error removed
      response: '{"status":"success"}'  // 服务端响应内容
   }
   ```

   如果上传控件是 multiple 时，此参数将为一个对象数组 `[file, ...]`。

2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

## 显示下载链接

请使用 fileList 属性设置数组项的 url 属性进行展示控制。

## IE note

- [https://github.com/react-component/upload#ie89-note](https://github.com/react-component/upload#ie89-note)
</template>

<script>
import vUpload from '../../components/upload'
import vIcon from '../../components/iconfont'
import vButton from '../../components/button'

export default {
  data () {
    return {
      name: 'file',
      action: '/upload',
      onChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          console.log(info.file.name + ' 上传成功.')
        } else if (info.file.status === 'error') {
          console.log(info.file.name + ' 上传失败.')
        }
      },
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png'
      }, {
        uid: -2,
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png'
      }]
    }
  },

  components: { vUpload, vIcon, vButton }
}

</script>
