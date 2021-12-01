const path = require('path')
//plugin html
const HtmlWebpackPLugin = require('html-webpack-plugin')
//css plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('webpack').Configuration} */

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.mjs','.js']
    },
    module: {
        rules: [
            //babel
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            //css
            {
                test: /\.css|.styl$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPLugin({
            inject: 'body', //true - head - false
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}
