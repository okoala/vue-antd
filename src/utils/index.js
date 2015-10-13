
// 返回vue匹配的props的对象
export function defaultProps (props) {
  for (const i in props) {
    if (props.hasOwnProperty(i)) {
      let defaultValue = props[i]
      let type = Object.prototype.toString.call(defaultValue).replace('[object ', '').replace(']', '')

      props[i] = {
        type: window[type],
        default: defaultValue
      }
    }
  }

  return props
}
