const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  publicPath: './dist/',
  filename: './[name].css',
  allChunks: true,
});

const spreadPlugin = require('@babel/plugin-proposal-object-rest-spread');

module.exports = {
  entry: ['./src/app.js', './src/app.scss'],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [spreadPlugin],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
      },
    ],
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: './index.html',
    }),
    new WriteFilePlugin({
      test: /\.css$/,
    }),
  ],
};
