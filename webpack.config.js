const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true
  },

  devtool: 'source-map',

  entry: {
    app: ['babel-polyfill', './app/app.js']
  },

  output: {
    filename: '[name].bundle.js',
    publicPath: '',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel-loader'},
       { test: /\.html$/, loader: 'raw-loader' },
       { test: /\.css$/, loader: 'style-loader!css-loader' },
       { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      hash: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'app')) === -1;
      }
    })
  ]
};