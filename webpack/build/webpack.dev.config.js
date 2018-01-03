var webpack = require('webpack')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const moduleConfig = require("../module.config")
const pluginConfig = require("../plugins.config")
const outputConfig = require('../output.config')
var { allEntry } = require("../entry.config")
var allEntryConfig = allEntry()

module.exports = {
    devtool: 'eval', // eval source-map
    entry: allEntryConfig,
    output: outputConfig,
    module: moduleConfig,

    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
}