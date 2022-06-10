const path=require('path');
const TerserWebpackPlugin=require('terser-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry:'./src/index.js',
    output:{
        filename:'bundle.[contenthash].js', //[contenthash]
        path:path.resolve(__dirname,'./dist'),
        //publicPath:'dist/' // for local directory
        //publicPath: 'https://some-cdn.com/', //for cdn we need to define the URL here
    },
    mode:'development', //none will not have process.env.NODE_ENV access [none, development, production]
    module:{
        rules:[
            //FOR ASSET/RESOURCE
            {
                test: /\.(.png|jpeg)$/,
                type:'asset/resource'
            },
            //FOR ASSET/INLINE
            // {
            //     test: /\.(.png|jpeg)$/,
            //     type:'asset/inline'
            // }
            //FOR GENERAL ASSET
            // {
            //     test: /\.(.png|jpeg)$/,
            //     type:'asset',
            //     parser:{
            //         dataUrlCondition:{
            //             maxSize:3*1024*1024 //2MB
            //         }
            //     }
            // },
            //FOR ASSET/SOURCE
            {
                test:/\.txt$/,
                type:'asset/source'
            },
            {
                test:/\.css$/,
                use:[
                    //FOR CSS LOADER USE BELOW
                    //'style-loader', //it created the style tag in the HTML and put the styles
                    //FOR PLUGIN LOADER USE BELOW
                    MiniCssExtractPlugin.loader,
                    'css-loader' //it make the JS representation from the CSS
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    //FOR CSS LOADER USE BELOW
                    //'style-loader', //it created the style tag in the HTML and put the styles
                    //FOR PLUGIN LOADER USE BELOW
                    MiniCssExtractPlugin.loader,
                    'css-loader', //it make the JS representation from the coverted CSS
                    'sass-loader' //convert scss to css
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/env'], //compile ES6,7,8....so on. least version is ES5
                        plugins:['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test:/\.hbs$/,
                use:[
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins:[
        new TerserWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'styles.[contenthash].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'WEBPACK-5 HTML page from Dist folder',
            //IF NO TEMPLATE THEN META
            // meta:{
            //     description:'some-description',
            //     keywords:'webpack5 learn webpack'
            // },
            //IF TEMPLATE THEN NO META
            template:'src/index.hbs',
            description:'some-description',
            keywords:'webpack5 learn webpack',
            og:'test'
        })
    ]
}