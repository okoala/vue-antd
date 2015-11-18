<template lang="md">
# Animate

---

**注：通常情况下原始的 ```v-transition``` 已经够用了。**


## 组件演示

<demo>
  <example title="简单使用">
    <v-checkbox :default-value="show" :on-change="_toggle"><span>显示</span></v-checkbox>
    <animate :show="show" transition-name="fade">
      <div style="margin-top: 20px; width: 200px; height: 200px; background-color: red"></div>
    </animate>
  </example>
</demo>

</template>

<script>
import Animate from '../../components/base/animate'
import vCheckbox from '../../components/checkbox'

export default {
  data () {
    return {
      show: false
    }
  },

  components: { Animate, vCheckbox },

  methods: {
    _toggle () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
.fade-enter {
  opacity: 0;
  animation-duration: .5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.fade-appear {
  opacity: 0;
  animation-duration: .5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.fade-leave {
  animation-duration: .5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.fade-enter.fade-enter-active {
  animation-name: fadeIn;
  animation-play-state: running;
}
.fade-appear.fade-appear-active {
  animation-name: fadeIn;
  animation-play-state: running;
}
.fade-leave.fade-leave-active {
  animation-name: fadeOut;
  animation-play-state: running;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.fade-enter,
.fade-leave,
.fade-appear {
  animation-duration: 2s;
}

</style>
