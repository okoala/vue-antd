<template>
<div :class="prefixCls">
  <v-radio v-for="radio in radios" :value="radio.value" :on-change="_onRadioChange.bind(radio, $index)" :checked="value === radio.value">{{radio.name}}</v-radio>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
import vRadio from './Radio.vue'

export default {
  props: defaultProps({
    prefixCls: 'ant-radio-group',
    value: '',
    radios: [],
    onChange: () => {}
  }),

  components: { vRadio },

  methods: {
    _onRadioChange (index, e) {
      this.value = e.target.value
      this.radios[index].value = this.value
      this.onChange(e)
    }
  }
}

</script>
