<template>
<slot></slot>
</template>

<script>
import { defaultProps, getTrustSlotNode } from '../../../utils'
import cssAnimate, { isCssAnimationSupported } from 'css-animation'

const transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
}

export default {
  props: defaultProps({
    show: false,
    animation: {
      default: function() {return{}}
    },
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
        this._enter()
      } else {
        this._leave()
      }
    }
  },

  computed: {
    currentNode () {
      return getTrustSlotNode(this.$el)
    }
  },

  ready () {
    if (!this.show) {
      this.currentNode.style.display = 'none'
    } else {
      this._enter()
    }
  },

  beforeDestory () {
    this._stop()
  },

  methods: {
    _enter () {
      this.currentNode.style.display = ''
      if (this._isEnterSupported()) {
        this._transition('enter', () => {
          if (this._allowEnterCallback()) {
            this.onEnter()
          }
        })
      }
    },

    _leave () {
      if (this._isLeaveSupported()) {
        // todo 之后优化
        this.currentNode.style.display = 'block'
        this._transition('leave', () => {
          if (this._allowLeaveCallback()) {
            this.currentNode.style.display = 'none'
            this.onEnd()
          }
        })
      }
    },

    _transition (animationType, done) {
      const transitionName = this.transitionName
      this._stop()
      const end = () => {
        this.stopper = null
        done()
      }
      if ((isCssAnimationSupported || !this.animation[animationType]) && transitionName && this[transitionMap[animationType]]) {
        this.stopper = cssAnimate(this.currentNode, transitionName + '-' + animationType, end)
      } else {
        this.stopper = this.animation[animationType](this.currentNode, end)
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
