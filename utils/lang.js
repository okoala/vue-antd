export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const camelizeRE = /-(\w)/g
const toUpper = function (_, c) {
  return c ? c.toUpperCase() : ''
}

export function camelize (str) {
  return str.replace(camelizeRE, toUpper)
}

export function strToObj (str) {
  const strArr = str.split(' ')
  const obj = {}
  strArr.forEach(item => {
    obj[item] = 1
  })
  return obj
}
