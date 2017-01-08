const {resolve}  = require('path')
const webpack = require('webpack')

module.exports = {
    entry: [
        // 'react-hot-loader/patch',
        // 'webpack-dev-server/client?http://localhost:8080',
        // 'webpack/hot/only-dev-server',
        './main.jsx'
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    context: resolve(__dirname, 'public'),
    devtool: 'cheap-eval-source-map',
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

    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],

}
