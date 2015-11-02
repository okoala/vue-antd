function noop () {}

function defaultResolve (data) {
  return data || []
}

export default class DataSource {
  constructor (config) {
    if (config) {
      this.init(config)
    }
  }

  init (config) {
    this.config = config
    this.url = config.url || ''
    this.resolve = config.resolve || defaultResolve
    this.getParams = config.getParams || noop
    this.getPagination = config.getPagination || noop
    this.headers = config.headers || {}
    this.data = config.data || {}
  }

  clone (config = {}) {
    return new DataSource(Object.assign({}, this.config, config))
  }
}
