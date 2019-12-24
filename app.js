const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const Routers = require('./routes/index.js')
const CONFIG = require('./config/config.js')
global.Console = require('./utils/Console')

const app = new Koa()

// 配置跨域
app.use(cors({
  origin: function() {
    return '*'
  },
  maxAge: 1728000
}))

app.use(bodyParser())
app.use(Routers.routes())
app.listen(CONFIG.LISTEN_PORT)
Console.log(`app started at port ${CONFIG.LISTEN_PORT}...`)
