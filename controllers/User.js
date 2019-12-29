const UserModel = require('../models/User')
const utils = require('../utils/utils')


class User {
  /**
   * 查询用户信息
   * @param {*} ctx 
   */
  static async info(ctx) {
    let tokenInfo = await utils.checkToken(ctx.header.authorization)
    let userInfo = await UserModel.selectById(tokenInfo.id)
    ctx.status = 200
    ctx.body = {
      id: userInfo.id,
      group_id: userInfo.groupId,
      email: userInfo.email,
      nickname: userInfo.nickname,
      tel: userInfo.tel,
      create_at: userInfo.createdAt,
      last_login_time: userInfo.lastLoginTime
    }
  }

  /**
   * 注册
   * @param {*} ctx
   */
  static async register(ctx) {
    let req = ctx.request.body
    let params = {
      email: true,
      password: true,
      nickname: false,
      tel: false
    }
    utils.checkParams(req, params)
    req.groupId = 2
    req.password = utils.maskPassword(req.password)
    let already = await UserModel.selectByEmail(req.email)
    if (already) {
      // 已存在
      throw new HttpError(409, 'already')
    }
    let user = await UserModel.create(req)
    delete user.password
    ctx.status = 201
    ctx.body = {
      id: user.id,
      group_id: user.groupId,
      email: user.email,
      nickname: user.nickname,
      tel: user.tel,
      create_at: user.createdAt
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
