const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common=require('./webpack.common');

module.exports=merge(common,{
    mode:'development',
    output:{
        filename:"[name].bundle.js",
        path:path.resolve(__dirname, "dist")
    },    
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/template.html"
        })
      ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000, // Optional: Specify a port
        open: true, // Automatically open the browser
        hot: true,  // Enable Hot Module Replacement (HMR)
    }
});