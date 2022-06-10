const path=require('path');
//const TerserWebpackPlugin=require('terser-webpack-plugin'); //NO NEED IN DEVELOPMENT MODE
//const MiniCssExtractPlugin=require('mini-css-extract-plugin'); //NO NEED IN DEVELOPMENT MODE
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {ModuleFederationPlugin}=require('webpack').container;

module.exports={
    //FOR SINGLE FILE USE BELOW
    //entry:'./src/index.js',
    //FOR MULTIPLE FILES USE BELOW
    entry:'./src/dashboard.js',
    output:{
        filename:'[name].js', //[name] to keep the file sync with the multiple file as per the name under entry object & [contenthash] ONLY IN DEV
        path:path.resolve(__dirname,'./dist'),
        //publicPath:'dist/' // for local directory
        //publicPath: 'https://some-cdn.com/', //for cdn we need to define the URL here
        //publicPath:'http://localhost:9002/'
    },
    mode:'development', //none will not have process.env.NODE_ENV access [none, development, production]
    devServer:{
        port:9000,
        static:{
            directory:path.resolve(__dirname,'./dist'),
        },
        devMiddleware:{
            index:'dashboard.html',
            writeToDisk:true, //this is to save the files to disk i.e. to kept the file inside the dist folder in this case (true), else it will be kept in the memory only (false)
        },
        historyApiFallback:{
            index:'dashboard.html'
        }
    },
    //USE BELOW ONLY IN PROD AS WE DONT WANT TO OPTIMIZE CODE ON DEV ENV
    // optimization:{
    //     splitChunks:{
    //         chunks:'all',
    //         minSize:3000
    //     }
    // },
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
                    //MiniCssExtractPlugin.loader, //FOR PRODUCTION MODE
                    'style-loader',
                    'css-loader' //it make the JS representation from the CSS
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    //FOR CSS LOADER USE BELOW
                    //'style-loader', //it created the style tag in the HTML and put the styles
                    //FOR PLUGIN LOADER USE BELOW
                    //MiniCssExtractPlugin.loader, //FOR PRODUCTION MODE
                    'style-loader',
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
        //new TerserWebpackPlugin(), //NO NEED IN DEVELOPMENT MODE
        // new MiniCssExtractPlugin({ //NODE NEED IN DEVELOPMENT MODE
        //     filename:'styles.[contenthash].css',
        // }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:'dashboard.html',
            title:'DASHBOARD APPLICATION',
            //IF NO TEMPLATE THEN META
            // meta:{
            //     description:'some-description',
            //     keywords:'webpack5 learn webpack'
            // },
            //IF TEMPLATE THEN NO META
            // template:'src/index.hbs',
            // description:'some-description',
            // keywords:'webpack5 learn webpack',
            // og:'test',
        }),
        new ModuleFederationPlugin({
            name:'MAINAPP',
            remotes:{
                'HelloWorldApp':'HelloWorld@http://localhost:9001/remoteEntry.js',
                'KiwiApp':'Kiwi@http://localhost:9002/remoteEntry.js',
            }
        })
    ]
}