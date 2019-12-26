const db = require('../config/db.js')
const moment = require('moment')
const Model = db.Model

class User extends Model {}

User.init({
  id: {
    type: db.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  groupId: {
    type: db.INTEGER.UNSIGNED,
    field: 'group_id',
    allowNull: false
  },
  email: {
    type: db.STRING,
    allowNull: false
  },
  password: {
    type: db.STRING,
    allowNull: false
  },
  nickname: {
    type: db.STRING(45),
    defaultValue: null
  },
  tel: {
    type: db.STRING(45),
    defaultValue: null
  },
  lastLoginTime: {
    field: 'last_login_time',
    type: db.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  createdAt: {
    type: db.DATE,
    field: 'crt_time',
    allowNull: false,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  updatedAt: {
    field: 'upd_time',
    type: db.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},{
  db,
  modelName: 'users'
})

class UserModel {
  static async create(userinfo) {
    let { groupId, email, password, lastLoginTime } = userinfo
    await User.create({
      groupId,
      email,
      password,
      lastLoginTime
    })
    return true
  }
}

module.exports = UserModel
