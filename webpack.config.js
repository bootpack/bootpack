const path = require('node:path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { discoverPages } = require('./tools/pages');

module.exports = (_environment, options = {}) => {
  const production = options.mode === 'production';
  const source = path.join(__dirname, 'src');
  return {
    mode: production ? 'production' : 'development',
    context: __dirname,
    entry: { index: './src/js/index.js' },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: production ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: 'auto',
      clean: true
    },
    devtool: production ? false : 'source-map',
    devServer: {
      host: '127.0.0.1',
      port: 8080,
      static: false,
      watchFiles: ['src/**/*.html'],
      historyApiFallback: false,
      client: { overlay: true }
    },
    optimization: { minimizer: ['...', new CssMinimizerPlugin({
      minimizerOptions: { preset: ['default', { svgo: false }] }
    })] },
    plugins: [
      new CopyWebpackPlugin({ patterns: [
        { from: 'src/images', to: 'images', noErrorOnMissing: true },
        { from: 'src/fonts', to: 'fonts', noErrorOnMissing: true }
      ] }),
      new MiniCssExtractPlugin({ filename: production ? 'css/styles.[contenthash:8].css' : 'css/styles.css' }),
      ...discoverPages(source).map(page => new HtmlWebpackPlugin({
        ...page,
        favicon: path.join(source, 'favicon.png'),
        scriptLoading: 'defer',
        minify: production
      }))
    ],
    module: { rules: [{
      test: /\.(css|scss)$/i,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { url: false } },
        { loader: 'postcss-loader', options: { postcssOptions: { plugins: [autoprefixer()] } } },
        { loader: 'sass-loader', options: { sassOptions: { quietDeps: true, silenceDeprecations: ['import'] } } }
      ]
    }] }
  };
};
