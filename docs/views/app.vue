<template>
<header id="header" class="clearfix">
  <a class="logo" href="..">
    <img width="60" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
    Vue Antd
  </a>
  <nav class="nav" style="display: none;">
    <span class="bar barAnim" style="left: 60px; display: inline;"></span>
    <ul>
      <li class="">
        <a href=".." data-no-instant="">首页</a>
      </li>
      <li>
        <a class="nav-link-disabled" href="">案例</a>
      </li>
      <li class="current">
        <a href="./introduce" class="hover">Components</a>
      </li>
      <li>
        <a target="_blank" href="https://github.com/okoala/vue-antd">Github</a>
      </li>
    </ul>
  </nav>
  <div class="nav-phone-icon"></div>
</header>
</template>
<style>
header {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}

a.logo {
  float: left;
  height: 46px;
  line-height: 46px;
  margin: 17px 48px 17px 40px;
  transition: margin 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0s, width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0s, height 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  text-transform: uppercase;
  font-size: 18px;
  font-family: "Hiragino Sans GB","Microsoft YaHei","微软雅黑",sans-serif;
  color: #6EB4E0;
}

.logo img {
  float: left;
  margin-top: -7px;
  -webkit-animation: rotateCircleBack 0.6s 1 ease-in-out;
  animation: rotateCircleBack 0.6s 1 ease-in-out;
}

.nav {
  width: 30%;
  height: 80px;
  line-height: 80px;
  float: right;
  font-size: 0.875em;
  position: relative;
  margin-right: 25px;
}

.nav ul li {
  float: left;
  width: 20%;
  text-align: center;
}

.nav ul li a {
  color: #728AA3;
  width: 100%;
  height: 100%;
  display: block;
}

a.nav-link-disabled {
  cursor: not-allowed;
  color: #ccc !important;
  pointer-events: none;
}

.nav ul li.current a {
  color: #71B5DE;
  font-weight: 600;
}

.nav ul li a:hover,
.nav ul li .hover {
  color: #6EB4E0;
}

.nav .bar {
  width: 20%;
  height: 3px;
  position: absolute;
  top: 0;
  left: 0;
  background: #6EB4E0;
  display: none;
}

.barAnim {
  transition: left .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

</style>
