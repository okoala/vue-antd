var webpack = require('webpack')
var webpackConfig = require('./_base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new ExtractTextPlugin('[name].[contenthash].css')
)

webpackConfig.output.filename = '[name].[hash].js'

var commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].[hash].js'
)

commonChunkPlugin.__KARMA_IGNORE__ = true
webpackConfig.plugins.push(commonChunkPlugin)
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())

// webpackConfig.eslint.failOnError = true

module.exports = webpackConfig
