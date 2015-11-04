<template>
<div v-show='!closed'>
  <div v-if='description'>
    <div
      data-show={{closeing}}
      :class="'ant-alert-with-description ant-alert-with-description-' + type + closeName">
      <i :class="'anticon ' + iconClass"></i>
      <p class='ant-alert-with-description-message'>
        {{message}}
      </p>
      <span class='ant-alert-with-description-description'>
        {{description}}
      </span>
      <a
        v-if='closable'
        @click='_handleClose'
        class='ant-alert-with-description-close-icon'>
        <span class='ant-alert-with-description-close-icon-x'></span>
      </a>
    </div>
  </div>
  <div v-else>
    <div v-if='closeText'>
      <div
        data-show={{closing}}
        :class="'ant-alert ant-alert-' + type + closeName">
        <i :class="'anticon ' + iconClass"></i>
        <span class='ant-alert-description'>{{message}}</span>
        <span
          @click='_handleClose'
          class='ant-alert-close-text'>{{{closeText}}}</span>
      </div>
    </div>
    <div v-else>
      <div
        data-show={{closing}}
        :class="'ant-alert ant-alert-' + type + closeName">
        <i :class="'anticon ' + iconClass"></i>
        <span class='ant-alert-description'>{{message}}</span>
        <a
          v-if='closable'
          @click='_handleClose'
          class='ant-alert-close-icon'>
          <span class='ant-alert-close-icon-x'></span>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
// import vAnimate from '../animate'

export default {
  props: defaultProps({
    prefixCls: 'ant-alert',
    type: String,
    closable: Boolean,
    message: String,
    description: String,
    closeText: String,
    onClose: () => {}
  }),

  // components: { vAnimate },

  data () {
    return {
      iconClass: '',
      closeName: '',

      closing: true,
      closed: false
    }
  },

  computed: {
    iconClass () {
      let iconClass = this.description ? 'ant-alert-with-description-icon anticon-' : 'ant-alert-icon anticon-'

      switch (this.type) {
        case 'success':
          iconClass += 'check-circle'
          break

        case 'info':
          iconClass += 'info-circle'
          break

        case 'error':
          iconClass += 'exclamation-circle'
          break

        case 'warn':
          iconClass += 'question-circle'
          break

        default:
          iconClass += 'default'
      }

      return iconClass
    },

    closeName () {
      return !this.closing ? ' ' + this.prefixCls + '-close' : ''
    }
  },

  methods: {
    _handleClose (e) {
      let dom = this.$el
      dom.style.height = dom.offsetHeight + 'px'

      this.closing = false

      if (this.onClose) {
        this.onClose.call(this, e)
      }
    },

    _animationEnd () {
      this.closed = true,
      this.closing = true
    }
  }
}
</script>
