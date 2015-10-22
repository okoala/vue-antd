<template>
<div class="main-wrapper">
  <aside class="aside-container">
    <ul>
      <li class="">
        <a v-link="{path: '/docs/introduce'}" class="">
          Ant Design of Vue
          <span class="chinese"></span>
        </a>
      </li>
      <li class="">
        <a href="../../docs/getting-started" class="">
          快速上手
          <span class="chinese"></span>
        </a>
      </li>
      <li class="">
        <a href="../../docs/download" class="">
          下载
          <span class="chinese"></span>
        </a>
      </li>
      <li open="open">
        <h4>Components</h4>
        <ul class="">
          <li class="type-divider">基本</li>
          <li class="">
            <a href="../button/"
               class="">
              Button
              <span class="chinese">按钮</span>
            </a>
          </li>
          <li class="">
            <a href="../iconfont/"
               class=""data-no-instant>
              Iconfont
              <span class="chinese">字体图标</span>
            </a>
          </li>
          <li class="">
            <a href="../layout/"
               class="">
              Layout
              <span class="chinese">布局</span>
            </a>
          </li>
          <li class="type-divider">表单</li>
          <li class="current">
            <a href="./"
               class="">
              Checkbox
              <span class="chinese">多选框</span>
            </a>
          </li>
          <li class="">
            <a href="../datepicker/"
               class="">
              Datepicker
              <span class="chinese">日期选择框</span>
            </a>
          </li>
          <li class="">
            <a href="../form/"
               class="">
              Form
              <span class="chinese">表单</span>
            </a>
          </li>
          <li class="">
            <a href="../input-number/"
               class="">
              InputNumber
              <span class="chinese">数字输入框</span>
            </a>
          </li>
          <li class="">
            <a href="../radio/"
               class="">
              Radio
              <span class="chinese">单选框</span>
            </a>
          </li>
          <li class="">
            <a href="../select/"
               class="">
              Select
              <span class="chinese">选择器</span>
            </a>
          </li>
          <li class="">
            <a href="../slider/"
               class="">
              Slider
              <span class="chinese">滑动输入条</span>
            </a>
          </li>
          <li class="">
            <a href="../switch/"
               class="">
              Switch
              <span class="chinese">开关</span>
            </a>
          </li>
          <li class="">
            <a href="../upload/"
               class="">
              Upload
              <span class="chinese">文件上传</span>
            </a>
          </li>
          <li class="">
            <a href="../validation/"
               class="">
              Validation
              <span class="chinese">表单校验</span>
            </a>
          </li>
          <li class="type-divider">展示</li>
          <li class="">
            <a href="../alert/"
               class="">
              Alert
              <span class="chinese">警告提示</span>
            </a>
          </li>
          <li class="">
            <a href="../badge/"
               class="">
              Badge
              <span class="chinese">徽标数</span>
            </a>
          </li>
          <li class="">
            <a href="../carousel/"
               class="">
              Carousel
              <span class="chinese">走马灯</span>
            </a>
          </li>
          <li class="">
            <a href="../collapse/"
               class="">
              Collapse
              <span class="chinese">折叠面板</span>
            </a>
          </li>
          <li class="">
            <a href="../dropdown/"
               class="">
              Dropdown
              <span class="chinese">下拉菜单</span>
            </a>
          </li>
          <li class="">
            <a href="../message/"
               class="">
              Message
              <span class="chinese">全局提示</span>
            </a>
          </li>
          <li class="">
            <a href="../modal/"
               class="">
              Modal
              <span class="chinese">对话框</span>
            </a>
          </li>
          <li class="">
            <a href="../notification/"
               class="">
              Notification
              <span class="chinese">通知提醒框</span>
            </a>
          </li>
          <li class="">
            <a href="../popconfirm/"
               class="">
              Popconfirm
              <span class="chinese">气泡确认框</span>
            </a>
          </li>
          <li class="">
            <a href="../popover/"
               class="">
              Popover
              <span class="chinese">气泡卡片</span>
            </a>
          </li>
          <li class="">
            <a href="../progress/"
               class="">
              Progress
              <span class="chinese">进度条</span>
            </a>
          </li>
          <li class="">
            <a href="../table/"
               class="">
              Table
              <span class="chinese">表格</span>
            </a>
          </li>
          <li class="">
            <a href="../tag/"
               class="">
              Tag
              <span class="chinese">标签</span>
            </a>
          </li>
          <li class="">
            <a href="../timeline/"
               class="">
              Timeline
              <span class="chinese">时间轴</span>
            </a>
          </li>
          <li class="">
            <a href="../tooltip/"
               class="">
              Tooltip
              <span class="chinese">文字提示</span>
            </a>
          </li>
          <li class="">
            <a href="../tree/"
               class="">
              Tree
              <span class="chinese">树形控件</span>
            </a>
          </li>
          <li class="type-divider">导航</li>
          <li class="">
            <a href="../breadcrumb/"
               class="">
              Breadcrumb
              <span class="chinese">面包屑</span>
            </a>
          </li>
          <li class="">
            <a href="../menu/"
               class="">
              Menu
              <span class="chinese">导航菜单</span>
            </a>
          </li>
          <li class="">
            <a href="../pagination/"
               class="">
              Pagination
              <span class="chinese">分页</span>
            </a>
          </li>
          <li class="">
            <a href="../steps/"
               class="">
              Steps
              <span class="chinese">步骤条</span>
            </a>
          </li>
          <li class="">
            <a href="../tabs/"
               class="">
              Tabs
              <span class="chinese">标签页</span>
            </a>
          </li>
          <li class="type-divider">其他</li>
          <li class="">
            <a href="../affix/"
               class="">
              Affix
              <span class="chinese">固钉</span>
            </a>
          </li>
          <li class="">
            <a href="../enter-animation/"
               class="">
              EnterAnimation
              <span class="chinese">进场动画</span>
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
