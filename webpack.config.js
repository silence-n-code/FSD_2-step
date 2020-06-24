const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, "./app"),
    dist: path.join(__dirname, "./dist"),
    assets: "assets/"
  };

function htmlWebpackPlugin(name){
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./app/page/${name}/${name}.pug`
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
            // images / icons
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]"
            }
        },{
            test: /\.(woff(2)?|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]"
            }
        },{
            test: /\.pug$/,
            use: ['pug-loader']
        },{
            test: /\.scss$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },{
            test: /\.css$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
                { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` }/*,
                { from: `${PATHS.src}/static`, to: "" } */
            ],
        }),
        htmlWebpackPlugin('index'),
        htmlWebpackPlugin('UI-colors-type'),
        htmlWebpackPlugin('UI-form-elements'),
        htmlWebpackPlugin('UI-headers-footers'),
        htmlWebpackPlugin('UI-cards'),
        htmlWebpackPlugin('landing'),
        htmlWebpackPlugin('registration'),
        htmlWebpackPlugin('room-details'),
        htmlWebpackPlugin('search-room')
    ]
}