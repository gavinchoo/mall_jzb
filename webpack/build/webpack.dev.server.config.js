var webpack = require('webpack')
const moduleConfig = require("../config/module.config")
const pluginConfig = require("../config/plugins.config")
const outputConfig = require('../config/output.config')
var { allEntry } = require("../../src/entries/entry.config")
var allEntryConfig = allEntry()

module.exports = {
    devtool: 'eval', // eval source-map
    entry: allEntryConfig,
    output: outputConfig,
    module: moduleConfig,

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
    devServer: {
        contentBase: 'dist', //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true,   // 开启gzip压缩
        hot: true,
        host: '0.0.0.0',  // 同一局域网段下，可以通过IP (192.168.X.X:8000) 访问
        inline: true, //设置为true，当源文件改变时会自动刷新页面
        port: 8002, //设置默认监听端口，如果省略，默认为"8080"
        proxy: {
            '/': {
                target: 'http://localhost:8000/',
                secure: false,
                withCredentials: true
            }
        }
    }
}