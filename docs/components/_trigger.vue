<template lang="md">
# Trigger

---


## 组件演示

<demo>
  <example title="简单使用">
    <div>
      <span>placement:</span>
      <label>
        <select v-model="placement">
          <option>right</option>
          <option>left</option>
          <option>top</option>
          <option>bottom</option>
          <option>topLeft</option>
          <option>topRight</option>
          <option>bottomRight</option>
          <option>bottomLeft</option>
        </select>
      </label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <label>
        <v-checkbox value="ant-trigger-popup-zoom"
          :on-change="_onTransitionChange"
          :checked="transitionName === 'ant-trigger-popup-zoom'">transitionName</v-checkbox>
      </label>
      <br>
      <br>
      <span>trigger:</span>
      <label>
        <v-checkbox value="hover"
          :checked="!!trigger.hover"
          :on-change="_onTriggerChange">hover</v-checkbox>
      </label>
      <label>
        <v-checkbox value="focus"
          :checked="!!trigger.focus"
          :on-change="_onTriggerChange">focus</v-checkbox>
      </label>
      <label>
        <v-checkbox value="click"
          :checked="!!trigger.click"
          :on-change="_onTriggerChange">click</v-checkbox>
      </label>
      <br>
      <br>
      <span>offsetX:</span>
      <label>
        <input type='text' style="width: 100px;" class="ant-input" @change="_onOffsetXChange"/>
      </label>
      <br>
      <span>offsetY:</span>
      <label>
        <input type='text' style="width: 100px;" class="ant-input" @change="_onOffsetYChange"/>
      </label>
    </div>
    <div style="margin: 100px;">
      <trigger
        :popup-align="popupAlign"
        :mouse-enter-delay="0"
        :popup-placement="placement"
        :mouse-leave-delay="0.1"
        :action="action"
        :builtin-placements="builtinPlacements"
        :popup-transition-name="transitionName">
        <div slot="popup" style="border:1px solid red; padding:10px;">i am a popup</div>
        <a slot="trigger" href="javascript:;" style="margin: 20px;" @click.prevent="">trigger</a>
      </trigger>
    </div>
  </example>
</demo>

</template>

<script>
import Trigger from '../../components/base/trigger'
import vCheckbox from '../../components/checkbox'

export default {
  data () {
    return {
      placement: 'top',
      trigger: {
        hover: 1
      },
      transitionName: '',
      offsetX: undefined,
      offsetY: undefined,
      builtinPlacements: {
        left: {
          points: ['cr', 'cl']
        },
        right: {
          points: ['cl', 'cr']
        },
        top: {
          points: ['bc', 'tc']
        },
        bottom: {
          points: ['tc', 'bc']
        },
        topLeft: {
          points: ['bl', 'tl']
        },
        topRight: {
          points: ['br', 'tr']
        },
        bottomRight: {
          points: ['tr', 'br']
        },
        bottomLeft: {
          points: ['tl', 'bl']
        }
      }
    }
  },

  components: { Trigger, vCheckbox },

  computed: {
    popupAlign () {
      return { offset: [this.offsetX, this.offsetY], overflow: {adjustX: 1, adjustY: 1} }
    },

    action () {
      return Object.keys(this.trigger)
    }
  },

  methods: {
    _onPlacementChange (e) {
      this.placement = e.target.value
    },

    _onTransitionChange (e) {
      this.transitionName = e.target.checked ? e.target.value : ''
    },

    _onTriggerChange (e) {
      var trigger = Object.assign({}, this.trigger)
      if (e.target.checked) {
        trigger[e.target.value] = 1
      } else {
        delete trigger[e.target.value]
      }
      this.trigger = trigger
    },

    _onOffsetXChange (e) {
      var targetValue = e.target.value
      this.offsetX = targetValue ? targetValue : undefined
    },

    _onOffsetYChange (e) {
      var targetValue = e.target.value
      this.offsetY = targetValue ? targetValue : undefined
    },

    _onVisibleChange (visible) {
      console.log('tooltip', visible)
    }
  }
}
</script>

<style>
label {
  margin-left: 5px;
}
.ant-trigger-popup {
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: 1070;
}
.ant-trigger-popup-hidden {
  display: none;
}
.ant-trigger-popup-zoom-enter,
.ant-trigger-popup-zoom-appear {
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  animation-play-state: paused;
}
.ant-trigger-popup-zoom-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);
  animation-play-state: paused;
}
.ant-trigger-popup-zoom-enter.ant-trigger-popup-zoom-enter-active,
.ant-trigger-popup-zoom-appear.ant-trigger-popup-zoom-appear-active {
  animation-name: rcTriggerZoomIn;
  animation-play-state: running;
}
.ant-trigger-popup-zoom-leave.ant-trigger-popup-zoom-leave-active {
  animation-name: rcTriggerZoomOut;
  animation-play-state: running;
}
@keyframes rcTriggerZoomIn {
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
@keyframes rcTriggerZoomOut {
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
</style>
