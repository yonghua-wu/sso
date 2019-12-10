// const Koa = require('koa')
// const cors = require('koa2-cors')
// const bodyParser = require('koa-bodyparser')
// const regRouter = require('./routers.js')

global.Console = require('./utils/Console')

// const app = new Koa()

// app.use(cors({
//   origin: function() {
//     return '*'
//   },
//   maxAge: 1728000
// }))

// app.use(bodyParser())
// app.use(regRouter())
// app.listen(18080)
Console.log('app started at port 18080...')