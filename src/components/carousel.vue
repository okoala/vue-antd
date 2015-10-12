<template>

</template>

<script>
export default {
  props: {
    dots: {
      type: Boolean,
      default: true
    },
    arrows: {
      type: Boolean,
      default: false
    },
    effect: String,
    fade: Boolean,
    draggable: Boolean,
    vertical: Boolean
  },

  data () {
    return {
      className: 'ant-carousel'
    }
  },

  methods: {
    compiled () {
      if (this.effect === 'fade') {
        this.fade = true,
        this.draggable = false
      }

      if (this.vertical) {
        this.className += ' ant-carousel-vertical'
      }
    }
  }
}
</script>
