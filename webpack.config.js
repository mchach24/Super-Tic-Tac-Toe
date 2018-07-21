const path                  = require('path');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const webpack               = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

const WebpackConfig = {
    entry: './src/client/app.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/client')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'index.html', to: 'index.html' }
        ], {
            context: 'src/client/',
            debug: 'info',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.DefinePlugin({
            'environment.production': JSON.stringify(!devMode),
            'environment.development': JSON.stringify(devMode),
        })
    ]
}

module.exports = WebpackConfig;