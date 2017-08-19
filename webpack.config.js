const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/js/popup.js",
    output: {
        filename: "popup.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.handlebars$/,
                use: [ "handlebars-loader" ]
            },
            {
                test: require.resolve('zepto'),
                use: {
                loader: 'imports-loader',
                options: 'this=>window',
                },
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "src/css/",
                to: "css/"
            },
            {
                from: "src/assets/",
                to: "assets/"
            },
            {
                from: "src/manifest.json"
            },
            {
                from: "src/popup.html"
            }
        ])
    ]
};