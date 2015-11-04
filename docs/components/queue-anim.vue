<template lang="md">
# QueueAnim

---

通过简单的配置对一组元素添加串行的进场动画效果。

## 何时使用

- 从内容A到内容B的转变过程时能有效的吸引用户注意力，突出视觉中心，提高整体视觉效果。

- 小的信息元素排布或块状较多的情况下，根据一定的路径层次依次进场，区分维度层级，来凸显量级，使页面转场更加流畅和舒适，提高整体视觉效果和产品的质感。

- 特别适合首页和需要视觉展示效果的宣传页，以及单页应用的切换页面动效。

## 组件演示

<demo>
  <example title="默认">
    <v-queue-anim :delay="1000">
      <div key="a">依次进场</div>
      <div key="b">依次进场</div>
      <div key="c">依次进场</div>
      <div key="d">依次进场</div>
      <div key="e">依次进场</div>
      <div key="f">依次进场</div>
    </v-queue-anim>
  </example>
  <example title="进场和离场">
    <v-queue-anim :show="show" class="demo-content">
      <div class="demo-kp" key="a">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="demo-listBox" key="b">
        <div class="demo-list">
          <div class="title"></div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </v-queue-anim>
    <p class="buttons">
      <v-button type="primary" @click="_handleClick">切换</v-button>
    </p>
  </example>
  <example title="进场和离场">
    <v-queue-anim class="demo-content" key="demo"
      :show="show"
      :type="['right', 'left']"
      :ease="['easeOutQuart', 'easeInOutQuart']">
      <div class="demo-kp" key="a">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="demo-listBox" key="b">
        <div class="demo-list">
          <div class="title"></div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </v-queue-anim>
    <p class="buttons">
      <v-button type="primary" @click="_handleClick">切换</v-button>
    </p>
  </example>
  <example title="自定义动画进出场">
    <v-queue-anim class="demo-content"
      :show="show"
      :anim-config="[{ opacity: [1, 0], translateY: [0, 50] },{ opacity: [1, 0], translateY: [0, -50] }]">
      <div class="demo-kp" key="a">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="demo-listBox" key="b">
        <div class="demo-list">
          <div class="title"></div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </v-queue-anim>
    <p class="buttons">
      <v-button type="primary" @click="_handleClick">切换</v-button>
    </p>
  </example>
  <example title="表单动画进出场">
    <v-queue-anim class="ant-form-horizontal" component="form" type="bottom"
      :leave-reverse="true"
      :show="show">
      <div class="ant-form-item ant-form-item-compact" key='name'>
        <label htmlFor="userName" class="col-6" required>用户名：</label>
        <div class="col-6">
          <p class="ant-form-text">大眼萌 minion</p>
        </div>
      </div>
      <div class="ant-form-item" key='password'>
        <label htmlFor="password" class="col-6" required>密码：</label>
        <div class="col-14">
          <input class="ant-input" type="password" id="password" placeholder="请输入密码"/>
        </div>
      </div>
      <div class="ant-form-item" key='remark'>
        <label htmlFor="remark" class="col-6" required>备注：</label>
        <div class="col-14">
          <textarea class="ant-input" id="remark" placeholder="随便写"></textarea>
          <p class="ant-form-explain">随便写点什么</p>
        </div>
      </div>
      <div class="ant-form-item ant-form-item-compact" key='checkbox'>
        <div class="col-14 col-offset-6">
          <label>
            <v-checkbox>同意</v-checkbox>
          </label>
        </div>
      </div>
      <div class="row" key='btn'>
        <div class="col-16 col-offset-6">
          <v-button type="primary">确定</v-button>
        </div>
      </div>
    </v-queue-anim>
    <p class="buttons">
      <v-button type="primary" @click="_handleClick">切换</v-button>
    </p>
  </example>
  <example title="添加与删除">
    <div class="demo-content">
        <div class="demo-listBox" key="b">
          <div class="demo-list">
            <div class="title"></div>
            <v-queue-anim component="ul" :type="['right', 'left']" :watch-value="items" :show="show">
              <li v-for="item in items" :key="Date.now()"></li>
            </v-queue-anim>
          </div>
        </div>
    </div>
    <p class="buttons">
      <v-button type="primary" @click="_handleClick">切换</v-button>
      <v-button @click="_handleAdd" style="margin-left: 10px">添加</v-button>
      <v-button @click="_handleRemove" style="margin-left: 10px">删除</v-button>
    </p>
  </example>
  <example title="一个复杂些的例子">
    <v-queue-anim
      :show="show"
      :type="['right', 'left']">
      <div class="demo-header" key="header">
        <div class="logo">
          <img width="30" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
          <span>logo</span>
        </div>
        <v-queue-anim component="ul">
          <li key="0"></li>
          <li key="1"></li>
          <li key="2"></li>
          <li key="3"></li>
          <li key="4"></li>
        </v-queue-anim>
      </div>,
      <v-queue-anim class="demo-content" key="content" :delay="300">
        <div class="demo-title" key="title">我是标题</div>
        <v-queue-anim class="demo-kp" key="b">
          <v-queue-anim component="ul">
            <li key="0"></li>
            <li key="1"></li>
            <li key="2"></li>
          </v-queue-anim>
        </v-queue-anim>
        <div class="demo-title" key="title2">我是标题</div>
        <div class="demo-listBox">
          <v-queue-anim class="demo-list"
            :delay="500">
            <div class="title" key="title3"></div>
            <v-queue-anim component="ul" type="bottom" key="li">
              <li key="0"></li>
              <li key="1"></li>
              <li key="2"></li>
              <li key="3"></li>
              <li key="4"></li>
            </v-queue-anim>
          </v-queue-anim>
        </div>
      </v-queue-anim>
      <v-queue-anim type="bottom"
        :delay="1000" key="footerBox">
        <div class="demo-footer" key="footer"></div>
      </v-queue-anim>
    </v-queue-anim>
    <p class="buttons">
      <v-button type="primary" @click="_handleClick">切换</v-button>
    </p>
  </example>
</demo>

## API

元素依次进场。

```html
<v-queue-anim>
  <div key='demo1'>依次进场</div>
  <div key='demo2'>依次进场</div>
  <div key='demo3'>依次进场</div>
  <div key='demo4'>依次进场</div>
</v-queue-anim>
```

> 每个子标签必须带 key，如果未设置 key 将不执行动画。

|参数        |类型             |默认     |详细             |
|------------|----------------|---------|----------------|
| type       | string / array | `right` | 动画内置参数 <br/> `left` `right` `top` `bottom` `scale` `scaleBig` `scaleX` `scaleY`|
| animConfig | object / array | null    | 配置动画参数 <br/> 如 `{opacity:[1, 0],translateY:[0, -30]}` 具体参考 [velocity](http://julian.com/research/velocity) 的写法|
| delay      | number / array | 0       | 整个动画的延时,以毫秒为单位 |
| duration   | number / array | 500     | 每个动画的时间,以毫秒为单位  |
| interval   | number / array | 100     | 每个动画的间隔时间,以毫秒为单位  |
| leaveReverse | boolean      | false   | 出场时是否倒放,从最后一个 dom 开始往上播放 |
| ease       | string / array | `easeOutQuart` | 动画的缓动函数,[查看详细](http://julian.com/research/velocity/#easing) |
| animatingClassName | array | `['queue-anim-entering', 'queue-anim-leaving']` | 进出场动画进行中的类名 |
| component  | string | `div` | QueueAnim 替换的标签名 |

> 当以上数据类型为 Array 时，`['left', 'top']` 第一个为进场动画属性, 第二个为离场属性。

</template>

<script>
import vQueueAnim from '../../components/queue-anim'
import vButton from '../../components/button'
import vCheckbox from '../../components/checkbox'


export default {
  data () {
    return {
      items: ['1', '2', '3'],
      show: true
    }
  },

  components: { vQueueAnim, vButton, vCheckbox },

  methods: {
    _handleClick () {
      this.show = !this.show
    },

    _handleAdd () {
      const len = this.items.length
      this.items.push(`${len}`)
    },

    _handleRemove () {
      this.items.pop()
    }
  }

}

</script>

<style scoped>
.code-box-demo .demo-header {
  width: 100%;
  background: #ebedee;
  height: 30px;
}
.code-box-demo .demo-header ul {
  float: right;
  margin-right: 5px;
}
.code-box-demo .demo-header ul li {
  width: 50px;
  height: 30px;
  float: left;
  background: #e4e4e4;
  margin-left: 5px;
}
.code-box-demo .demo-header ul li:before {
  margin: 10px auto;
  width: 20px;
  height: 10px;
  background: #ebeded;
}
.code-box-demo .demo-header .logo {
  float: left;
  margin: 0px auto 0 10px;
  line-height: 32px;
}
.code-box-demo .demo-header .logo img{
  margin:auto
}
.code-box-demo .demo-header .logo span {
  display: block;
  float: right;
}
.code-box-demo .demo-content {
  width: 80%;
  margin: 10px auto;
}
.code-box-demo .demo-content .demo-title {
  text-align:left;
  background: #a4a4a4;
  width: 40%;
  height: 20px;
  line-height: 20px;
  color: #ebeded;
  text-indent:10px
}
.code-box-demo .demo-content .demo-listBox {
  margin-top: 10px;
}
.code-box-demo .demo-content .demo-listBox .demo-list .title {
  height: 30px;
  background: #cacaca;
  overflow: hidden;
}
.code-box-demo .demo-content .demo-listBox .demo-list .title:before,.code-box-demo .demo-content .demo-listBox .demo-list .title:after{
  width: 30%;
  height: 5px;
  background: #ebeded;
  float:left;
  margin:12px 35px 0;
}
.code-box-demo .demo-content .demo-listBox .demo-list .title:after{
  width:15%;
  float:right;
  margin:12px 10px 0;

}
.code-box-demo .demo-content .demo-listBox .demo-list ul li {
  height: 25px;
  background: #ebeded;
  border-bottom: 1px solid #cacaca;
  overflow: hidden;
  padding: 5px 15px;
}
.code-box-demo .demo-content .demo-listBox .demo-list ul li:before {
  width: 10px;
  height: 5px;
  background: #cacaca;
  float: left;
  margin-top:4px
}
.code-box-demo .demo-content .demo-listBox .demo-list ul li:after {
  width: 50%;
  height: 5px;
  background: #cacaca;
  float: left;
  margin-left: 10px;
  margin-top: 4px;
}
.code-box-demo .demo-content .demo-kp {
  margin: 10px auto;
}
.code-box-demo .demo-content .demo-kp ul li {
  display: inline-block;
  width: 30%;
  height: 40px;
  background: #cacaca;
  color: #ebeded;
  text-align: left;
  padding: 10px;
  margin-right: calc(2%);
}
.code-box-demo .demo-content .demo-kp ul li:last-child {
  margin-right: 0%;
}
.code-box-demo .demo-content .demo-kp ul li:after {
  width: 60%;
  height: 5px;
  background: #ebeded;
  float: left;
  margin-top: 7px;
}
.code-box-demo .demo-content .demo-kp ul li:before {
  background: #ebeded;
  float: left;
  width: 15px;
  height: 15px;
  margin:2px 10% 0 0;

}
.code-box-demo .demo-footer {
  margin-top: 10px;
  background: #cacaca;
  height: 40px;
  float: left;
  width: 100%;
  display: table;
}
.code-box-demo .demo-footer:before {
  width: 60%;
  height: 5px;
  background: #ededed;
  margin: 10px auto 0;
}
.code-box-demo .demo-footer:after {
  width: 30%;
  height: 5px;
  background: #ededed;
  margin: 5px auto;
}
.code-box-demo .demo-header ul li:before,
.code-box-demo .demo-content .demo-kp ul li:before,
.code-box-demo .demo-content .demo-kp ul li:after,
.code-box-demo .demo-content .demo-listBox .demo-list .title:before,
.code-box-demo .demo-content .demo-listBox .demo-list .title:after,
.code-box-demo .demo-content .demo-listBox .demo-list ul li:before,
.code-box-demo .demo-content .demo-listBox .demo-list ul li:after,
.code-box-demo .demo-footer:before,
.code-box-demo .demo-footer:after {
  display: block;
  content: "";
}
.code-box-demo .buttons {
  text-align: center;
  padding-top: 20px;
  clear: both;
}
.demo-list ul li {
    height: 25px;
    background: #ebeded;
    border-bottom: 1px solid #cacaca;
    overflow: hidden;
    padding: 5px 15px;
}
</style>
