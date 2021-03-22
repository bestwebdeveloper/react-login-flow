require('ts-node/register')

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    publicPath: process.env.PUBLIC_PATH || '/',
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/[name]-[contenthash].js',
    chunkFilename: 'assets/[name]-[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ].filter(p => !!p),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  devServer: {
    host: process.env.WEBPACK_HOST || undefined,
    port: parseInt(process.env.WEBPACK_PORT || 8080),
    open: true,
    historyApiFallback: true,
  },
}
