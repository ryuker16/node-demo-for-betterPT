const {
    resolve
} = require('path')
const webpack = require('webpack')
//const FlowtypePlugin = require('flowtype-loader/plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './main.jsx',
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    context: resolve(__dirname, 'public'),
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {

        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader'
            ]
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'css-loader'
        }]
    },
    externals: {
   'cheerio': 'window',
   'react/lib/ExecutionEnvironment': true,
   'react/lib/ReactContext': true,
 },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NamedModulesPlugin(),
    ],

}
