const path = require("path")
const RefreshWebpack = require("@pmmmwh/react-refresh-webpack-plugin")
//process.env.NODE_ENV  = 'production'

module.exports = {
  name: "mineSearch-setting",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      path: require.resolve("path-browserify"),
      // webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case. Verify if you need this module and configure a polyfill for it. 문제 해결
    },
  },
  entry: {
    app: ["./client"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          compact: false,
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties", "react-refresh/babel"],
        },
      },
    ],
  },
  plugins: [new RefreshWebpack()],
  output: {
    path: path.join(__dirname, "dist"), // 실제의 경로
    filename: "app.js",
    publicPath: "/dist/", // 가상의 경로 app.use(express.static(__dirname,'dist'))
  },
  devServer: {
    publicPath: "/dist/",
    hot: true,
  },
}
