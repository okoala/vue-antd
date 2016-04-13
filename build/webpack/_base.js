var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var path = require('path')

module.exports = {
  entry: {
    app: './docs/index.js'
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
      template: './docs/index.html',
      favicon: './docs/favicon.ico',
      hash: true,
      filename: 'index.html',
      minify: false,
      inject: 'body'
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
        test: /\.js$/,
        loader: 'babel!eslint',
        // make sure to exclude 3rd party code in node_modules
        exclude: /node_modules/
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: 'url',
        query: {
          // inline files smaller then 10kb as base64 dataURL
          limit: 10000,
          // fallback to file-loader with this naming scheme
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap&-minimize!' + 'postcss-loader!' + 'less?sourceMap'
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
      js: 'babel!eslint'
      // less: ExtractTextPlugin.extract(
      //   'css?sourceMap&-minimize!' + 'postcss-loader!' + 'less?sourceMap'
      // )
    }
  },
  postcss: [autoprefixer],
  devtool: 'source-map'
}
