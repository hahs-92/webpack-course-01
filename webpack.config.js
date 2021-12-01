const path = require('path')
//plugin html
const HtmlWebpackPLugin = require('html-webpack-plugin')


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
        //babel
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPLugin({
            inject: 'body', //true - head - false
            template: './public/index.html',
            filename: './index.html'
        })
    ]
}
