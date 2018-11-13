const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  return {
    entry: {
      'index': './src/js/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: devMode
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    output: {
      filename: 'js/[name].js',
      path: path.join(__dirname, '/dist')
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/fonts', to: 'fonts' }
      ]),
      new FaviconsWebpackPlugin({
        // The favicon app title (see https://github.com/haydenbleasel/favicons#usage)
        // title: 'Webpack App',

        // Your source logo
        logo: './favicon.png',
        // The prefix for all image files (might be a folder or a name)
        prefix: 'favicon[hash]',
        // Emit all stats of the generated icons
        emitStats: false,
        // The name of the json containing all favicon information
        statsFilename: 'faviconstats[hash].json',
        // Generate a cache file with control hashes and
        // don't rebuild the favicons until those hashes change
        persistentCache: true,
        // Inject the html into the html-webpack-plugin
        inject: true,
        // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
        background: '#fff',

        // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          opengraph: true,
          twitter: true,
          yandex: true,
          windows: true
        }
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: './src/index.html',
        filename: './index.html',
        inject: true,
        minify: {
          removeComments: !devMode,
          collapseWhitespace: !devMode
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new webpack.ProvidePlugin({
        /* Use when importing individual BS components */
        // '$': 'jquery/dist/jquery.slim.js',
        // 'jQuery': 'jquery/dist/jquery.slim.js',
        // 'Popper': 'popper.js/dist/umd/popper', /* required for tooltips */
        // 'Util': 'exports-loader?Util!bootstrap/js/dist/util'
      }),
      new WriteFilePlugin(),
      new CompressionPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?url=false', // translates CSS into CommonJS modules
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            'sass-loader' // compiles Sass to CSS
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        }
      ]
    }
  };
};
