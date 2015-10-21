module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'vue-antd.js',
    library: 'VueAntd',
    libraryTarget: 'umd'
  },
  devtool: '#source-map'
}
