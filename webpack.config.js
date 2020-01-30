const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    a: './client/index.js',
    b: './client/loginpage.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: '[name].entry.js',
  },
  devServer: {
    // contentBase: path.join(__dirname, 'public/index.html'),
    publicPath: 'http://localhost:8080/dist/',
    proxy: {
      '/': 'http://localhost:3000',
      '/test': 'http://localhost:3000',
    },
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  
};
