//
const autoprefixer = require('autoprefixer');
module.exports = {
    entry: "./app/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "http://localhost:3000/dist/",
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".scss", ".css"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'resolve-url', 'postcss', 'sass?sourceMap'] },
            { test: /\.css$/, loaders: ['style', 'css?sourceMap', 'resolve-url'] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    postcss: () => [autoprefixer]
};