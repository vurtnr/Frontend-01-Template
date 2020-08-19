const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "createElement" },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
     {
       template:'./src/index.html'
     }
    ),
  ],
  mode: "development",
  optimization: {
    minimize: false,
  },
  devServer: {
    open: true,
    compress: false,
    contentBase: "./src",
  },
};
