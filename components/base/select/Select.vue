<template>
<div style="width:100%;position: relative" :style="style" :class="class">
  <span class="ant-select ant-select-enabled" :class="{'ant-select-open': open}" style="width: 100%;" @click="open = !open">
    <span class="ant-select-selection ant-select-selection--single">
      <span class="ant-select-selection__rendered">
        <span>{{defaultValue}}</span>
      </span>
      <span class="ant-select-arrow" style="outline:none;">
        <b></b>
      </span>
    </span>
  </span>
  <div class="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft"style="left: 0px; top: 32px;width:100%"
  v-show="open">
    <div>
      <ul class="ant-select-dropdown-menu ant-select-dropdown-menu-vertical ant-select-dropdown-menu-root">
        <slot></slot>
      </ul>
    </div>
  </div>
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
    open: false,
    style: Object,
    class: Object,
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
