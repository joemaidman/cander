const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const testConfig = {
   devtool: "cheap-module-source-map",
   externals: {
      'ui-components': 'window'
   },
   module: {
      rules: [
         {
            test: /\.ts?$/,
            loader: 'ts-loader'
         }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
         }
      ]
   },
   plugins: [
      new webpack.DefinePlugin({
         ENV: {
            test: true
         }
      })
   ]
};

module.exports = merge(commonConfig, testConfig);