const crypto = require('crypto')
const CONFIG = require('../config/config')
const jwt = require('jsonwebtoken')

function verify(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = {
  /**
   * 检查请求的参数
   * @param {Object} req 请求参数
   * @param {Array} params 参数列表
   */
  checkParams(req, params) {
    let keys = Object.keys(params)
    
    for(let key in req) {
      if (keys.indexOf(key) === -1) {
        throw new HttpError(400)
      }
    }
    for(let key in params) {
      if(params[key] && !(key in req)) {
        throw new HttpError(400)
      }
    }
    return true
  },
  /**
   * 将密码md5加密
   * @param {String} password 明文密码
   */
  maskPassword(password) {
    return crypto.createHash('md5').update(CONFIG.PW_SECRET + password).digest('hex')
  },
  /**
   * 验证token
   * @param {String} token 请求传入的token
   * @param {String} secret 解密验证的secret，默认 AT_SECRET
   */
  async checkToken(token, secret='AT_SECRET') {
    if (!token) {
      throw new HttpError(401)
    }
    let tokenInfo
    try {
      tokenInfo = await verify(token, CONFIG[secret])
    } catch(err) {
      throw new HttpError(401)
    }
    return tokenInfo
  }
}
