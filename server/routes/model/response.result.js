function ResponseResult(code, message, data) {
    this.data = data
    this.code = code
    this.message = message
}

module.exports = ResponseResult