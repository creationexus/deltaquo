const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname,'dist'),
    filename: 'main.bundle-[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader'},
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  // EVIROMENT MODE
  mode: process.env.NODE_ENV || 'development',
  
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname,'public','index.html'),
      filename: 'index.html'
    })
  ]
};