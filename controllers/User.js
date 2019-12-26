const UserModel = require('../models/User')
const CONFIG = require('../config/config')
const crypto = require('crypto')
const utils = require('../utils/utils')
const md5 = crypto.createHash('md5')

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
    let req = ctx.request.body
    let params = ['email', 'password', 'nickname', 'tel']
    let p2 = {
      email: true,
      password: true,
      nickname: false,
      tel: false
    }
    utils.checkParams(req, params)
    req.groupId = 2
    req.password = md5.update(CONFIG.SERVER_SECRET + req.password).digest('hex')
    let user = await UserModel.create(req)
    delete user.password
    ctx.response.status = 201
    ctx.body = user
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
