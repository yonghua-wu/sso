const Sequelize = require('sequelize')
const CONFIG = require('./config.js')

const sequelize = new Sequelize(CONFIG.SQL_INFO.DBNAME, CONFIG.SQL_INFO.USERNAME, CONFIG.SQL_INFO.PASSWORD, {
  host: CONFIG.SQL_INFO.HOST,
  dialect: CONFIG.SQL_INFO.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize.authenticate().then( () => {
  Console.log('数据库已连接')
}).catch( err => {
  Console.log('数据库连接失败，详情：', err)
  throw err
})

module.exports = sequelize