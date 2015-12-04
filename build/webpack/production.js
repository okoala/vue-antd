var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpackConfig = require('./_base')

webpackConfig.output.filename = '[name].[hash].js'

var commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', '[name].[hash].js'
)

commonChunkPlugin.__KARMA_IGNORE__ = true

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  commonChunkPlugin,
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin()
)

webpackConfig.eslint.failOnError = true

module.exports = webpackConfig
