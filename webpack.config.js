const path = require('path')
//plugin html
const HtmlWebpackPLugin = require('html-webpack-plugin')
//css plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//copy files
const CopyPLugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
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
            },
            //images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
            //fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPLugin({
            inject: 'body', //true - head - false
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
        new CopyPLugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        })
    ]
}
