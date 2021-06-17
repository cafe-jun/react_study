const path = require('path');
const RefreshWebpack = require('@pmmmwh/react-refresh-webpack-plugin');
//process.env.NODE_ENV  = 'production'

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: ['./client'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
                },
            },
        ],
    },
    plugins: [new RefreshWebpack()],
    output: {
        path: path.join(__dirname, 'dist'), // 실제의 경로
        filename: 'app.js',
        //publicPath: '/dist/', // 가상의 경로 app.use(express.static(__dirname,'dist'))
    },
    devServer: {
        publicPath: '/dist/',
        hot: true,
    },
};
