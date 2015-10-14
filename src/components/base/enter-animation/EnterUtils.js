const utils = {
  toArrayChildren (el) {
    const ret = []
    const children = el.children

    for (let i = 0; i < children.length; i++) {
      ret.push(children[i])
    }

    return ret
  },

  deleteRepeatKeyArr (arr) {
    let result = []
    let hash = {}

    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i]

      if (elem) {
        if (elem.key) {
          if (elem && !hash[elem.key]) {
            result.push(elem)
            hash[elem.key] = true
          }
        } else {
          result.push(elem)
        }
      }
    }

    return result
  },

  isPropsPushData (data, enterDataType) {
    let _data = {}

    if (data) {
      for (const a in data) {
        _data[a] = data[a]
      }

      if (!_data.type && !_data.style) {
        _data.type = enterDataType
      }
    }

    return _data
  },

  leaveInherit: function (a, _root, b) {
    if (a.type || b.type) {
      a.type = a.type || _root.type || b.type
    }

    if (a.style || b.style) {
      a.style = a.style || _root.style || b.style
    }

    if (typeof a.duration === 'number' || typeof b.duration === 'number') {
      a.duration = typeof a.duration === 'number' ? a.duration : b.duration
    }

    if (a.ease || b.ease) {
      a.ease = a.ease || b.ease
    }

    if (typeof a.delay === 'number' || b.delay) {
      a.delay = typeof a.delay === 'number' ? a.delay : b.delay
    }

    if (typeof a.queueId === 'number' || b.queueId) {
      a.queueId = typeof a.queueId === 'number' ? a.queueId : b.queueId
    }

    if (a.type || a.style) {
      if (typeof a.duration !== 'number' && typeof _root.duration === 'number') {
        a.duration = _root.duration
      }

      if (!a.ease && _root.ease) {
        a.ease = _root.ease
      }
    }

    return a
  }
}
