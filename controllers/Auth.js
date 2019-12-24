class User {
  /**
   * 登陆
   * @param {*} ctx 
   */
  static async login(ctx) {
    ctx.body = {
      code: 200,
      message: '创建用户成功',
      // data: token
    }
  }

  /**
   * 注销登陆
   * @param {*} ctx 
   */
  static async loginOut(ctx) {
    ctx.body = {
      code: 200,
      message: '创建用户成功',
      // data: token
    }
  }

  /**
   * 刷新access_token
   * @param {*} ctx 
   */
  static async refreshAuth(ctx) {
    ctx.body = {
      code: 200,
      message: '创建用户成功',
      // data: token
    }
  }
}

module.exports = User
