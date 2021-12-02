const path = require('path')
//plugin html
const HtmlWebpackPLugin = require('html-webpack-plugin')
//css plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//copy files
const CopyPLugin = require('copy-webpack-plugin')
//variables de entorno
const Dotenv = require('dotenv-webpack')
//analyzer-bundle
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/** @type {import('webpack').Configuration} */

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    mode: 'development',
    // watch: true, ya no se usa xq se usa dev server
    resolve: {
        extensions: ['.mjs','.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),

        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true
        },
        watchFiles: path.join(__dirname, './**'),
        compress: true,
        historyApiFallback: true,
        port: 5000,
        open: true
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
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPLugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new BundleAnalyzerPlugin()
    ]
}
