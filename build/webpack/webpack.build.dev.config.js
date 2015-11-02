var webpack = require('webpack')
var banner = require('./banner')

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'vue-antd.js',
    library: 'VueAntd',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
}
