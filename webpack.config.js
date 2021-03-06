var webpack = require('webpack');

module.exports = {
    entry: "./app/assets/frontend/main.jsx",
    output: {
        path: __dirname + "/app/assets/javascripts",
        filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: "babel",
            query: {
              presets: ['react', 'es2015']
            }
        }]
    },
    devtool: 'eval-source-map'
};
