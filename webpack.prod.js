const path=require('path');
const { merge } = require('webpack-merge');
const common=require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports=merge(common,{
    mode:'production',
    output:{
        filename:"[name].[contenthash].bundle.js",
        path:path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // Removes console logs
              },
              format: {
                comments: false, // Removes comments from the output
              },
            },
            extractComments: false, // Avoids extracting comments into separate files
          }),
          new HtmlWebpackPlugin({
            template: "./src/template.html",
            minify: {
              removeAttributeQuotes: true,
              collapseWhitespace: true,
              removeComments: true
            }
          })
        ]
      },
    plugins: [
        new MiniCssExtractPlugin({ filename: "main.[contentHash].css" }),
        new CleanWebpackPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
});