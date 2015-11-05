<template>
<div>
  <slot></slot>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
import velocity from 'velocity-animate'

export default {
  props: defaultProps({
    show: false,
    transitionName: '',
    transitionEnter: '',
    transitionLeave: '',
    duration: 500,
    onEnd: () => {}
  }),

  watch: {
    show (val) {
      if (val) {
        this._performEnter()
      } else {
        this._performLeave()
      }
    }
  },

  methods: {
    _performEnter () {
      const node = this.$el
      node.style.visibility = 'hidden'
      velocity(node, 'stop')
      velocity(node, this.transitionName, {
        duration: this.duration,
        complete: (elements) => {
          this.onEnd()
        }
      })
    },

    _performLeave () {
      const node = this.$el
      velocity(node, 'stop')
      velocity(node, 'scaleY', {
        duration: this.duration,
        complete: (elements) => {
          this.onEnd()
        }
      })
    }
  }
}

</script>
