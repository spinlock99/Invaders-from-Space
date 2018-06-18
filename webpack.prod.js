var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OfflinePlugin = require("offline-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "docs"),
    filename: "bundle.js",
    publicPath: "/invaders-from-space/"
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: __dirname,
        query: {
          presets: ["env", "react"]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    /*
    new CopyWebpackPlugin([
      { from: "manifest.json" }
    ]),
    */
    new HtmlWebpackPlugin({
      title: "invaders from space",
      template: "src/index.ejs"
    }),
    new HtmlWebpackPlugin({
      filename: "manifest.json",
      template: "manifest.json",
      chunks: []
    }),
    new OfflinePlugin()
  ]
};
