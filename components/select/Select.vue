<template>
<v-select
  :prefix-cls="prefixCls"
  :transition-name="transitionName"
  :option-label-prop="optionLabelProp"
  :not-found-content="notFoundContent"
  :show-search="showSearch"
  :class-name="className"
  :size="size"
  :value="value"
  :default-value="defaultValue"
  :multiple="multiple"
  :filter-option="filterOption"
  :tags="tags"
  :allow-clear="allowClear"
  :placeholder="placeholder"
  :search-placeholder="searchPlaceholder"
  :option-filter-prop="optionFilterProp"
  :combobox="combobox"
  :on-select="onSelect"
  :on-deselect="onDeselect"
  :on-change="onChange">
  <slot></slot>
</v-select>
</template>

<script>
import { defaultProps, oneOfType, camelcaseToHyphen } from '../../utils'
import vSelect from '../base/select'

export default {
  props: defaultProps({
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    notFoundContent: Boolean,
    showSearch: false,
    className: ' ',
    size: 'default',

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
    onSelect () {},
    onDeselect () {},
    onChange () {}
  }),

  components: { vSelect },

  computed: {
    wrapClassName () {
      let sizeClass = null
      let classNames = []

      if (this.size === 'large') {
        sizeClass = 'ant-select-lg'
      } else if (this.size === 'small') {
        sizeClass = 'ant-select-sm'
      }

      if (className) {
        classNames.push(className)
      }
      if (sizeClass) {
        classNames.push(sizeClass)
      }

      return classNames.join(' ')
    }
  },

  computed: {
    _props () {
      return camelcaseToHyphen(this.$data)
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
