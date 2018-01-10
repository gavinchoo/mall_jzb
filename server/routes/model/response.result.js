var HttpState = require('../../constant/httpstate')

function ResponseSuccess(message, data) {
    this.code = HttpState.REQ_SUCCESS
    this.data = data
    this.message = message
}

function ResponseError(message) {
    this.code = HttpState.REQ_FAILED
    this.message = message
}

function ResponseOther(code, message) {
    this.code = code
    this.message = message
}


module.exports = {
    ResponseSuccess: ResponseSuccess,
    ResponseError : ResponseError,
    ResponseOther : ResponseOther
}