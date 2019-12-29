let errCode = {
  400: 'INVALID REQUEST',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'NOT FOUND',
  406: 'Not Acceptable',
  410: 'Gone',
  422: 'Unprocesable entity',
  500: 'INTERNAL SERVER ERROR'
}
module.exports = class HttpError extends Error {
  constructor(code, message='') {
    super(message || errCode[code] || code)
    this.code = code
  }
}