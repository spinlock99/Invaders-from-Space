const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    app: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000",
      "./index.js"
    ]
  },

  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/"
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
    new HtmlWebpackPlugin({
      title: "invaders from space",
      template: "src/index.ejs"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv()
  ]
};
