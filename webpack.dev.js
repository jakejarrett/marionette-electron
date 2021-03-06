/** Dependencies **/
var Webpack = require("webpack");
var path = require("path");

/** Paths **/
var appPath = path.resolve(__dirname, "app");
var srcPath = path.resolve(appPath, "src");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var buildPath = path.resolve(__dirname, "app");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixer = require("autoprefixer");
var precss = require("precss");

var config = {
    context: __dirname,
    devtool: "source-map",

    entry: [
        "babel-polyfill",
        path.resolve(srcPath, "main.js")
    ],

    output: {
        path: buildPath,
        filename: "[name].js",
        publicPath: "/"
    },

	target: "atom",

    module: {

        rules: [
            {
                enforce: "pre",
                test: /\.json$/,
                loader: "json"
            },

            {
                /** Compiles ES6 to ES5 **/
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    plugins: [
                        "transform-runtime",
                        "transform-decorators-legacy",
                        "syntax-decorators",
                        "transform-decorators",
                        "transform-function-bind",
                        ["transform-es2015-arrow-functions", { "spec": false }],
                        "transform-es2015-shorthand-properties",
                        "transform-es2015-spread",
                        "transform-es2015-parameters",
                        "transform-es2015-block-scoping",
                        "transform-es2015-template-literals",
                        "transform-class-properties",
                        "transform-es2015-classes"
                    ],
                    presets: ["es2016"]
                },
                exclude: [nodeModulesPath]
            },
            {
                /** Support importing .html templates **/
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                /** Compiles SASS and then Import the Compiled CSS **/
                test: /\.scss$/,
                loader: ["style-loader", "css-loader?modules&importLoaders=1&localIdentName", "postcss-loader", "sass-loader?sourceMap"]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: path.resolve(buildPath, "../css/[name].min.css")
        }),
        new Webpack.LoaderOptionsPlugin({
            postcss: function() {
                return [precss];
            }
        })
    ],

    resolve: {
        alias: {
            "marionette": "backbone.marionette",
            "underscore": "lodash",

            /**
             * Convenience
             */
            "app": path.resolve(srcPath, "app"),
            "modules": path.resolve(srcPath, "modules")
        }
    }
};

module.exports = config;
