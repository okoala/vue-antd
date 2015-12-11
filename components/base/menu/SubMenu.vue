<template>
<li
  :class="wrapClasses"
  @mouseenter="_onSubTreeMouseEnter"
  @mouseleave="_onMouseLeave">
  <div
    :style="{paddingLeft: inlineIndent * level + 'px'}"
    :class="prefixCls + '-title'"
    @click="_onClick"
    @mouseenter="_onMouseEnter"
    v-bind="{'aria-open': open, 'aria-owns': _menuId, 'aria-haspopup': 'true'}">
    <slot name="title"></slot>
  </div>
  <slot></slot>
</li>
</template>

<script>
import { defaultProps, KeyCode, guid,
  cx, contains, addEventListener } from '../../../utils'

export default {
  props: defaultProps({
    className: '',
    rootPrefixCls: '',
    eventKey: '',
    multiple: Boolean,
    active: Boolean,
    open: Boolean,
    title: '',
    closeSubMenuOnMouseLeave: Boolean,
    openSubMenuOnMouseEnter: Boolean,
    inlineIndent: Number,
    level: Number,
    onClick () {},
    onOpenChange () {},
    onSelect () {},
    onDeselect () {},
    onDestory () {},
    onItemHover () {}
  }),

  data () {
    return {
      _menuId: guid(),
      isSubMenu: true,
      defaultActiveFirst: false
    }
  },

  computed: {
    prefixCls () {
      return this.rootPrefixCls + '-submenu'
    },

    wrapClasses () {
      return cx({
        [`${this.prefixCls}`]: 1,
        [`${this.prefixCls}-${this.mode}`]: 1,
        [`${this.className}`]: !!this.className,
        [`${this.rootPrefixCls}-submenu-open`]: this.open,
        [`${this.prefixCls}-active`]: this.active,
        [`${this.prefixCls}-disabled`]: this.disabled
      })
    }
  },

  ready () {
    if (this.mode !== 'inline') {
      if (this.open) {
        this._bindRootCloseHandlers()
      } else {
        this._unbindRootCloseHandlers()
      }
    }
    this._mapPropsToChildComponent()
  },

  beforeDestory () {
    if (this.onDestory) {
      this.onDestory(this.eventKey)
    }
    this._unbindRootCloseHandlers()
  },

  methods: {
    _mapPropsToChildComponent () {
      this.$children.map((child, index) => {
        child.className += ` ${this.prefixCls}-sub`
      })
    },

    _onKeyDown (e) {
      const keyCode = e.keyCode
      const menu = this.menuInstance

      if (keyCode === KeyCode.ENTER) {
        this.onClick(e)
        this.defaultActiveFirst = true
        return true
      }

      if (keyCode === KeyCode.LEFT) {
        let handled
        if (this.open) {
          handled = menu.onKeyDown(e)
        } else {
          return undefined
        }
        if (!handled) {
          this.triggerOpenChange(false)
          handled = true
        }
        return handled
      }

      if (this.open && (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN)) {
        return menu.onKeyDown(e)
      }
    },

    _onOpenChange (e) {
      this.onOpenChange(e)
    },

    _onClick () {
      if (this.disabled || this.openSubMenuOnMouseEnter) {
        return
      }
      this.triggerOpenChange(!this.open, 'click')
      this.defaultActiveFirst = false
    },

    _onMouseEnter () {
      if (this.disabled) {
        return
      }
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer)
        this.leaveTimer = null
      }
      const info = {
        key: this.eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      }
      this.onItemHover(info)
      if (this.openSubMenuOnMouseEnter) {
        this.triggerOpenChange(true)
      }
      this.defaultActiveFirst = false
    },

    _onMouseLeave () {
      if (this.disabled) {
        return
      }
      this.leaveTimer = setTimeout(() => {
        if (this.isMounted() && this.active) {
          this.onItemHover({
            key: this.eventKey,
            item: this,
            hover: false,
            trigger: 'mouseleave'
          })
        }
        if (this.isMounted() && this.open) {
          if (this.closeSubMenuOnMouseLeave) {
            this.triggerOpenChange(false)
          }
        }
      }, 100)
    },

    _onSubTreeMouseEnter () {
      if (this.disabled) {
        return
      }
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer)
        this.leaveTimer = null
      }
    },

    _onSubMenuClick (info) {
      this.onClick(this._addKeyPath(info))
    },

    _onSelect (info) {
      this.onSelect(info)
    },

    _onDeselect (info) {
      this.onDeselect(info)
    },

    _saveMenuInstance (c) {
      this.menuInstance = c
    },

    _addKeyPath (info) {
      return Object.assign({}, info, {
        keyPath: info.keyPath.concat(this.eventKey)
      })
    },

    _triggerOpenChange (open, type) {
      const key = this.eventKey
      this.onOpenChange({
        key: key,
        item: this,
        trigger: type,
        open: open
      })
    },

    _handleDocumentKeyUp (e) {
      if (e.keyCode === KeyCode.ESC) {
        this.onItemHover({
          key: this.eventKey,
          item: this,
          hover: false
        })
      }
    },

    _handleDocumentClick (e) {
      if (contains(this.$el, e.target)) {
        return
      }
      this.onItemHover({
        key: this.eventKey,
        item: this,
        hover: false
      })
      this._triggerOpenChange(false)
    },

    _bindRootCloseHandlers () {
      if (!this._onDocumentClickListener) {
        this._onDocumentClickListener = addEventListener(document, 'click', this._handleDocumentClick)
        this._onDocumentClickListener = addEventListener(document, 'keyup', this._handleDocumentClick)
      }
    },

    _unbindRootCloseHandlers () {
      if (this._onDocumentClickListener) {
        this._onDocumentClickListener.remove()
        this._onDocumentClickListener = null
      }

      if (this._onDocumentKeyupListener) {
        this._onDocumentKeyupListener.remove()
        this._onDocumentKeyupListener = null
      }
    },
  }
}

</script>
