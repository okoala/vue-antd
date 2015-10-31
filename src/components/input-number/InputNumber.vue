<template>
<div :class="classes" :style="style">
  <div :class="prefixCls + '-handler-wrap'">
    <a unselectable="unselectable"
       ref="up"
       @click="upDisabledClass ? noop : up"
       @mouse.down="preventDefault"
       :class="prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass">
        <span unselectable="unselectable"
            :class="prefixCls + '-handler-up-inner'"
            @click="preventDefault"/>
    </a>
    <a unselectable="unselectable"
       ref="down"
       @mouse.down="preventDefault"
       @click="downDisabledClass ? noop : down"
       :class="prefixCls + '-handler ' + prefixCls + '-handler-down ' + downDisabledClass">
      <span unselectable="unselectable"
            :class="prefixCls + '-handler-down-inner'"
            @click="preventDefault"/>
    </a>
  </div>
  <div :class="prefixCls + '-input-wrap'">
    <input v-el:input
           ref="input"
           autoComplete="off"
           @focus="_onFocus"
           @blur="_onBlur"
           @keydown.stop="_onKeyDown"
           @change="_onChange"
           :class="prefixCls + '-input'"
           :autoFocus="autoFocus"
           :readOnly="readOnly"
           :disabled="disabled"
           :max="max"
           :min="min"
           :name="name"
           :value="value"/>
  </div>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
import classnames from 'classnames'

function isValueNumber (value) {
  return (/^-?\d+?$/).test(value + '')
}

function preventDefault (e) {
  e.preventDefault()
}

export default {
  props: defaultProps({
    prefixCls: 'ant-input-number',

    className: String,
    max: Infinity,
    min: -Infinity,
    style: {},
    size: String,
    value: String,
    defaultValue: '',
    autoFocus: false,
    onChange: () => {},
    readOnly: false,
    disabled: false,
    step: 1
  }),

  data () {
    return {
      sizeClass: '',
      noop: () => {},
      preventDefault: preventDefault,
      upDisabledClass: '',
      downDisabledClass: ''
    }
  },

  computed: {
    classes () {
      return classnames({
        [this.prefixCls]: 1,
        [this.className]: !!this.className,
        [`${this.prefixCls}-disabled`]: this.disabled,
        [`${this.prefixCls}-focused`]: this.focused
      })
    }
  },

  watch: {
    value (val) {
      if (isValueNumber(val)) {
        val = Number(val)
        if (val >= this.max) {
          this.upDisabledClass = `${this.prefixCls}-handler-up-disabled`
        }
        if (val <= this.min) {
          this.downDisabledClass = `${prefixCls}-handler-up-disabled`
        }
      } else {
        this.upDisabledClass = `${this.prefixCls}-handler-up-disabled`
        this.downDisabledClass = `${this.prefixCls}-handler-up-disabled`
      }
    }
  },

  compiled () {
    if (this.size === 'large') {
      this.sizeClass = 'ant-input-number-lg'
    } else if (this.size === 'small') {
      this.sizeClass = 'ant-input-number-sm'
    }
    if (this.value == null) {
      this.value = this.defaultValue
    }
    this.focused = this.autoFocus
  },

  methods: {
    _setValue (value, callback) {
      this.value = value
      this.onChange(value)
      callback()
    },

    _onChange (event) {
      let val = event.target.value.trim()

      if (!val) {
        this._setValue(val)
      } else if (isValueNumber(val)) {
        val = Number(val)
        if (val < this.min) return
        if (val > this.max) return
        this._setValue(val)
      } else if (val === '-') {
        if (this.min >= 0) return
        this.value = val
      }
    },

    _onKeyDown (e) {
      if (e.keyCode === 38) {
        this._up(e)
      } else if (e.keyCode === 40) {
        this._down(e)
      }
    },

    _onFocus () {
      this.focused = true
    },

    _onBlur () {
      this.focused = false
      if (this.value === '-') {
        this._setValue('')
      }
    },

    _step (type, e) {
      if (this.disabled) return

      const value = this.value
      const stepNum = this.step

      if (isNaN(value)) return
      if (type == 'down') value -= stepNum
      else if (type === 'up') value += stepNum

      if (value > this.max || value < this.min) return

      this._setValue(value, () => {
        this.$els.input.focus()
      })
    },

    _down (e) {
      this._step('down', e)
    },

    _up (e) {
      this._step('up', e)
    }
  }
}

</script>
