var path = require('path');
module.exports = {
    entry: {
        'pancakes': [
            './src/main.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        library: 'pancakes',
    },
    resolve: {
        extensions: ['*', '.js', '.scss', '.sass']
    },
    module: {
        loaders: [{
            test: /\.js$/i,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015']
            }
        }]
    }
};