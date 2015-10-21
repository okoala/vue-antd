import './style/index.less'
import { version } from '../package.json'

import Affix from './components/affix.vue'
import Datepicker from './components/datepicker.vue'
import Tooltip from './components/tooltip.vue'
import Carousel from './components/carousel.vue'
import Tabs from './components/tabs.vue'
import Modal from './components/modal.vue'
import Dropdown from './components/dropdown.vue'
import Progress from './components/progress.vue'
import Popover from './components/popover.vue'
import Select from './components/select'
import Breadcrumb from './components/breadcrumb'
import Popconfirm from './components/popconfirm.vue'
import Pagination from './components/pagination.vue'
import Steps from './components/steps.vue'
import InputNumber from './components/input-number.vue'
import Switch from './components/switch.vue'
import Checkbox from './components/checkbox.vue'
import Table from './components/table.vue'
import Tag from './components/tag.vue'
import Collapse from './components/collapse'
import message from './components/message'
import Slider from './components/slider.vue'
import EnterAnimation from './components/enter-animation.vue'
import Radio from './components/radio'
import Notification from './components/notification'
import Alert from './components/alert.vue'
import Validation from './components/validation.vue'
import Tree from './components/tree.vue'
import Upload from './components/upload.vue'
import Badge from './components/badge.vue'
import Menu from './components/menu.vue'
import Timeline from './components/timeline.vue'

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  }
}

let antd = {
  Affix, Datepicker, Tooltip, Carousel, Tabs, Modal, Dropdown,
  Progress, Popover, Select, Breadcrumb, Popconfirm, Pagination,
  Steps, InputNumber, Switch, Checkbox, Table, Tag,
  Collapse, message, Slider, EnterAnimation, Radio, Notification,
  Alert, Validation, Tree, Upload, Badge, Menu, Timeline
}

antd.version = version

export default antd
