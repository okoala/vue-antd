<template lang="md">
# Tooltip

---


## 组件演示

<demo>
  <example title="Form错误提示">
    <div style="margin-top: 100px; margin-bottom: 100px; text-align: center;">
      <tooltip animation="zoom"
        :visible="visible"
        :trigger="[]">
        <span slot="tooltip" style="z-index: 1000;">required!</span>
        <input type="text" class="ant-input" style="width: 200px;" @keyup="_onChange" placeholder="不能为空哦！"/>
      </tooltip>
    </div>
  </example>
  <example title="简单触发">
    <div style="margin-top: 100px; margin-bottom: 100px; text-align: center;">
      <tooltip animation="zoom"
        :trigger="['click']"
        :visible="triggerVisible"
        :on-visible-change="_toggle">
        <span slot="tooltip" style="z-index: 1000;">i am a tooltip!</span>
        <a href='#' @click.prevent="">点我，点我！</a>
      </tooltip>
    </div>
  </example>
</demo>

</template>

<script>
import Tooltip from '../../components/base/tooltip'

export default {
  data () {
    return {
      visible: false,
      triggerVisible: false
    }
  },

  components: { Tooltip },

  methods: {
    _onChange (e) {
      this.visible = !e.target.value
    },

    _toggle (visible) {
      this.triggerVisible = visible
    }
  }
}
</script>

<style>
.ant-tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  visibility: visible;
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.9;
}
.ant-tooltip-hidden {
  display: none;
}
.ant-tooltip-placement-top,
.ant-tooltip-placement-topLeft,
.ant-tooltip-placement-topRight {
  padding: 5px 0 9px 0;
}
.ant-tooltip-placement-right,
.ant-tooltip-placement-rightTop,
.ant-tooltip-placement-rightBottom {
  padding: 0 5px 0 9px;
}
.ant-tooltip-placement-bottom,
.ant-tooltip-placement-bottomLeft,
.ant-tooltip-placement-bottomRight {
  padding: 9px 0 5px 0;
}
.ant-tooltip-placement-left,
.ant-tooltip-placement-leftTop,
.ant-tooltip-placement-leftBottom {
  padding: 0 9px 0 5px;
}
.ant-tooltip-inner {
  padding: 8px 10px;
  color: #fff;
  text-align: left;
  text-decoration: none;
  background-color: #373737;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.17);
  min-height: 34px;
}
.ant-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.ant-tooltip-placement-top .ant-tooltip-arrow,
.ant-tooltip-placement-topLeft .ant-tooltip-arrow,
.ant-tooltip-placement-topRight .ant-tooltip-arrow {
  bottom: 4px;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #373737;
}
.ant-tooltip-placement-top .ant-tooltip-arrow {
  left: 50%;
}
.ant-tooltip-placement-topLeft .ant-tooltip-arrow {
  left: 15%;
}
.ant-tooltip-placement-topRight .ant-tooltip-arrow {
  right: 15%;
}
.ant-tooltip-placement-right .ant-tooltip-arrow,
.ant-tooltip-placement-rightTop .ant-tooltip-arrow,
.ant-tooltip-placement-rightBottom .ant-tooltip-arrow {
  left: 4px;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #373737;
}
.ant-tooltip-placement-right .ant-tooltip-arrow {
  top: 50%;
}
.ant-tooltip-placement-rightTop .ant-tooltip-arrow {
  top: 15%;
  margin-top: 0;
}
.ant-tooltip-placement-rightBottom .ant-tooltip-arrow {
  bottom: 15%;
}
.ant-tooltip-placement-left .ant-tooltip-arrow,
.ant-tooltip-placement-leftTop .ant-tooltip-arrow,
.ant-tooltip-placement-leftBottom .ant-tooltip-arrow {
  right: 4px;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-left-color: #373737;
}
.ant-tooltip-placement-left .ant-tooltip-arrow {
  top: 50%;
}
.ant-tooltip-placement-leftTop .ant-tooltip-arrow {
  top: 15%;
  margin-top: 0;
}
.ant-tooltip-placement-leftBottom .ant-tooltip-arrow {
  bottom: 15%;
}
.ant-tooltip-placement-bottom .ant-tooltip-arrow,
.ant-tooltip-placement-bottomLeft .ant-tooltip-arrow,
.ant-tooltip-placement-bottomRight .ant-tooltip-arrow {
  top: 4px;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #373737;
}
.ant-tooltip-placement-bottom .ant-tooltip-arrow {
  left: 50%;
}
.ant-tooltip-placement-bottomLeft .ant-tooltip-arrow {
  left: 15%;
}
.ant-tooltip-placement-bottomRight .ant-tooltip-arrow {
  right: 15%;
}
.ant-tooltip.ant-tooltip-zoom-enter,
.ant-tooltip.ant-tooltip-zoom-leave {
  display: block;
}
.ant-tooltip-zoom-enter,
.ant-tooltip-zoom-appear {
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  animation-play-state: paused;
}
.ant-tooltip-zoom-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);
  animation-play-state: paused;
}
.ant-tooltip-zoom-enter.ant-tooltip-zoom-enter-active,
.ant-tooltip-zoom-appear.ant-tooltip-zoom-appear-active {
  animation-name: antToolTipZoomIn;
  animation-play-state: running;
}
.ant-tooltip-zoom-leave.ant-tooltip-zoom-leave-active {
  animation-name: antToolTipZoomOut;
  animation-play-state: running;
}
@keyframes antToolTipZoomIn {
  0% {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(0, 0);
  }
  100% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1, 1);
  }
}
@keyframes antToolTipZoomOut {
  0% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(0, 0);
  }
}

/*# souanteMappingURL=common.css.map*/

</style>
