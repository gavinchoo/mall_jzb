var webpack = require('webpack')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const moduleConfig = require("../config/module.config")
const pluginConfig = require("../config/plugins.config")
const outputConfig = require('../config/output.config')
var { allEntry } = require("../../src/entries/index")
var allEntryConfig = allEntry()

module.exports = {
    devtool: 'source-map', // eval source-map
    entry: allEntryConfig,
    output: outputConfig,
    module: moduleConfig,

    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
}