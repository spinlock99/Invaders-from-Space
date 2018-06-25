const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = function(env) {
  console.log("env: ", env)

  return {
    entry: env == 'prod' ? "./index.js" : {
      app: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000",
        "./index.js"
      ]
    },

    output: {
      path: env === "prod" ? path.join(__dirname, "docs") : __dirname,
      filename: "bundle.js",
      publicPath: env === "prod" ? "/invaders-from-space/" : "/",
    },

    resolve: {
      modules: [
        path.resolve(__dirname, 'images'),
        path.resolve(__dirname, 'src'),
        'node_modules',
      ]
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
    ].concat(env === "prod" ? [
      new webpack.DefinePlugin({
        "process.env": { NODE_ENV: JSON.stringify("production") }
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({
        filename: "manifest.json",
        template: "manifest.json",
        chunks: []
      }),
      new OfflinePlugin()
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new Dotenv()
    ])
  };
};
