<template>
<div >
  <slot></slot>
</div>
</template>

<script>
import { KeyCode, cx, defaultProps, oneOfType, any } from '../../../utils'
import Animate from '../animate'
import {
  getPropValue, getValuePropValue, isCombobox,
  isMultipleOrTags, isMultipleOrTagsOrCombobox,
  isSingleMode, toArray,
} from './util'
import OptGroup from './OptGroup.vue'

const filterFn = function (input, child) {
  return String(getPropValue(child, this.optionFilterProp)).indexOf(input) > -1
}

const saveRef = function (name, component) {
  this[name] = component
}

export default {
  props: defaultProps({
    prefixCls: 'vc-select',
    multiple: Boolean,
    filterOption: filterFn,
    showSearch: true,
    allowClear: false,
    disabled: Boolean,
    showArrow: Boolean,
    tags: Boolean,
    transitionName: '',
    placeholder: '',
    searchPlaceholder: '',
    showArrow: true,
    animation: '',
    choiceTransitionName: '',
    dropdownMatchSelectWidth: true,
    dropdownStyle: {
      type: Object,
      default () { return {} }
    },
    dropdownMenuStyle: {
      type: Object,
      default () { return {} }
    },
    value: oneOfType([Array, String]),
    defaultValue: oneOfType([Array, String], []),
    label: any,
    defaultLabel: any,
    optionFilterProp: 'value',
    optionLabelProp: 'value',
    notFoundContent: 'Not Found',
    maxTagTextLength: Number,
    onChange () {},
    onSelect () {},
    onSearch () {},
    onDeselect () {}
  })
}

</script>
