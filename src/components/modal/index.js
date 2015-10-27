import Modal from './Modal.vue'
import confirm from './confirm'

Modal.info = function (props) {
  props.iconClassName = 'info-circle'
  props.okCancel = false
  return confirm(props)
}

Modal.success = function (props) {
  props.iconClassName = 'check-circle'
  props.okCancel = false
  return confirm(props)
}

Modal.error = function (props) {
  props.iconClassName = 'exclamation-circle'
  props.okCancel = false
  return confirm(props)
}

Modal.confirm = function (props) {
  props.okCancel = true
  return confirm(props)
}

export default Modal
