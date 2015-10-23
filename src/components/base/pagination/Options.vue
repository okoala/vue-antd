<template>
<div v-if="changeSize && quickGo" :class="prefixCls">
  <Select
    :prefixCls="selectPrefixCls"
    :showSearch="false"
    :class="prefixCls + '-size-changer'"
    :optionLabelProp="'children'"
    :defaultValue="10"
    @change="_changeSize">
    <Option :value="10">10 条/页</Option>
    <Option :value="20">20 条/页</Option>
    <Option :value="30">30 条/页</Option>
    <Option :value="40">40 条/页</Option>
  </Select>
  <div v-if="quickGo" title="Quick jump to page" :class="prefixCls + '-quick-jumper'">
    跳至
    <input type="text" :value="_current" @change="_handleChange" @keyup="_go"/>
    页
  </div>
</div>
</template>

<script>
import { defaultProps } from '../../../utils'
import KEYCODE from './KeyCode'
import Select, { Option } from './select'

export default {
  props: defaultProps({
    changeSize: Function,
    quickGo: Function,
    current: Number,
    rootPrefixCls: '',
    selectPrefixCls: ''
  }),

  components: { Select, Option },

  computed: {
    prefixCls () {
      return `${this.rootPrefixCls}-options`
    }
  },

  data () {
    return {
      _current: null,
      Select: null,
      Option: null
    }
  },

  compiled () {
    this._current = this.current
    this.Select = this.selectComponentClass
    this.Option
  },

  methods: {
    _changeSize (value) {
      this.changeSize(Number(value))
    },

    _handleChange (e) {
      this._current = e.target.value
    },

    _go (e) {
      const _val = e.target.value

      if (_val === '') return

      let val = Number(this._current)
      if (isNaN(val)) {
        val = this.current
      }

      if (e.keyCode === KEYCODE.ENTER) {
        const c = this._quickGo(val)
        this._current = c
        this.current = c
      }
    }
  }
}

</script>
