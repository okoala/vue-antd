<template>
<div v-show='!closed'>
  <Animate
    component=''
    show-prop='data-show'
    transition-name='slide-up'
    on-end={{_animationEnd}}>
    <div v-if='closable'>
      <div
        data-show={{closeing}}
        :class="'ant-alert-with-description ant-alert-with-description-' + type + closeName">
        <i :class="['anticon', iconClass]"></i>
        <p class='ant-alert-with-description-message'>
          {{message}}
        </p>
        <span class='ant-alert-with-description-description'>
          {{description}}
        </span>
        <a
          v-if='closable'
          @click='handleClose'
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
            @click='handleClose'
            class='ant-alert-close-text'>{{closeText}}</span>
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
            @click='handleClose'
            class='ant-alert-close-icon'>
            <span class='ant-alert-close-icon-x'></span>
          </a>
        </div>
      </div>
    </div>
  </Animate>
</div>
</template>

<script>
import Animate from './base/animate.vue'

export default {
  props: {
    prefixCls: {
      type: String,
      default: 'ant-alert'
    },
    type: String,
    closable: Boolean,
    message: String,
    description: String,
    closeText: String,
    onClose: Function
  },

  data () {
    return {
      iconClass: '',
      closeName: '',

      closing: true,
      closed: false
    }
  },

  watch: {
    'closing': '_setCloseName'
  },

  methods: {

    compiled () {
      this.iconClass = this.description ? 'ant-alert-with-description-icon anticon-' : 'ant-alert-icon anticon-'

      switch (this.type) {
        case 'success':
          this.iconClass += 'check-circle'
          break

        case 'info':
          this.iconClass += 'info-circle'
          break

        case 'error':
          this.iconClass += 'exclamation-circle'
          break

        case 'warn':
          this.iconClass += 'question-circle'
          break

        default:
          this.iconClass += 'default'
      }

      this._setCloseName()
    },

    _setCloseName () {
      this.closeName = !this.closing ? ' ' + this.prefixCls + '-close' : ''
    },

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
