const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ContextMapPlugin = require('context-map-webpack-plugin');
const webpack = require('webpack');

console.log(__dirname);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.ts",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    alias: {
      '@utils': path.join(__dirname, '/src/utils'),
      '@components': path.join(__dirname, '/src/components'),
      '@pages': path.join(__dirname, '/src/pages'),
      '@controllers': path.join(__dirname, '/src/controllers'),
    },
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      path: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: ['/node_modules/']
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      nodeModules: false
    }),
    new ContextMapPlugin('node_modules/pug-filters/lib', []),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    host: 'localhost',
    hot: true
  },
};