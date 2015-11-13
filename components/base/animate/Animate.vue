<template>
<slot></slot>
</template>

<script>
import { defaultProps } from '../../../utils'
import cssAnimatie from 'css-animation'

const transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
}

export default {
  props: defaultProps({
    show: false,
    animation: {},
    transitionName: String,
    transitionEnter: true,
    transitionAppear: false,
    transitionLeave: true,
    exclusive: Boolean,
    onEnd: () => {},
    onEnter: () => {},
    onLeave: () => {},
    onAppear: () => {}
  }),

  watch: {
    show (val) {
      if (val) {
        if (this._isEnterSupported()) {
          this.transition('enter', () => {
            if (this._allowEnterCallback()) {
              this.onEnter()
            }
          })
        }
      } else {
        if (this._isLeaveSupported()) {
          this.transition('leave', () => {
            if (this._allowLeaveCallback()) {
              this.onEnd()
            }
          })
        }
      }
    }
  },

  beforeDestory () {
    this._stop()
  },

  methods: {
    _transition (animationType, finishCallback) {
      const node = this.$el
      const transitionName = this.transitionName
      this.stop()
      const end = () => {
        this.stopper = null
        finishCallback()
      }
      if ((isCssAnimationSupported || !this.animation[animationType]) && transitionName && this[transitionMap[animationType]]) {
        this.stopper = cssAnimate(node, transitionName + '-' + animationType, end)
      } else {
        this.stopper = this.animation[animationType](node, end)
      }
    },

    _stop () {
      const stopper = this.stopper
      if (stopper) {
        this.stopper = null
        stopper.stop()
      }
    },

    _isAppearSupported () {
      return this.transitionName && this.transitionAppear || this.animation.appear
    },

    _isEnterSupported () {
      return this.transitionName && this.transitionEnter || this.animation.enter
    },

    _isLeaveSupported () {
      return this.transitionName && this.transitionLeave || this.animation.leave
    },

    _allowAppearCallback () {
      return this.transitionAppear || this.animation.appear
    },

    _allowEnterCallback () {
      return this.transitionEnter || this.animation.enter
    },

    _allowLeaveCallback () {
      return this.transitionLeave || this.animation.leave
    }
  }
}

</script>
