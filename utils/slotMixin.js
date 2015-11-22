export default {
  ready () {
    this._bindTriggerEvent()
  },

  methods: {
    _getTriggerTarget () {
      const els = this.$el.querySelectorAll('[slot="trigger"]')
      const len = els.length
      if (len) {
        const currentWrap = els[len - 1]
        const children = currentWrap.children
        if (children && children.length === 1) {
          return children[children.length - 1]
        } else {
          return currentWrap
        }
      }
      return null
    },

    _bindTriggerEvent () {
      const el = this._getTriggerTarget()
      if (el) {
        el.addEventListener('blur', this._onBlur.bind(this), false)
        el.addEventListener('click', this._onClick.bind(this), false)
        el.addEventListener('focus', this._onFocus.bind(this), false)
        el.addEventListener('mousedown', this._onMouseDown.bind(this), false)
        el.addEventListener('mouseenter', this._onMouseEnter.bind(this), false)
        el.addEventListener('mouseleave', this._onMouseLeave.bind(this), false)
        el.addEventListener('touchstart', this._onTouchStart.bind(this), false)
      }
    }
  }
}
