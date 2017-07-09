/* eslint-disable import/no-extraneous-dependencies */
const webpack           = require('webpack');
const path              = require('path');
const DashboardPlugin   = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer      = require('autoprefixer');
/* eslint-enable */

const nodeEnv       = process.env.NODE_ENV || 'development';
const isProduction  = nodeEnv === 'production';
const isStaging     = nodeEnv === 'staging';

const isProductionBuild = isProduction || isStaging;

const jsSourcePath  = path.join(__dirname, './app');
const buildPath     = path.join(__dirname, './build');
const imgPath       = path.join(__dirname, './app/assets/img');
const sourcePath    = path.join(__dirname, './app');
const staticPath    = path.join(__dirname, './app/static');

/* eslint-disable global-require, import/newline-after-import */
let environment = require('./dev.env.js');
if (isProduction) {
  environment = require('./prod.env.js');
} else if (isStaging) {
  environment = require('./staging.env.js');
}
/* eslint-enable */

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    webpackEnv: JSON.stringify(environment)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash].js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: sourcePath,
    },
  }),
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: imgPath,
    use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    use: [
      'file-loader'
    ]
  }
];

if (isProductionBuild) {
  // Production plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('style-[hash].css'),
    new CopyWebpackPlugin([
      {
        from: staticPath,
        to: './static'
      }
    ])
  );

  // Production rules
  rules.push(
    {
      test: /\.(sass|css|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!sass-loader',
      }),
    }
  );
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  );

  // Development rules
  rules.push(
    {
      test: /\.(css|sass)$/,
      use: [
        'style-loader',
        // Using source maps breaks urls in the CSS loader
        // https://github.com/webpack/css-loader/issues/232
        // This comment solves it, but breaks testing from a local network
        // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
        // 'css-loader?sourceMap',
        'css-loader',
        'postcss-loader',
        'sass-loader?sourceMap',
      ],
    }
  );
}

module.exports = {
  devtool: (isProductionBuild) ? 'eval' : 'source-map',
  context: jsSourcePath,
  entry: {
    js: './app.jsx',
    vendor: [
      'babel-polyfill',
      'es6-promise',
      'immutable',
      'isomorphic-fetch',
      'react-dom',
      'react-redux',
      'react-router',
      'react',
      'redux-thunk',
      'redux',
    ],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      jsSourcePath,
    ],
  },
  plugins,
  devServer: {
    contentBase: (isProductionBuild) ? './build' : './app',
    historyApiFallback: true,
    overlay: true,
    port: 3030,
    compress: isProductionBuild,
    inline: !isProductionBuild,
    hot: !isProductionBuild,
    host: '0.0.0.0',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
