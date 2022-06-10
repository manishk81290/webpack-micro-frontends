const path=require('path');
//const TerserWebpackPlugin=require('terser-webpack-plugin'); //DEFAULT IN PRODUCTION MODE
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {ModuleFederationPlugin}=require('webpack').container;

module.exports={
    //FOR SINGLE HTML FILE USE BELOW
    //entry:'./src/index.js',
    //FOR MULTIPLE HTML PAGE USE BELOW
    entry:'./src/kiwi.js',
    output:{
        filename:'[name].[contenthash].js', // [name] - for sync with entry multiple page name & [contenthash] to keep the file updated if there is any change else remain same
        path:path.resolve(__dirname,'./dist'),
        //publicPath:'/static/' // for local directory
        //publicPath: 'https://some-cdn.com/', //for cdn we need to define the URL here
        publicPath:'http://localhost:9002/',
    },
    mode:'production', //none will not have process.env.NODE_ENV access [none, development, production]
    optimization:{
        splitChunks:{
            chunks:'all',
            minSize:3000,
        }
    },
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
        //new TerserWebpackPlugin(), //DEFAULT IN PRODUCTION MODE
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash].css', // [name] - for sync with entry multiple page name & [contenthash] to keep the file updated if there is any change else remain same
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:'kiwi.html',
            title:'WEBPACK-5 HTML page from Dist folder - KIWI',
            //IF NO TEMPLATE THEN META
            // meta:{
            //     description:'some-description',
            //     keywords:'webpack5 learn webpack'
            // },
            //IF TEMPLATE THEN NO META
            template:'src/index.hbs',
            description:'kiwi-some-description',
            keywords:'webpack5, learn webpack, kiwi',
            og:'test-kiwi',
        }),
        new ModuleFederationPlugin({
            name:'KiwiPageApp',
            filename:'remoteEntry.js',
            exposes:{
                './KiwiPage':'./src/components/KiwiPage/KiwiPage.js',
            },
            remotes:{
                'ImageCaptionApp':'ImageCaptionApp@http://localhost:9003/remoteEntry.js',
            }
        })
    ]
}