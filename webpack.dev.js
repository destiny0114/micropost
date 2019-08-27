const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = merge(config, {
    mode: 'development',
    output: {
        // must set dist on path, in file name u can set dist of subfolder
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devServer: {
        index: 'template/index.html'
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
});