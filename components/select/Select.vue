<template>

</template>

<script>
import { defaultProps, oneOfType } from '../../utils'
// import Select from './base/select'

export default {
  props: defaultProps({
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    notFoundContent: Boolean,
    showSearch: false,
    className: ' ',

    value: oneOfType([String, Array]),
    defaultValue: oneOfType([String, Array]),
    multiple: false,
    filterOption: true,
    tags: false,
    allowClear: false,
    placeholder: String,
    searchPlaceholder: String,
    optionFilterProp: 'value',
    combobox: false,
    size: String,
    onSelect: () => {},
    onDeselect: () => {},
    onChange: () => {}
  }),

  computed: {
    wrapClassName () {
      let sizeClass = ''

      if (this.size === 'large') {
        sizeClass = 'ant-select-lg'
      } else {
        sizeClass = 'ant-select-sm'
      }

      return this.className + sizeClass
    }
  },

  compiled () {
    if (this.combobox) {
      this.notFoundContent = null
    }
  },

  methods: {

  }
}

</script>
