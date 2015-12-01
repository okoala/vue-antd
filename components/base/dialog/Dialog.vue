<template>
<div :class="{`${prefixCls}-wrap`: 1}">
  <v-animate
    :show="visible"
    :transitionName="maskTransition">
    <div
      :class="{`${props.prefixCls}-mask`: 1, `${props.prefixCls}-mask-hidden`: !visible}"
      @click="_onMaskClick"
      ></div>
  </v-animate>
  <v-animate
    :show="dialogVisible"
    :on-leave="_onAnimateLeave"
    :transition-name="transitionName">
    <v-align
      :align="align"
      :on-align="_onAlign"
      :dialog-visible="visible"
      :monitor-buffer-time="80"
      :disabled="!visible">
      <div
        v-el:dialog
        role="dialog"
        tabIndex="0"
        :class="{`${prefixCls}`: 1 , `${className}`: !!className, `${props.prefixCls}-mask-hidden`: !visible}"
        @keydown="_onKeyDown">
        <div :class="{`${prefixCls}-content`: 1}">
          <a v-if="closable" tabIndex="0" onClick="close" :class="{`${prefixCls}-close`: 1}">
            <span className={`${prefixCls}-close-x`} />
          </a>
          <div v-if="title" :class="{`${prefixCls}-header`: 1}">
            <div :class="{`${prefixCls}-title`: 1}">{{title}}</div>
          </div>
          <div :class="{`${prefixCls}-body`: 1}">
            <slot></slot>
          </div>
          <div v-if="footer" :class="{`${prefixCls}-footer`: 1}">
            <slot name="footer"></slot>
          </div>
        </div>
        <div tabIndex="0" v-el:sentinel style="{width: 0, height: 0, overflow: 'hidden'}">
          sentinel
        </div>
      </div>
    </v-align>
  </v-animate>
</div>
</template>

<script>
import { defaultProps, KeyCode } from '../../../utils'
import cx from 'classnames'
import vAnimate from './animate'
import vAlign from './align'

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
    onAfterClose: () => {},
    onClose: () => {},
    align: String,
    title: String,
    closable: Boolean,
    visible: Boolean,
    zIndex: Number,
    footer: true,
    maskTransitionName: String,
    transitionName: String,
    animation: String,
    mousePosition: Object
  }),

  components: { vAlign, vAnimate }

  computed: {
    maskTransition () {
      let transitionName = this.maskTransitionName
      const animation = this.maskAnimation
      if (!transitionName && animation) {
        transitionName = `${this.prefixCls}-${animation}`
      }
      return transitionName
    },

    transitionName () {
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
    }

    _close () {
      this.onClose()
    }
  }
}

</script>
