const path                  = require('path');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const TsconfigPathsPlugin   = require('tsconfig-paths-webpack-plugin');
const webpack               = require('webpack');

const development = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: './src/client/app.tsx',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules(\/|\\)(?!(@feathersjs|debug))/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'sass-loader',
                ]
            }
        ]
    },
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                configFile: 'src/client/tsconfig.json',
            }),
        ],
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'index.html', to: 'index.html' },
            { from: 'assets/',    to: 'assets/' },
        ], {
            context: 'src/client/',
            debug: 'info',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.DefinePlugin({
            'environment.production': JSON.stringify(!development),
            'environment.development': JSON.stringify(development),
        })
    ]
}
