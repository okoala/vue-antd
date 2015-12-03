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

import vTag from './components/tag'
import vSpin from './components/spin'
import vBadge from './components/badge'
import vTable from './components/table'
import vAffix from './components/affix'
import vIcon from './components/iconfont'
import vSwitch from './components/switch'
import vUpload from './components/upload'
import vCheckbox from './components/checkbox'
import { vRow, vCol } from './components/layout'
import vSteps, { vStep } from './components/steps'
import vInputNumber from './components/input-number'
// import vSelect, { vOption } from './components/select'
import vRadio, { vRadioGroup } from './components/radio'
import vButton, { vButtonGroup } from './components/button'
import vBreadcrumb, { vBreadcrumbItem } from './components/breadcrumb'
import { vProgressLine, vProgressCircle } from './components/progress'

const antd = {
  vRow,
  vCol,
  vButton,
  vButtonGroup,
  vIcon,
  vCheckbox,
  vInputNumber,
  vRadio,
  vRadioGroup,
  // vSelect,
  // vOption,
  vSwitch,
  vUpload,
  vBadge,
  vProgressLine,
  vProgressCircle,
  vTable,
  vTag,
  vSpin,
  vBreadcrumb,
  vBreadcrumbItem,
  vSteps,
  vStep,
  vAffix
}

antd.utils = utils
antd.version = meta.version

export default antd
