const utils = require('../utils/utils')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config')

class Auth {
  static async auth(ctx) {
    await utils.checkToken(ctx.header.authorization)
    ctx.status = 200
    ctx.body = 'ok'
  }
  /**
   * 登陆
   * @param {*} ctx 
   */
  static async login(ctx) {
    let req = ctx.request.body
    req.password = utils.maskPassword(req.password)
    let params = {
      email: true,
      password: true
    }
    utils.checkParams(req, params)
    let userInfo = await UserModel.selectByEmail(req.email)
    if (userInfo) {
      if (userInfo.password === req.password) {
        // 验证成功
        await UserModel.updateLastLoginTimeById(userInfo.id)
        let payload = {
          id: userInfo.id,
          group_id: userInfo.groupId,
          email: userInfo.email
        }
        let accessToken = jwt.sign(payload, CONFIG.AT_SECRET, { expiresIn: CONFIG.AT_EXPIRES_IN })
        let refreshToken = jwt.sign(payload, CONFIG.RT_SECRET, { expiresIn: CONFIG.RT_EXPIRES_IN })
        ctx.status = 200
        ctx.body = {
          access_token: accessToken,
          refresh_token: refreshToken
        }
      } else {
        // 密码错误
        throw new HttpError(401)
      }
    } else {
      // 没有此用户
      throw new HttpError(401)
    }
  }

  /**
   * 注销登陆
   * @param {*} ctx 
   */
  static async loginOut(ctx) {
    ctx.status = 204
  }

  /**
   * 刷新access_token
   * @param {*} ctx 
   */
  static async refreshAuth(ctx) {
    let req = ctx.request.body
    let params = {
      refresh_token: true
    }
    utils.checkParams(req, params)
    let tokenInfo = await utils.checkToken(req.refresh_token, 'RT_SECRET')
    Console.log(tokenInfo)
    let accessToken = jwt.sign({
      id: tokenInfo.id,
      group_id: tokenInfo.groupId,
      email: tokenInfo.email
    }, CONFIG.AT_SECRET, { expiresIn: CONFIG.AT_EXPIRES_IN })
    ctx.status = 200
    ctx.body = {
      access_token: accessToken
    }
  }
}

module.exports = Auth
