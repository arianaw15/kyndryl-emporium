const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',  
  entry: './src/index.js',
    output: {
        path:path.resolve(__dirname, "./dist"),
        publicPath: '/',
        filename: "bundle.js"
    },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            options: {
                presets: ['@babel/react', '@babel/env'],
                plugins: ['@babel/proposal-class-properties', '@babel/syntax-dynamic-import']
              }
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            require.resolve('sass-loader')
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    proxy: {
        '/api': {
             target: 'http://localhost:3000',
             router: () => 'http://localhost:8080',
        }
     },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    fallback: {
      async_hooks: false,
      crypto: false,
      fs: false,
      path: false,
      stream: false,
      url: false,
      util: false,
      querystring: false,
      http: false,
      zlib: false,
      browser: false,
      net: false
    }
},
externals: {
  express: 'express',
},
};
