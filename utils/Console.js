const log4js = require('log4js')

log4js.configure({
  appenders: { 
    toFile: {
      type: 'DateFile',
      filename: 'log/node.log',
      pattern: '-yyyy-mm-dd.log',
      daysToKeep: 30,
      compress: true
    },
    toConsole: {
      type: 'console',
    }
  },
  categories: {
    default: {
      appenders: ['toConsole'],
      level: 'all'
    },
    toFile: {
      appenders: ['toFile'],
      level: 'all'
    }
  }
})

let logToConsole = log4js.getLogger()
let logToFile = log4js.getLogger('toFile')

module.exports = {
  log(...params) {
    if (process.env.NODE_ENV === 'development') {
      logToConsole.debug(...params)
    } else {
      // 输出到文件
      logToFile.debug(...params)
    }
  },
  warn(...params) {
    if (process.env.NODE_ENV === 'development') {
      logToConsole.warn(...params)
    } else {
      // 输出到文件
      logToFile.warn(...params)
    }
  },
  error(...params) {
    if (process.env.NODE_ENV === 'development') {
      logToConsole.fatal(...params)
    } else {
      // 输出到文件
      logToFile.fatal(...params)
    }
  }
}