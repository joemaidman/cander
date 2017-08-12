const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const name = 'cander';

const rootDir = path.resolve();

const postCssLoader = {
   loader: 'postcss-loader',
   options: {
      plugins: [
         autoprefixer({
            browsers: ['ie 11']
         })
      ]
   }
};

module.exports = {
   entry: [
      './src/app.ts'
   ],
   output: {
      filename: './resources/public/bundle.js',
      path: rootDir
   },
   resolve: {
      extensions: [
         ".ts",
         ".tsx",
         ".js",
         ".scss"
      ],
      alias: {
         normalize: path.join(__dirname, '/node_modules/normalize.css')
      }
   },
   externals: [
     
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
         },
         {
            test: /\.scss$/,
            use: [
               {
                  loader: "style-loader"
               },
               {
                  loader: "css-loader",
                  options: {
                     modules: true,
                     importLoaders: 1,
                     localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
               },
               postCssLoader,
               {
                  loader: "sass-loader"
               }
            ]
         },
         {
            test: /\.css$/,
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
               },
               postCssLoader
            ]
         },
         {
            test: /\.css$/,
            include: /react-select/,
            use: [
               "style-loader",
               "css-loader",
               postCssLoader
            ]
         },
      ]
   }

};