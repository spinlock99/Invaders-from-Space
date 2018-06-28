const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = env =>
  ({
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
        path.resolve(__dirname),
        path.resolve(__dirname, 'src'),
        'node_modules',
      ]
    },

    module: {
      loaders: [
        {
          test: /\.(png|jpg|gif|mp3)$/,
          loader: "file-loader"
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          include: __dirname,
          query: {
            presets: ["env", "react"],
            plugins: ["transform-class-properties", "transform-object-rest-spread"],
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
  })
