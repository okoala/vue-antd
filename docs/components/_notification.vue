<template lang="md">
# Notification

---


## 组件演示

<demo>
  <example title="使用">
    <v-button type="primary" @click="_simple">simple show</v-button>
    <v-button type="primary" @click="_duration">duration=0</v-button>
    <v-button type="primary" @click="_closable">closable</v-button>
    <v-button type="primary" @click="_manualClose">controlled close</v-button>
  </example>
</demo>

</template>

<script>
import Notification from '../../components/base/notification'
import vButton from '../../components/button'

const notification = Notification.newInstance({})

export default {
  data () {
    return {}
  },

  components: { vButton },

  methods: {
    close (key) {
      notification.removeNotice(key)
    },

    _simple () {
      notification.notice({
        key: 'simple',
        content: `<span>simple show</span>`,
        onClose() {
          console.log('simple close')
        }
      })
    },

    _duration () {
      notification.notice({
        content: `<span>can not close...</span>`,
        duration: null
      })
    },

    _closable () {
      notification.notice({
        content: `<span>closable</span>`,
        duration: null,
        onClose() {
          console.log('closable close')
        },
        closable: true
      })
    },

    _manualClose () {
      const key = 'manual'
      notification.notice({
        content: `<div>
          <p>click below button to close</p>
          <v-button @click="close.bind(null, ${key})">close</v-button>
        </div>`,
        key: key,
        duration: null
      })
    }
  }
}
</script>

<style scoped>


</style>
