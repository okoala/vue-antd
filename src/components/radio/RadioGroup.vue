<template>
<div :class="prefixCls">
  <v-radio v-for="radio in radios" :class-name="radioClassName" :value="radio.value" :on-change="_onRadioChange.bind(radio, $index)" :checked="value === radio.value"><span>{{radio.name}}</span></v-radio>
</div>
</template>

<script>
import { defaultProps } from '../../utils'
import vRadio from './Radio.vue'

export default {
  props: defaultProps({
    prefixCls: 'ant-radio-group',
    type: 'radio', // or button
    value: String,
    defaultValue: String,
    radios: [],
    onChange: () => {}
  }),

  components: { vRadio },

  computed: {
    radioClassName () {
      if (this.type === 'button') {
        return 'ant-radio-button'
      }

      return ''
    }
  },

  compiled () {
    if (this.value == null) {
      this.value = this.defaultValue
    }
  },

  methods: {
    _onRadioChange (index, e) {
      e.target.name = this.radios[index].name
      this.value = e.target.value
      this.onChange(e)
    }
  }
}

</script>
