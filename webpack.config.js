const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const openBrowser = require('react-dev-utils/openBrowser');

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;

const envNode = process.env.NODE_ENV;

module.exports = {
    target: "web",
    mode: envNode !== 'production' ? 'development' : 'production',
    entry: "./src/index.js",
    output: {
        filename: "js/app.[contenthash:8].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[name].[contenthash:8].[ext]",
    },
    performance: {
        hints: envNode === "production" ? "warning" : false,
    },
    devtool: envNode === "production" ? 'source-map' : false,
    optimization: {
        minimize: false,
        minimizer: [
            new HtmlMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
    devServer: {
        onListening: () => {
            openBrowser(`http://${ host }:${ port }`);
        },
        port,
        host,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(sass|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ["js", "jsx"],
        }),
        new HtmlWebpackPlugin({
            title: "Landing page",
            template: "./src/index.html",
            filename: "index.html",
        })
    ],
};
