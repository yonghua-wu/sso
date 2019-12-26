module.exports = {
  /**
   * 检查请求的参数
   * @param {Object} req 请求参数
   * @param {Array} params 参数列表
   */
  checkParams (req, params) {
    let keys = Object.keys(params)
    
    for(let key in req) {
      // if (params[key])
      if (keys.indexOf(key) === -1) {
        throw new Error('400')
      }
    }
    return true
  }
}
