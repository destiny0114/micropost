const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Jarvis = require("webpack-jarvis");

module.exports = {
    entry: {
        app: './src/js/app.js',
        vendor: './src/js/vendor.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: true
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, './node_modules')
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        // bootstrap loader
                        // if want import bootstrap in js file remember install export-loader and
                        // postcss-loader
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }],
            }
            // font-awesome webfont
            // if warning is Failed to decode downloaded font. OTS parsing error: invalid version tag
            // that mean u need set ext in test
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: './template/index.html',
            title: 'MicroPost',
            template: './src/template/template.html'
        }),
        new Jarvis({
            port: 1337 // optional: set a port
        })
    ]
}