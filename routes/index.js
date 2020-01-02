const Router = require('koa-router')
const routers = new Router({
  prefix: '/sso/api/v1',
})

const User = require('../controllers/User')
routers.get('/user', User.info)
routers.post('/user', User.register)
routers.patch('/user', User.changeInfo)
routers.delete('/user', User.deleteUser)

const Auth = require('../controllers/Auth')
routers.get('/auth', Auth.auth)
routers.post('/auth', Auth.login)
routers.patch('/auth', Auth.refreshAuth)
routers.delete('/auth', Auth.loginOut)

module.exports = routers
