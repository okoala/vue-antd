import Notification from '../base/notification'

let top = '24px'
let notificationInstance

function getNotificationInstance () {
  if (notificationInstance) {
    return notificationInstance
  }

  notificationInstance = Notification.newInstance({
    prefixCls: 'ant-notification',
    style: {
      top: top,
      right: 0
    }
  })

  return notificationInstance
}

function notice (args) {
  let duration

  if (args.duration === undefined) {
    duration = 4.5
  } else {
    duration = args.duration
  }

  if (args.icon) {
    let prefixCls = ' ant-notification-notice-content-icon-'
    let iconClass = 'anticon anticon-'

    switch (args.icon) {
      case 'success':
        iconClass += 'check-circle-o'
        break
      case 'info':
        iconClass += 'info-circle-o'
        break
      case 'error':
        iconClass += 'exclamation-circle-o'
        break
      case 'warn':
        iconClass += 'question-circle-o'
        break
      default:
        iconClass += 'info-circle'
    }

    getNotificationInstance().notice({
      content: `<div>
        <i class="${iconClass}${prefixCls}icon-${args.icon}${prefixCls}icon"></i>
        <p class="${prefixCls}message">${args.message}</p>
        <p class="${prefixCls}description">${args.description}</p>
      </div>`,
      duration: duration,
      closable: true,
      onClose: args.onClose,
      style: {}
    })
  } else {
    let prefixCls = 'ant-notification-notice-content-'

    if (!args.btn) {
      getNotificationInstance().notice({
        content: `<div> +
          <p class="${prefixCls}message">${args.message}</p>
          <p class="${prefixCls}description">${args.description}</p>
        </div>`,
        duration: duration,
        closable: true,
        onClose: args.onClose,
        style: {}
      })
    } else {
      getNotificationInstance().notice({
        content: `<div>
          <p class="${prefixCls}message">${args.message}</p>
          <p class="${prefixCls}description">${args.description}</p>
          <span class="${prefixCls}btn">${args.btn}</span>
        </div>`,
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
      })
    }
  }
}

let api = {
  open (args) {
    notice(args)
  },
  close (key) {
    if (notificationInstance) {
      notificationInstance.removeNotice(key)
    }
  },
  config (options) {
    top = options.top
  }
};

['success', 'info', 'warn', 'error'].forEach(type => {
  api[type] = args => {
    let newArgs = Object.assign({}, args, {
      icon: type
    })

    return api.open(newArgs)
  }
})

export default api
