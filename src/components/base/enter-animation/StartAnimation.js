import Css from './Css'
import Event from './animEvent'

let cssStr = ''
let timeOut = []

const regTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/)

class StartAnim {
  constructor (node, vars = {}) {
    if (!(this.getTransition() in document.documentElement.style)) {
      if (vars && typeof vars.onComplete === 'function') {
        vars.onComplete()
      }

      return false
    }

    this.nodeStr = node
    this.doc = document
    this.tweenData = typeof vars.data === 'object' && vars.data.cBool ? vars.data : null
    this.str = (typeof vars.data === 'string' || !this.tweenData) && vars.data ? vars.data : 'right'
    this.delay = typeof vars.delay === 'number' ? vars.delay * 1000 : 30
    this.interval = typeof vars.interval === 'number' ? vars.interval : 0.1
    this.direction = vars.direction || 'enter'
    this.__ease = vars.ease || 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    this.__timer = typeof vars.duration === 'number' ? vars.duration : 0.5
    this.reverse = vars.reverse || false
    this.callback = vars.onComplete
    this.kill = true
    cssStr += cssStr !== this.str + ';' ? this.str + ';' : ''
    setTimeout(() => {
      cssStr = '';
    }, 1000)//1秒后清掉样式

    if (timeOut.length) {
      timeOut.map(time => {
        clearTimeout(time);
      })
    }

    this.init()
  }

  init () {
    var this = this,

    if (!this.nodeStr || regTag.test(this.nodeStr)) {
      return this.error('node error;')
    }

    if (typeof this.nodeStr === 'string') {
      this.push.apply(this, this.doc.querySelectorAll(this.nodeStr))
    } else if (typeof this.nodeStr === 'object') {
      if (this.nodeStr.length) {
        this.push.apply(this, this.nodeStr)
      } else {
        this.push(this.nodeStr)
      }
    }

    if (!this.length) {
      return this.error('node error;')
    }

    var _mc = this.length === 1 ? this[0].children : this

    //默认值
    this.__delay = 0;
    this.queueIdArr = [];//管理分支队延时间；

    this.__ease = this.__ease || 'cubic-bezier(0.165, 0.84, 0.44, 1)';
    this.__timer = this.__timer || 0.5;
    this.__qId = 0;

    this.forTweenData(_mc, this.tweenData, (mc, data) => {
      if (this.kill) {
        var s = ''

        for (var c = 0; c < cssStr.split(';').length; c++) {
          s += this.animNameGroup(cssStr.split(';')[c]) + ';'
        }

        this.removeStyle(mc, 'transition;' + s, true)
      }

      if (data) {
        const direction = data.direction || this.direction

        if (direction === 'leave') {
          data = data.leave
        } else {
          data = data.enter
        }

        if (data.type ||
            data.style ||
            typeof data.duration === 'number' ||
            data.ease ||
            typeof data.delay === 'number' ||
            typeof data.queueId === 'number') {
          if (this.reverse) {
            //判断分支；
            this.__qId = data.queueId || 0
            //判断延时；
            if (!this.queueIdArr[this.__qId] && this.queueIdArr[this.__qId] !== 0) {
              this.queueIdArr[this.__qId] = 0 + (data.delay || 0)
            } else {
              this.queueIdArr[this.__qId] = Number(Number(this.queueIdArr[this.__qId] + (data.delay || 0) + this.interval).toFixed(3))
            }
          }

          var _style = data.type || data.style || this.str

          if (_style) {
            if (direction === 'leave') {
              this.removeStyle(mc, this.animNameGroup(_style))
            } else {
              this.addStyle(mc, this.animNameGroup(_style))
            }
          }
        }
      } else {
        if (this.reverse) {
          if (!this.queueIdArr[this.__qId] && this.queueIdArr[this.__qId] !== 0) {
            this.queueIdArr[this.__qId] = 0
          } else {
            this.queueIdArr[this.__qId] = Number(Number(this.queueIdArr[this.__qId] + this.interval).toFixed(3))
          }
        }
        if (this.direction === 'leave') {
          this.removeStyle(mc, this.animNameGroup(this.str))
        } else {
          this.addStyle(mc, this.animNameGroup(this.str))
        }
      }
      if (!data || (data && (data.type || data.style))) {
        this.enterLength = this.enterLength ? this.enterLength + 1 : 1
      }
    })

    //出场隐掉没动画的。
    this.leaveHideNull(_mc, this.tweenData)

    setTimeout(() => {
      this.addTween()
    }, this.delay)
  }

  addClass () {
    return Css.addClass
  }

  removeClass () {
    return Css.removeClass
  }

  addStyle () {
    return Css.addStyle
  }

  removeStyle () {
    return css.removeStyle
  }

  getTransform () {
    return Event.getTransform
  }

  getTransition () {
    return Event.getTransition
  }

  getAnimation () {
    return Event.getAnimation
  }

  error (msg) {
    throw new Error(msg)
  }

  leaveHideNull (mc, data) {
    const tm = mc.children || mc

    if (data) {
      for (let i = 0; i < data.length; i++) {
        const _d = data[i]
        const _m = tm[i]
        const e_d = _d.enter
        const l_d = _d.leave
        const e_data = e_d.type || e_d.style || typeof e_d.duration === 'number' || e_d.ease || typeof e_d.delay === 'number' || typeof e_d.queueId === 'number'
        const l_data = l_d.type || l_d.style || typeof l_d.duration === 'number' || l_d.ease || typeof l_d.delay === 'number' || typeof l_d.queueId === 'number'

        const direction = _d.direction || this.direction
        if (!e_data && !l_data && !_d.children && direction === 'leave' && !_d.EnterChild) {
          this.addStyle(mc[i], 'opacity:0')
        } else if (!e_data && !l_data && _m.children && _d.children) {
          this.leaveHideNull(_m.children, _d.children)
        }
      }
    }
  }

  forTweenData (mc, data, callFunc, animBool) {
    if (!mc) {
      if (!animBool) {
        console.warn('Data redundancy:' + JSON.stringify(data))
      }

      return
    }

    const tm = mc.children || mc

    if (data) {
      if (data.length) {
        data.map((m, ii) => {
          if (m.length) {
            this.forTweenData(tm[ii], m, callFunc, animBool)
          } else if (m.children && m.children.length) {
            callFunc(tm[ii], m)
            this.forTweenData(tm[ii], m, callFunc, animBool)
          } else {
            callFunc(tm[ii], m)
          }
        })
      } else if (data.children && data.children.length) {
        data.children.map((m, ii) => {
          if (m.length) {
            this.forTweenData(tm[ii], m, callFunc, animBool);
          } else if (m.children) {
            callFunc(tm[ii], m)
            this.forTweenData(tm[ii], m, callFunc, animBool);
          } else {
            callFunc(tm[ii], m)
          }
        })
      } else {
        this.error('data(' + JSON.stringify(data) + ') is error');
      }
    } else {
      for (var i = 0; i < tm.length; i++) {
        callFunc(tm[i], null);
      }
    }
  }

  fjStyle (node, style, tweenStr) {
    if (typeof style === 'object') {
      for (let _s in style) {
        _s = _s.indexOf('margin') >= 0 ? 'margin' :
          _s.indexOf('padding') >= 0 ? 'padding' :
            _s.indexOf('background') >= 0 ? 'background' :
              _s.indexOf('border') >= 0 ? 'border' :
                _s.indexOf('stroke') >= 0 ? 'stroke' :
                  _s === 'textShadow' ? 'text-shadow' :
                    _s === 'textTransform' ? 'text-transform' : _s;
        node.style[this.getTransition()] = node.style[this.getTransition()] ? node.style[this.getTransition()] + ',' + _s + tweenStr : _s + tweenStr
      }
    } else {
      const cArr = style.trim().split(';')

      for (let i = 0; i < cArr.length; i++) {
        if (cArr[i] && cArr[i] !== '') {
          const sArr = cArr[i].split(':');

          node.style[this.getTransition()] = node.style[this.getTransition()] ? node.style[this.getTransition()] + ',' + sArr[0] + tweenStr : sArr[0] + tweenStr
        }
      }
    }
  }

  addTween () {
    //查找tweenDataArr与dom下子级的匹配；
    let eNum = 0
    const m = this.length === 1 ? this[0].children : this

    this.forTweenData(m, this.tweenData, (mc, data) => {
      let tweenStr = ' ' + this.__timer + 's ' + this.__ease + ' ' + this.__delay + 's'
      let _style = null

      if (data) {
        const direction = data.direction || this.direction

        if (direction === 'leave') {
          data = data.leave
        } else {
          data = data.enter
        }

        if (data.type ||
            data.style ||
            typeof data.duration === 'number' ||
            data.ease ||
            typeof data.delay === 'number' ||
            typeof data.queueId === 'number') {
          //判断分支；
          this.__qId = data.queueId || 0
          //判断延时；
          if (this.reverse) {
            this.queueIdArr[this.__qId] = Number(Number((this.queueIdArr[this.__qId] || 0) - (data.delay || 0)).toFixed(3))
            this.__delay = Number(Number((this.queueIdArr[this.__qId]) + (data.delay || 0)).toFixed(3))
          } else {
            this.queueIdArr[this.__qId] = Number(Number((this.queueIdArr[this.__qId] || 0) + (data.delay || 0)).toFixed(3))
            this.__delay = this.queueIdArr[this.__qId]
          }

          const _ease = data.ease || this.__ease
          const _timer = typeof data.duration === 'number' ? data.duration : this.__timer
          tweenStr = ' ' + _timer + 's ' + _ease + ' ' + this.__delay + 's'
          _style = data.type || data.style || this.str

          if (_style) {
            const _name = this.animNameGroup(_style)
            this.fjStyle(mc, _name, tweenStr)

            if (direction === 'leave') {
              this.addStyle(mc, _name)
            } else {
              this.removeStyle(mc, _name)
            }
          }
        }
      } else {
        this.queueIdArr[this.__qId] = this.queueIdArr[this.__qId] || 0
        this.__delay = this.queueIdArr[this.__qId] || this.queueIdArr[this.__qId] === 0 ? this.queueIdArr[this.__qId] : this.__delay
        tweenStr = ' ' + this.__timer + 's ' + this.__ease + ' ' + this.__delay + 's'
        this.fjStyle(mc, this.animNameGroup(this.str), tweenStr)

        if (this.direction === 'leave') {
          this.addStyle(mc, this.animNameGroup(this.str))
        } else {
          this.removeStyle(mc, this.animNameGroup(this.str))
        }
      }

      if (!data || (data && (data.type || data.style))) {
        mc.setAttribute('delay', this.__delay)

        if (this.reverse) {
          if (this.queueIdArr[this.__qId] > 0) {
            this.queueIdArr[this.__qId] -= this.interval
          }
        } else {
          this.queueIdArr[this.__qId] += this.interval
        }

        timeOut.push(setTimeout(() => {
          eNum++;
          Event.setTrnsitionEnd(mc);
          if (eNum >= this.enterLength) {
            if (typeof this.callback === 'function') {
              this.callback()
            }
          }
        }, (this.__delay + this.__timer) * 1000))
      }
    }, true)
  }

  animNameGroup (name) {
    let _style = ''

    switch (name) {
      case 'alpha':
        _style = 'opacity:0'
        break
      case 'left':
        _style = this.getTransform() + ':translateX(-30px);opacity:0'
        break
      case 'right':
        _style = this.getTransform() + ':translateX(30px);opacity:0;'
        break
      case 'bottom':
        _style = this.getTransform() + ':translateY(30px);opacity:0'
        break
      case 'top':
        _style = this.getTransform() + ':translateY(-30px);opacity:0'
        break
      case 'scale':
        _style = this.getTransform() + ':scale(0);opacity:0'
        break
      case 'scaleBig':
        _style = this.getTransform() + ':scale(2);opacity:0'
        break
      case 'scaleX':
        _style = this.getTransform() + ':scaleX(0);opacity:0'
        break
      case 'scaleY':
        _style = this.getTransform() + ':scaleY(0);opacity:0'
        break
      default :
        _style = name
        break
    }

    return _style
  }
}

export function startAnimation(node, vars) {
  return new StartAnim(node, vars)
}
