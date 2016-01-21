<template>

  <li class="ant-select-dropdown-menu-item" 
  :class="{'ant-select-dropdown-menu-item-disabled': disabled,
  		   'ant-select-dropdown-menu-item-selected': selected}"
  @click="onSelect()"
  v-el:vtext>
  	<slot></slot>
  </li>
<!-- <span><slot></slot></span> -->
</template>

<script>
import { KeyCode, cx, defaultProps, oneOfType, any } from '../../../utils'
export default {
  props: defaultProps({
  	disabled: false,
  	selected: false,
  	value: String
  }),

  watch: {
  	selected (val) {
  		if(val){
	  		this.$parent.value = this.value
	  		this.$parent.defaultValue = this.$els.vtext.textContent
	  		this.$parent.open = false
  		}
  	}
  },

  methods: {
  	onSelect () {
  		this.$parent.$children.forEach((v,k) => {
			v.selected = false
  		})
  		this.selected = true
  		if(this.$parent.onChange){
  			this.$parent.onChange(this.value)
  		}
  	}
  }
}

</script>
