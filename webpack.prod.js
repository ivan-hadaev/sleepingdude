const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin') // installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

const buildPath = path.resolve(__dirname, 'docs')

module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/page-index/index.css',
    policy: './src/page-policy/index.css'
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    path: buildPath
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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new CleanWebpackPlugin(), // cleans output.path by default
    new HtmlWebpackPlugin({
      template: './src/page-index/index.html',
      inject: 'body',
      chunks: ['index'],
      inlineSource: '.(css)$',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-policy/index.html',
      inject: true,
      chunks: ['policy'],
      inlineSource: '.(css)$',
      filename: 'policy.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/images/favicon.svg',
      inject: true,
      favicons: {
        icons: {
          android: false, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          windows: false, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
          yandex: false
        }
      }
    }),
    new CopyPlugin([{ from: 'CNAME', to: buildPath }]),
    new HtmlWebpackInlineSourcePlugin(),
    new FixStyleOnlyEntriesPlugin()
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({

      })
    ]
  }
}
