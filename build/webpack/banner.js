
var version =
  process.env.VUE_VERSION ||
  require('../package.json').version

module.exports =
  'vue-antd.js v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' Koala Huang\n' +
  'Released under the MIT License.'
