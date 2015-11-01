import './style/index.less'
import meta from './package.json'
import * as utils from './utils'

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  }
}

import radio from './components/radio'

const antd = {
  radio
}

antd.utils = utils
antd.version = meta.version

export default antd
