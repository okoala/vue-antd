var webpack = require('webpack')
var webpackConfig = require('./_base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

webpackConfig.devtool = 'source-map'
webpackConfig.eslint.emitWarning = true

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new ExtractTextPlugin('[name].css'),
  new BrowserSyncPlugin({
    proxy: 'localhost:8002'
  })
)

var commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].js'
)

commonChunkPlugin.__KARMA_IGNORE__ = true
webpackConfig.plugins.push(commonChunkPlugin)

module.exports = webpackConfig
