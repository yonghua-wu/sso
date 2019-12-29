const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const Routers = require('./routes/index.js')
const CONFIG = require('./config/config.js')

global.HttpError = require('./utils/HttpError')
global.Console = require('./utils/Console')

const app = new Koa()

// 配置跨域
app.use(cors({
  origin: function() {
    return '*'
  },
  maxAge: 1728000
}))

// 捕获异常
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err instanceof global.HttpError) {
      ctx.status = err.code
      ctx.body = err.message
    } else {
      ctx.status = 500
      ctx.body = err.message
    }
  })
})

app.use(bodyParser())
app.use(Routers.routes())

app.listen(CONFIG.LISTEN_PORT)
Console.log(`app started at port ${CONFIG.LISTEN_PORT}...`)
