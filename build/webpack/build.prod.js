var webpack = require('webpack')
var banner = require('./banner')

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'vue-antd.min.js',
    library: 'VueAntd',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
