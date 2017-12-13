var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/mappy_content_script.js',
    output: {
        path: path.resolve(__dirname, 'lib/js'),
        filename: 'mappy_content_script.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};