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

module.exports = sequelize