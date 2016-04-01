// we can just use the exact same webpack config by requiring it
// but make sure to delete the normal entry
var webpackConf = require('./webpack.base.config')
delete webpackConf.entry

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    // this is the entry file for all our tests.
    files: ['../test/unit/index.js'],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      '../test/unit/index.js': ['webpack']
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}
