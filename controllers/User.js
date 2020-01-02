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
    let req = ctx.request.body
    let params = {
      id: true,
      password: false,
      old_password: false,
      nickname: false,
      tel: false
    }
    utils.checkParams(req, params)
    let tokenInfo = await utils.checkToken(ctx.header.authorization)
    if (req.id === tokenInfo.id) {
      if ('password' in req) {
        if (!('old_password' in req)) {
          throw new HttpError(400)
        }
        req.old_password = utils.maskPassword(req.old_password)
        req.password = utils.maskPassword(req.password)
        let userInfo = await UserModel.selectById(tokenInfo.id)
        if (userInfo.password === req.old_password) {
          await UserModel.updateById(tokenInfo.id, {
            password: req.password
          })
          delete req.password
          delete req.old_password
        } else {
          throw new HttpError(401)
        }
      }
      if ('old_password' in req) {
        throw new HttpError(400)
      }
      await UserModel.updateById(tokenInfo.id, req)
      let userInfo = await UserModel.selectById(req.id)
      ctx.status = 200
      ctx.body = {
        id: userInfo.id,
        group_id: userInfo.groupId,
        email: userInfo.email,
        nickname: userInfo.nickname,
        tel: userInfo.tel,
      }
    } else {
      throw new HttpError(401)
    }
  }

  /**
   * 删除用户
   * @param {*} ctx 
   */
  static async deleteUser(ctx) {
    let req = ctx.request.body
    let params = {
      id: true
    }
    utils.checkParams(req, params)
    let tokenInfo = await utils.checkToken(ctx.header.authorization)
    if (req.id === tokenInfo.id) {
      await UserModel.deleteById(tokenInfo.id)
      ctx.status = 204
      ctx.body = 'deleted'
    } else {
      throw new HttpError(401)
    }
  }
}

module.exports = User
