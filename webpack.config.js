const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')

module.exports = (currentEnv) => {
  const isDevelopment = currentEnv.NODE_ENV !== 'production'
  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
      filename: '[name].[contenthash].js',
      sourceMapFilename: '[name].[contenthash].js.map',
      path: path.resolve(__dirname + '/build'),
    },
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 4000,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    devtool: isDevelopment ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          test: /\.(css|scss)$/i,
          use: [
            !isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new InterpolateHtmlPlugin({
        PUBLIC_URL: '',
        HOME_TITLE: '9oodgee',
      }),
      new HtmlWebPackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'public/index.html'),
      }),
    ].filter(Boolean),
  }
}
