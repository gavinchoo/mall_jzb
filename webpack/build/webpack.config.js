var webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const pluginConfig = require("../config/plugins.config")
const moduleConfig = require("../config/module.config")
const outputConfig = require('../config/output.config')
var { allEntry } = require("../../src/entries/index")
const allEntryConfig = allEntry()

module.exports = {
    devtool: 'source-map', // eval source-map
    entry: allEntryConfig,
    output: outputConfig,
    module: moduleConfig,
    plugins: [
        new UglifyJSPlugin(),
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
}