const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/page-index/index.css',
    policy: './src/page-policy/index.css'
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
    writeToDisk: false,
    open: true
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
          // Please note we are not running postcss here
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page-index/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/page-policy/index.html',
      inject: true,
      chunks: ['policy'],
      filename: 'policy.html'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/images/favicon.svg',
      inject: true,
      devMode: 'light' // optional can be 'webapp' or 'light' - 'light' by default
    })
  ]
}
