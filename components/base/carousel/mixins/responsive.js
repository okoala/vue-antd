import enquire from 'enquire.js'
import json2mq from 'json2mq'

export default {
  beforeDestory () {
    if (this._responsiveMediaHandlers) {
      this._responsiveMediaHandlers.forEach(obj => {
        enquire.unregister(obj.query, obj.handler)
      })
    }
  },

  methods: {
    media (query, handler) {
      const _query = json2mq(query)
      if (typeof handler === 'function') {
        handler = {
          match: handler
        }
      }
      enquire.register(_query, handler)

      // Queue the handlers to unregister them at unmount
      if (!this._responsiveMediaHandlers) {
        this._responsiveMediaHandlers = []
      }
      this._responsiveMediaHandlers.push({query: _query, handler: handler})
    }
  }
}
