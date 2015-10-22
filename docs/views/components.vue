<template>
<div class="main-wrapper">
  <aside class="aside-container">
    <ul>
      <li>
        <a v-link="{path: '/docs/introduce'}" class="">
          Ant Design of Vue
          <span class="chinese"></span>
        </a>
      </li>
      <li>
        <a v-link="{path: '/docs/getting-started'}" class="">
          快速上手
          <span class="chinese"></span>
        </a>
      </li>
      <li>
        <a v-link="{path: '/docs/download'}" class="">
          下载
          <span class="chinese"></span>
        </a>
      </li>
      <li>
        <h4>Components</h4>
        <ul>
          <li class="type-divider">基本</li>
          <li v-for="component in componentsMenu.base">
            <a v-link="{path: component.name, append: true}">
              {{component.name | Upper}}
              <span class="chinese">{{component.desc}}</span>
            </a>
          </li>
          <li class="type-divider">表单</li>
          <li v-for="component in componentsMenu.form">
            <a v-link="{path: component.name, append: true}">
              {{component.name | Upper}}
              <span class="chinese">{{component.desc}}</span>
            </a>
          </li>
          <li class="type-divider">展示</li>
          <li v-for="component in componentsMenu.show">
            <a v-link="{path: component.name, append: true}">
              {{component.name | Upper}}
              <span class="chinese">{{component.desc}}</span>
            </a>
          </li>
          <li class="type-divider">导航</li>
          <li v-for="component in componentsMenu.pagination">
            <a v-link="{path: component.name, append: true}">
              {{component.name | Upper}}
              <span class="chinese">{{component.desc}}</span>
            </a>
          </li>
          <li class="type-divider">其他</li>
          <li v-for="component in componentsMenu.other">
            <a v-link="{path: component.name, append: true}">
              {{component.name | Upper}}
              <span class="chinese">{{component.desc}}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
  <section class="main-container">
    <router-view class="view" keep-alive></router-view>
  </section>
</div>
</template>

<script>

export default {
  data () {
    return {
      componentsMenu: {
        base: [{
          name: 'button',
          desc: '按钮'
        }, {
          name: 'iconfont',
          desc: '字体图标'
        }, {
          name: 'layout',
          desc: '布局'
        }],
        form: [{
          name: 'checkbox',
          desc: '多选框'
        }, {
          name: 'datepicker',
          desc: '日期选择框'
        }, {
          name: 'form',
          desc: '表单'
        }, {
          name: 'input-number',
          desc: '数字输入框'
        }, {
          name: 'radio',
          desc: '单选框'
        }, {
          name: 'select',
          desc: '选择器'
        }, {
          name: 'slider',
          desc: '滑动输入条'
        }, {
          name: 'switch',
          desc: '开关'
        }, {
          name: 'upload',
          desc: '文件上传'
        }, {
          name: 'validation',
          desc: '表单验证'
        }],
        show: [{
          name: 'alert',
          desc: '警告提示'
        }, {
          name: 'badge',
          desc: '徽标数'
        }, {
          name: 'carousel',
          desc: '走马灯'
        }, {
          name: 'collapse',
          desc: '折叠面板'
        }, {
          name: 'dropdown',
          desc: '下拉菜单'
        }, {
          name: 'message',
          desc: '全局提示'
        }, {
          name: 'modal',
          desc: '对话框'
        }, {
          name: 'notification',
          desc: '通知提醒框'
        }, {
          name: 'popconfirm',
          desc: '气泡确认框'
        }, {
          name: 'popover',
          desc: '气泡卡片'
        }, {
          name: 'progress',
          desc: '进度条'
        }, {
          name: 'table',
          desc: '表格'
        }, {
          name: 'tag',
          desc: '标签'
        }, {
          name: 'timeline',
          desc: '时间轴'
        }, {
          name: 'tooltip',
          desc: '文字提示'
        }, {
          name: 'tree',
          desc: '树形控件'
        }],
        pagination: [{
          name: 'breadcrumb',
          desc: '面包屑'
        }, {
          name: 'menu',
          desc: '导航菜单'
        }, {
          name: 'pagination',
          desc: '分页'
        }, {
          name: 'steps',
          desc: '步骤条'
        }, {
          name: 'tabs',
          desc: '标签页'
        }],
        other: [{
          name: 'affix',
          desc: '固钉'
        }, {
          name: 'enter-animation',
          desc: '进场动画'
        }]
      }
    }
  },

  filters: {
    Upper (str) {
      let arr = str.split('-')

      return arr.map(item => {
        return item.substring(0, 1).toUpperCase() + item.substring(1)
      }).join('')
    }
  }
}

</script>

<style>
.main-container {
  margin-left: 260px;
  padding: 30px 40px 120px;
  -webkit-animation: xRightMatrix .5s ease-out;
  animation: xRightMatrix .5s ease-out;
  background: #fff;
  min-height: 500px;
}

.main-container-center {
  margin: 0 auto;
  padding: 30px 80px 120px;
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  width: 80%;
  height: 100%;
}

.aside-container {
  width: 260px;
  background: #F9F9F9;
  padding-top: 10px;
  padding-bottom: 50px;
  float: left;
}

.aside-container > ul > li {
  overflow: hidden;
}

.aside-container li h4 {
  font-size: 14px;
  font-weight: 600;
  padding: 10px 0 10px 46px;
  margin: 0;
  color: #5C6B77;
  cursor: pointer;
  transition: background .5s, border .5s;
  border-left: 3px solid transparent;
  position: relative;
  z-index: 1;
  background: #F9F9F9;
  position: relative;
}

.aside-container li h4:after {
  position: absolute;
  top: 11px;
  right: 30px;
  content: "\e600";
  font-family: "anticon";
  transform: scale(0.6);
  font-size: 12px;
  color: #5C6B76;
  opacity: 0;
  -webkit-transform: scale(0.6) rotate(180deg);
  transform: scale(0.6) rotate(180deg);
  transition: all 0.3s ease;
}

.aside-container li[open=open] h4:after {
  -webkit-transform: scale(0.6) rotate(0deg);
  transform: scale(0.6) rotate(0deg);
}

.aside-container li:hover h4:after {
  opacity: 0.8;
}

.aside-container li > ul.aside-list-show {
  display: block;
}

.aside-container li > ul li {
  border-left: 3px solid transparent;
}

.aside-container li a {
  line-height: 40px;
  height: 40px;
  display: block;
  padding-left: 60px;
  font-size: 14px;
  color: #5C6B76;
}

.aside-container li.type-divider {
  font-size: 12px;
  -webkit-transform:  scale(0.9);
  transform: scale(0.9);
  transform-origin: 0 50%;
  color: #aaa;
  text-shadow: 0px 1px 0px #FFF;
  margin: 6px 0 6px 48px;
}

.aside-container > ul > li > a {
  padding-left: 46px;
  font-size: 14px;
  border-left: 3px solid transparent;
}

.aside-container > ul > li.current > a {
  border-left: 0;
}

.aside-container .chinese {
  font-size: 12px;
  margin-left: 6px;
  font-weight: normal;
  opacity: 0.67;
}

.aside-container li a:hover {
  color: #6EB4E0;
}

.aside-container .current {
  background: #fff;
  border-left: 3px solid #71B5DE;
  color: #71B5DE;
}

.aside-container .current a {
  color: #71B5DE;
}

.markdown {
  color: #777;
  font-size: 14px;
  line-height: 1.8;
  width: 80%;
}

.markdown img {
  vertical-align: middle;
}

.markdown h1 {
  color: #5C6B77;
  font-weight: 600;
}

.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  color: #5C6B77;
  margin: 1.8em 0 1em 0;
  font-weight: 600;
}

.markdown hr {
  border-radius: 10px;
  height: 3px;
  border: 0;
  background: #eee;
  margin: 20px 0;
}

.markdown code,
.markdown kbd,
.markdown pre,
.markdown samp {
  font-family: Consolas, monospace;
}

.markdown p,
.markdown pre {
  margin: 1.2em 0;
}

.markdown > ul li {
  list-style: circle;
  margin-left: 20px;
  padding-left: 8px;
}

.markdown > ol li {
  list-style: decimal;
  margin-left: 20px;
  padding-left: 8px;
}

.markdown code {
  margin: 0 3px;
}

.markdown pre {
  background: #F7F7F7;
  border-radius: 6px;
}

.markdown pre code {
  background: #F7F7F7;
  border: none;
  padding: 12px 20px;
  margin: 0;
}

.markdown strong,
.markdown b {
  font-weight: 600;
}

.markdown > table {
  border-collapse: collapse;
  border-spacing: 0px;
  empty-cells: show;
  border: 1px solid #e9e9e9;
  width: 100%;
  margin-bottom: 24px;
}

.markdown > table th {
  white-space: nowrap;
  color: #5C6B77;
  font-weight: 600;
}

.markdown > table th,
.markdown > table td {
  border: 1px solid #e9e9e9;
  padding: 8px 16px;
  text-align: left;
}

.markdown > table th {
  background: #F7F7F7;
}

.markdown blockquote {
  font-size: 90%;
  color: #999;
  border-left: 4px solid #e9e9e9;
  padding-left: 0.8em;
  margin: 0;
}

.markdown .anchor {
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-left: 8px;
}

.markdown h1:hover .anchor,
.markdown h2:hover .anchor,
.markdown h3:hover .anchor,
.markdown h4:hover .anchor,
.markdown h5:hover .anchor,
.markdown h6:hover .anchor {
  opacity: 1;
  display: inline-block;
}

#api ~ ul > li > p > strong ~ code {
  background: #fff;
  color: #CC7300;
  border: none;
  margin-left: 0.5em;
}
</style>
