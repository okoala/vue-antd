const rclass = /[\t\r\n\f]/g

export default {
  addClass (m, value) {
    if (!m) return false

    const _classname = m.className
    const s_k = ' '

    if (_classname.indexOf(value) < 0) {
      m.className += s_k + value
    }

    m.className = m.className.trim()
  },

  removeClass (m, value) {
    if (!m) return false

    const _classname = (' ' + m.className + ' ').replace(' ' + rclass + ' ', ' ')

    while (_classname.indexOf(value) >= 0) {
      _classname = _classname.replace(value, ' ')
    }

    m.className = _classname.trim()

    if (!m.className || m.className === '' || m.className === ' ') {
      m.removeAttribute('class')
    }
  },

  addStyle (m, style) {
    if (!m) return false

    if (typeof style === 'object') {
      for (const _s in style) {
        m.style[_s] = style[_s]
      }
    } else {
      let _style = m.getAttribute('style') || ''
      _style += style
      m.setAttribute('style', _style)
    }
  },

  removeStyle(m, style, oneBool) {
    if (!m) return false

    if (typeof style === 'object') {
      for (var _s in style) {
        m.style[_s] = ''
      }
    } else {
      const cArr = style.trim().split(';')

      cArr.map(arr => {
        if (arr && arr !== '') {
          const carr = m.style.cssText.split(';')
          const cOne = arr.split(':')[0].replace(/\s/g, '')
          const cTow = arr.split(':')[1] ? arr.split(':')[1].replace(/\s/g, '') : ''

          carr.map(_arr => {
            if (_arr && _arr !== '') {
              const tcOne = _arr.split(':')[0].replace(/\s/g, '')
              const tcTow = _arr.split(':')[1].replace(/\s/g, '')

              if (oneBool && tcOne.indexOf(cOne) >= 0) {
                m.style[arr.split(':')[0]] = ''
              } else if (tcOne.indexOf(cOne) >= 0 && tcTow === cTow) {
                m.style[arr.split(':')[0]] = ''
              }
            }
          })
        }
      })
    }
  }
}
