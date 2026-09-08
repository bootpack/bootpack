const path = require('node:path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { discoverPages, createPageBundles } = require('./tools/pages');
const pageEntries = require('./page-entries');
const { version } = require('./package.json');

module.exports = (_environment, options = {}) => {
  const production = options.mode === 'production';
  const source = path.join(__dirname, 'src');
  const bundles = createPageBundles(discoverPages(source), pageEntries);
  return {
    name: `bootpack-${version}`,
    mode: production ? 'production' : 'development',
    context: __dirname,
    entry: { index: './src/js/index.js', ...bundles.entry },
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
      new MiniCssExtractPlugin({ filename: pathData => {
        const name = pathData.chunk.name === 'index' ? 'styles' : '[name]';
        return production ? `css/${name}.[contenthash:8].css` : `css/${name}.css`;
      } }),
      ...bundles.pages.map(page => new HtmlWebpackPlugin({
        ...page,
        inject: page.filename !== '404.html',
        favicon: page.filename === '404.html' ? false : path.join(source, 'favicon.png'),
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
