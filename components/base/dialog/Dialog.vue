<template>
<div :class="prefixCls + '-wrap'">
  <animate
    :show="visible"
    :transition-name="maskTransition">
    <div
      :class="maskWrapClasses"
      @click="_onMaskClick"
      ></div>
  </animate>
  <animate
    :show="visible"
    :on-leave="_onAnimateLeave"
    :transition-name="contentTransition">
    <align
      :align="align"
      :visible="visible"
      :on-align="_onAlign"
      :monitor-buffer-time="80"
      :disabled="!visible">
      <div
        v-el:dialog
        role="dialog"
        tabIndex="0"
        :style="style"
        :class="dialogContentWrapClasses"
        @keydown="_onKeyDown">
        <div :class="prefixCls + '-content'">
          <a v-if="closable" tabIndex="0" @click="_close" :class="prefixCls + '-close'">
            <span :class="prefixCls + '-close-x'"></span>
          </a>
          <div v-if="title" :class="prefixCls + '-header'">
            <div :class="prefixCls + '-title'">{{title}}</div>
          </div>
          <div :class="prefixCls + '-body'">
            <slot></slot>
          </div>
          <div v-show="hasFooter" :class="prefixCls + '-footer'">
            <slot name="footer"></slot>
          </div>
        </div>
        <div tabIndex="0" v-el:sentinel :style="{width: 0, height: 0, overflow: 'hidden'}">
          sentinel
        </div>
      </div>
    </align>
  </animate>
</div>
</template>

<script>
import { defaultProps, KeyCode } from '../../../utils'
import cx from 'classnames'
import Animate from '../animate'
import Align from '../align'

function getScroll (w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset']
  const method = 'scroll' + (top ? 'Top' : 'Left')
  if (typeof ret !== 'number') {
    const d = w.document
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method]
    }
  }
  return ret
}

function setTransformOrigin (node, value) {
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix)=> {
    style[`${prefix}TransformOrigin`] = value
  })
  style[`transformOrigin`] = value
}

function offset (el) {
  const rect = el.getBoundingClientRect()
  const pos = {
    left: rect.left,
    top: rect.top
  }
  const doc = el.ownerDocument
  const w = doc.defaultView || doc.parentWindow
  pos.left += getScroll(w)
  pos.top += getScroll(w, 1)
  return pos
}

export default {
  props: defaultProps({
    prefixCls: 'vc-dialog',
    className: '',
    onAfterClose: () => {},
    onClose: () => {},
    align: {
      points: ['tc', 'tc'],
      offset: [0, 100]
    },
    style: Object,
    mask: true,
    title: String,
    closable: true,
    visible: Boolean,
    zIndex: Number,
    hasFooter: false,
    maskAnimation: String,
    maskTransitionName: String,
    transitionName: String,
    animation: String,
    mousePosition: Object
  }),

  components: { Align, Animate },

  ready () {
    if (this.$el.querySelector('[slot="footer"]')) {
      this.hasFooter = true
    }
  },

  computed: {
    maskWrapClasses () {
      return cx({
        [`${this.prefixCls}-mask`]: 1,
        [`${this.prefixCls}-mask-hidden`]: !this.visible
      })
    },

    maskTransition () {
      let transitionName = this.maskTransitionName
      const animation = this.maskAnimation
      if (!transitionName && animation) {
        transitionName = `${this.prefixCls}-${animation}`
      }
      return transitionName
    },

    dialogContentWrapClasses () {
      return cx({
        [`${this.prefixCls}`]: 1,
        [`${this.className}`]: !!this.className,
        [`${this.prefixCls}-mask-hidden`]: !this.visible
      })
    },

    contentTransition () {
      let transitionName = this.transitionName
      const animation = this.animation
      if (!transitionName && animation) {
        transitionName = `${this.prefixCls}-${animation}`
      }
      return transitionName
    }
  },

  methods: {
    _onAnimateLeave () {
      this.onAfterClose()
    },

    _onMaskClick () {
      if (this.closable) {
        this.close()
      }
      this.$els.dialog.focus()
    },

    _onKeyDown (e) {
      if (this.closable) {
        if (e.keyCode === KeyCode.ESC) {
          this.close()
        }
      }

      if (this.visible) {
        if (e.keyCode === KeyCode.TAB) {
          const activeElement = document.activeElement
          const dialogRoot = this.$els.dialog
          const sentinel = this.$els.sentinel
          if (e.shiftKey) {
            if (activeElement === dialogRoot) {
              sentinel.focus()
            }
          } else if (activeElement === sentinel) {
            dialogRoot.focus()
          }
        }
      }
    },

    _onAlign (dialogNode) {
      const mousePosition = this.mousePosition;
      if (this.visible) {
        if (mousePosition) {
          const elOffset = offset(dialogNode);
          setTransformOrigin(dialogNode, `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
        } else {
          setTransformOrigin(dialogNode, '');
        }
      }
    },

    _close () {
      this.onClose()
    }
  }
}

</script>
