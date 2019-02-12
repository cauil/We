const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const HtmlPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./test/index'],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'test'),
    hot: true,
    open: true
  },
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
    /*
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['@babel/plugin-transform-react-jsxtransform-react-jsx', {pragma: 'We.createElement'}],
          ]
        }
      }
    ]
    */
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
