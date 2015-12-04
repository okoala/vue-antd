var vue = require('vue-loader')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')

module.exports = {
  entry: {
    app: './docs/index.js',
  },
  output: {
    path: './.temp',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template : './docs/index.html',
      favicon  : './docs/favicon.ico',
      hash     : true,
      filename : 'index.html',
      minify   : false,
      inject   : 'body'
    })
  ],
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?optional[]=runtime&stage=2!eslint'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap&-minimize!' + 'autoprefixer-loader!' + 'less?sourceMap'
        )
      },
      { test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  vue: {
    loaders: {
      // apply babel transform to all javascript
      // inside *.vue files.
      md: 'html!vue-antd-docs',
      js: 'babel?optional[]=runtime&stage=2!eslint',
      less: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!' + 'autoprefixer-loader!' + 'less?sourceMap'
      )
    }
  },
  eslint : {
    configFile : './.eslintrc',
    emitWarning : true
  },
  devtool: 'source-map'
}
