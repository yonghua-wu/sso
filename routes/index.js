const Router = require('koa-router')
const routers = new Router({
  prefix: '/sso/api/v1',
})

const User = require('../controllers/User')

routers.get('/user', User.info)
routers.post('/user', User.register)

module.exports = routers
