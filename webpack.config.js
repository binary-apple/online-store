const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    publicPath: "/",
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      publicPath: "./"
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
}

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};