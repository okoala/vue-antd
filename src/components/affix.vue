<template>
<div>
	<div
    v-bind:class="[className, {ant-affix: affix}]"
	  v-bind:style="affixStyle">
	  <slot></slot>
	</div>
</div>
</template>

<script>
import rcUtil from 'rc-util'

function getScroll(w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  let method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    let d = w.document;
    //ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      //quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getOffset(element) {
  let rect = element.getBoundingClientRect();
  let body = document.body;
  let clientTop = element.clientTop || body.clientTop || 0;
  let clientLeft = element.clientLeft || body.clientLeft || 0;
  let scrollTop = getScroll(window, true);
  let scrollLeft = getScroll(window);

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}

export default {
  props: {
    offset: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      affix: false,
      affixStyle: null
    }
  },
  methods: {
    handleScroll () {
      let affix = this.affix;
      let scrollTop = getScroll(window, true)
      let elemOffset = getOffset(this.$el)

      if (!affix && (elemOffset.top - this.offset) < scrollTop) {
        this.affix = true
        this.affixStyle = {
            top: this.offset,
            left: elemOffset.left,
            width: this.$el.offsetWidth
          }
      }

      if (affix && (elemOffset.top - this.offset) > scrollTop) {
        this.affix = false
        this.affixStyle = null
      }
    },

    ready () {
      this._scrollEvent = rcUtil.Dom.addEventListener(window, 'scroll', this.handleScroll);
      this._resizeEvent = rcUtil.Dom.addEventListener(window, 'resize', this.handleScroll);
    },

    beforeDestroy () {
      if (this._scrollEvent) {
        this._scrollEvent.remove()
      }
      if (this._resizeEvent) {
        this._resizeEvent.remove()
      }
    }
  }
}
</script>
