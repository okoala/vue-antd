export function getValuePropValue (child) {
  const props = child.props
  if ('value' in props) {
    return props.value
  }
  if (child.key) {
    return child.key
  }
  throw new Error('no key or value for ' + child)
}

export function getPropValue (child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child)
  }
  return child.props[prop]
}

export function isCombobox (props) {
  return props.combobox
}

export function isMultipleOrTags (props) {
  return props.multiple || props.tags
}

export function isMultipleOrTagsOrCombobox (props) {
  return isMultipleOrTags(props) || isCombobox(props)
}

export function isSingleMode (props) {
  return !isMultipleOrTagsOrCombobox(props)
}

export function toArray (value) {
  let ret = value
  if (value === undefined) {
    ret = []
  } else if (!Array.isArray(value)) {
    ret = [value]
  }
  return ret
}
