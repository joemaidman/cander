const path = require('path');
const webpack = require('webpack');

module.exports = {
   entry: {
    filename: './src/app.ts'
   },
   output: {
      filename: './resources/public/bundle.js',
      path: __dirname
   },
   devtool: "source-map",
   resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss", ".css"],
      alias: {
         normalize: path.join(__dirname, '/node_modules/normalize.css')
      }
   },
   externals : {
   },
   module: {
      rules: [{
         test: /\.tsx?$/,
         loader: 'tslint-loader',
         enforce: 'pre',
         exclude: /node_modules|\.spec\.tsx/
      },
         {
            test: /\.tsx?$/,
            loader: 'ts-loader'
         },
         {
            test: /\.scss$/,
            use: [{
               loader: "style-loader" // creates style nodes from JS strings
            }, {
               loader: "css-loader", // translates CSS into CommonJS
               query: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
               }
            }, {
               loader: "sass-loader" // compiles Sass to CSS
            }]
         },
         {
            test: /\.css$/,
            include: /assets/,
            use: [
               "style-loader",
               {
                  loader: "css-loader",
                  options: {
                     modules: true,
                     sourceMap: true,
                     importLoaders: 1,
                     localIdentName: "[name]"
                  }
               }
            ]
         },
         {
            test: /\.(woff|woff2)$/,
            loader: 'url-loader',
            options: {
               mimetype: 'application/font-woff',
               name: './public/fonts/[name].[ext]'
            }
         }
      ]
   },
   plugins: [
      new webpack.DefinePlugin({
         ENV: {dev: true}
      })
   ]
};