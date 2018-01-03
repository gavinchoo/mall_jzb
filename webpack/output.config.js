var path = require('path')

module.exports = {
    path: path.join(__dirname, '../public/build'),
    publicPath: '/build/',
    filename: '[name].bundle.js'
}