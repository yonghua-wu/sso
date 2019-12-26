// const UserModel = require('../models/User')

class User {
  /**
   * 查询用户信息
   * @param {*} ctx 
   */
  static async info(ctx) {
    Console.log(ctx)
    ctx.response.status = 201
    ctx.body = {
      code: 200,
      message: '创建用户成功',
      // data: token
    }
  }

  /**
   * 注册
   * @param {*} ctx
   */
  static async register(ctx) {
    Console.log(ctx.request.body)
    ctx.body = {
      code: 0,
      message: 'ok'
    }
  }

  /**
   * 修改用户信息
   * @param {*} ctx 
   */
  static async changeInfo(ctx) {
    ctx.body = {
      code: 200,
      message: '创建用户成功',
      // data: token
    }
  }

  /**
   * 删除用户
   * @param {*} ctx 
   */
  static async deleteUser(ctx) {
    ctx.body = {
      code: 200,
      message: '创建用户成功',
      // data: token
    }
  }
}

module.exports = User
