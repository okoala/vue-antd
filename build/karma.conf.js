module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
    // this is the entry file for all our tests.
    files: [
      '../test/unit/lib/jquery.js',
      '../test/unit/specs/index.js'
    ],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      '../test/unit/specs/index.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: '#inline-source-map',
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
            // edit this for additional asset file types
            test: /\.(png|jpg|gif)$/,
            loader: 'url',
            query: {
              // inline files smaller then 10kb as base64 dataURL
              limit: 10000,
              // fallback to file-loader with this naming scheme
              name: '[name].[ext]?[hash]'
            }
          }
        ],
        postLoaders: [
          {
            test: /\.js$/,
            exclude: /test|node_modules|vue\/dist|lib\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      },
      vue: {
        loaders: {
          js: 'babel!eslint'
        }
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    colors: true,
    autoWatch: true,
    autoWatchInterval: 300,
    singleRun: true,
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../coverage', subdir: '.' }
      ]
    }
  })
}
