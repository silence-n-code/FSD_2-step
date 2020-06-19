const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function htmlWebpackPlugin(name){
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./app/page/${name}.pug`
    })
}

module.exports = {
    mode: 'development',
    entry: './app/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    devServer: {
        host: 'localhost',
        port: 8081,
        stats: 'errors-only',
        open: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },{
            test: /\.pug$/,
            use: ['pug-loader']
        },{
            test: /\.css$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        htmlWebpackPlugin('colors-types'),
        htmlWebpackPlugin('form-elements'),
        htmlWebpackPlugin('headers-footers'),
        htmlWebpackPlugin('cards'),
        htmlWebpackPlugin('landing'),
        htmlWebpackPlugin('login'),
        htmlWebpackPlugin('room'),
        htmlWebpackPlugin('search-room')
    ]
}