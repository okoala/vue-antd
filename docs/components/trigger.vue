<template lang="md">
# Trigger

---


## 组件演示

<demo>
  <example title="简单使用">
    <div>
      <label>
        placement:
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
        <v-checkbox
          :value="rc-trigger-popup-zoom"
          :on-change="_onTransitionChange"
          :checked="transitionName === 'rc-trigger-popup-zoom'">{{transitionName}}</v-checkbox>
      </label>
      <br>
      trigger:
      <label>
        <v-checkbox
          :value="hover"
          :checked="trigger.hover"
          :on-change="_onTriggerChange">hover</v-checkbox>
      </label>
      <label>
        <v-checkbox
          :value="focus"
          :checked="trigger.focus"
          :on-change="_onTriggerChange">focus</v-checkbox>
      </label>
      <label>
        <v-checkbox
          :value="click"
          :checked="trigger.click"
          :on-change="_onTriggerChange">click</v-checkbox>
      </label>
      <br/>
      <label>
        offsetX:
        <input type='text' class="ant-input" @change="_onOffsetXChange"/>
      </label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <label>
        offsetY:
        <input type='text' class="ant-input" @change="_onOffsetYChange"/>
      </label>
    </div>
    <div style="margin: 100px;">
      <v-trigger
        :popupAlign="{offset: [offsetX, offsetY], overflow: {adjustX: 1, adjustY: 1}}"
        :mouse-enter-delay="0"
        :popup-placement="placement"
        :mouse-leave-delay="0.1"
        :action="Object.keys(trigger)"
        :builtin-placements="builtinPlacements"
        :popup-transition-name="transitionName">
        <div slot="popup" style="border:1px solid red; padding:10px;">i am a popup</div>
        <a href="javascript:;" style="margin: 20px;" @click.prevent="">trigger</a>
      </v-trigger>
    </div>
  </example>
</demo>

</template>

<script>
import vTrigger from '../../components/base/trigger'
import vCheckbox from '../../components/checkbox'

export default {
  data () {
    return {
      placement: 'right',
      trigger: {
        hover: 1
      },
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

  components: { vTrigger, vCheckbox },

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

<style scoped>

</style>
