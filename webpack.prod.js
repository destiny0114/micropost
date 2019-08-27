const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contentHash].js'
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            }),
            new UglifyJSPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true,  //删除所有console语句，可以兼容IE
                        collapse_vars: true,  //内嵌已定义但只使用一次的变量
                        reduce_vars: true,  //提取使用多次但没定义的静态值到变量
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: {
                        beautify: false, //最紧凑的输出，不保留空格和制表符
                        comments: false,
                        semicolons: false,
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                    comments: false,
                }
            }),
            new HtmlWebpackPlugin({
                filename: './template/index.html',
                title: 'MicroPost',
                template: './src/template/template.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "css/[name].[contentHash].css" }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //3. Extract css into files
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader" //1. Turns sass into css
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[contentHash].[ext]',
                            outputPath: './fonts',
                            publicPath: '../fonts'
                            // outputpath is where your file want to export
                            // publicparh is url path where broswer want load the file, u can put
                            // path url like http://localhost:8080/fonts
                            // if confuse just check console error need be patient fix it 
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[contentHash].[ext]',
                            outputPath: 'images/'
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        }
                    },
                ],
            }
        ]
    }
});