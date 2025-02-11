const path=require('path');
const { type } = require('os');

module.exports={
    entry:"./src/index.js",
    module:{
        rules:[
            {
                test: /\.html$/,
                use:["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type:'asset/resource'
            }
        ]
    }
       
    
}