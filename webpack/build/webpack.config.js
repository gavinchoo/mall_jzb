var webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const pluginConfig = require("../plugins.config")
const moduleConfig = require("../module.config")
const outputConfig = require('../output.config')
var { allEntry } = require("../entry.config")
const allEntryConfig = allEntry()

module.exports = {
    devtool: 'source-map', // eval source-map
    entry: allEntryConfig,
    output: outputConfig,
    module: moduleConfig,
    plugins: [
        new UglifyJSPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
}