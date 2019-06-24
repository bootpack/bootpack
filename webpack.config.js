const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsPlugin = require('favicons-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const fs = require('fs');

const devMode = process.env.NODE_ENV !== 'production';
const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const htmlPages = [];

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

var dirWalk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.join(dir, file);
      fs.stat(file, function(err, stat) {
        if (err) throw err;
        if (stat && stat.isDirectory()) {
          results.push(file);
          dirWalk(file, function(err, res) {
            if (err) throw err;
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

var generateHtmlPages = function(templateDir, relOutput) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    if (extension && (extension === 'html' || extension === 'htm')) {
      htmlPages.push(new HtmlWebpackPlugin({
        hash: true,
        filename: `${relOutput}/${name}.${extension}`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: true,
        minify: {
          removeComments: !devMode,
          collapseWhitespace: !devMode
        }
      }));
    }
  });
};

module.exports = () => {
  return new Promise(resolve => {
    dirWalk('./src', function(err, results) {
      if (err) throw err;
      generateHtmlPages('./src', './');
      let dirCount = results.length;
      asyncForEach(results, async directory => {
        await waitFor(50);
        dirCount--;
        var relOutput = directory.replace('src', '.');
        generateHtmlPages(directory, relOutput);
        if (dirCount <= 0) {
          await waitFor(50);
          resolve({
            entry: {
              'index': './src/js/index.js'
            },
            devtool: 'inline-source-map',
            devServer: {
              before: function(app, server) {
                app.get('*/index.html', function(req, res, next) {
                  res.redirect(req.originalUrl.split('index.html').shift());
                });
              }
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
              new CleanWebpackPlugin(),
              new CopyWebpackPlugin([
                { from: 'src/images', to: 'images' },
                { from: 'src/fonts', to: 'fonts' }
              ]),
              new MiniCssExtractPlugin({
                filename: 'css/styles.css'
              }),
              new webpack.ProvidePlugin({
                /* Use when importing individual BS components */
                // '$': 'jquery/dist/jquery.slim.js',
                // 'jQuery': 'jquery/dist/jquery.slim.js',
                // 'Popper': 'popper.js/dist/umd/popper', /* required for tooltips */
                // 'Util': 'exports-loader?Util!bootstrap/js/dist/util'
              }),
              new FaviconsPlugin({
                // The favicon app title (see https://github.com/haydenbleasel/favicons#usage)
                // title: 'Webpack App',

                // Your source logo
                logo: path.resolve(__dirname, 'src/favicon.png'),
                // The prefix for all image files (might be a folder or a name)
                prefix: 'favicon-[hash]',
                // Emit all stats of the generated icons
                emitStats: false,
                // The name of the json containing all favicon information
                statsFilename: 'faviconstats-[hash].json',
                // Generate a cache file with control hashes and
                // don't rebuild the favicons until those hashes change
                persistentCache: false,
                // Inject the html into the html-webpack-plugin
                inject: true,
                // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
                background: '#fff',

                // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
                icons: {
                  android: !devMode,
                  appleIcon: !devMode,
                  appleStartup: !devMode,
                  coast: !devMode,
                  favicons: true,
                  firefox: !devMode,
                  opengraph: !devMode,
                  twitter: !devMode,
                  yandex: !devMode,
                  windows: !devMode
                }
              }),
              ...htmlPages,
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
                      name: '[path][name].[ext]'
                    }
                  }
                },
                {
                  test: /\.(woff|woff2|eot|ttf|otf)$/,
                  use: {
                    loader: 'file-loader',
                    options: {
                      name: '[path][name].[ext]'
                    }
                  }
                },
                {
                  test: /\.html$/,
                  use: [ {
                    loader: 'html-loader',
                    options: {
                      minimize: true
                    }
                  }]
                }
              ]
            }
          });
        }
      });
    });
  });
};
