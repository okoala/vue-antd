<template>
<div class="main-wrapper">
  <aside class="aside-container">
    <ul></ul>
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
