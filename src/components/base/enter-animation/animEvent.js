import Css from './Css'

export default {
  getTransform () {
    let style = 'transform'

    if (!(style in document.documentElement.style)) {
      const prefix = ['webkit', 'moz', 'ms', 'o']

      for (const i in prefix) {
        style = '-' + prefix[i] + '-transform'
        if (style in document.documentElement.style) {
          break
        }
      }
    }

    return style
  },

  getAnimation () {
    let style = 'animation'

    if (!(style in document.documentElement.style)) {
      const prefix = ['webkit', 'moz', 'ms', 'o']

      for (const i in prefix) {
        style = '-' + prefix[i] + '-animation'
        if (style in document.documentElement.style) {
          break
        }
      }
    }

    return style
  },

  whichAnimationEvent () {
    const animation = {
      'animation': 'animationend',
      'oAnimation': 'oanimationend',
      'MozAnimation': 'mozAnimationEnd',
      'WebkitAnimation': 'webkitAnimationEnd',
      'msAnimation': 'MSAnimationEnd'
    }

    for (const t in animation) {
      if (t in document.documentElement.style) {
        return animation[t]
      }
    }
  },

  whichTransitionEvent () {
    const transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }

    for (const t in transitions) {
      if (t in document.documentElement.style) {
        return transitions[t]
      }
    }
  },

  setAnimEventEnd (mc, css, style) {
    const animationEvent = this.whichAnimationEvent()

    function _event() {
      if (document.addEventListener) {
        mc.removeEventListener(animationEvent, _event)
      } else {
        window.detachEvent(animationEvent, _event)
      }

      Css.removeClass(mc, css)
      Css.removeStyle(mc, style)
    }


    if (document.addEventListener) {
      mc.addEventListener(animationEvent, _event)
    } else {
      mc.attachEvent(animationEvent, _event)
    }
  },

  setTrnsitionEnd (mc) {
    const self = this;

    Css.removeStyle(mc, 'opacity:1;visibility:visible')

    if (mc.getAttribute('style')) {
      let s = mc.getAttribute('style').split(';')
      let i = 0
      let _style = ''

      while (i < s.length) {
        if (s[i] !== '') {
          if (s[i].indexOf(mc.style[self.getTransition()]) >= 0 &&
            mc.style[self.getTransition()] &&
            mc.style[self.getTransition()] !== '') {
            s[i] = ''
          }
          //这里的判断为改变s[i]值后的判断
          if (s[i] !== '') {
            _style += s[i] + ';'
          }
        }

        i++
      }

      if (!_style || _style.replace(/\s/g, '') === '') {
        mc.removeAttribute('style')
      } else {
        mc.setAttribute('style', _style)
      }
    }

    mc.removeAttribute('delay')
  }
}
