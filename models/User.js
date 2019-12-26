const db = require('../config/db.js')
const moment = require('moment')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class User extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  groupId: {
    type: Sequelize.INTEGER.UNSIGNED,
    field: 'group_id',
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING(45),
    defaultValue: null
  },
  tel: {
    type: Sequelize.STRING(45),
    defaultValue: null
  },
  lastLoginTime: {
    field: 'last_login_time',
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'crt_time',
    allowNull: false,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  updatedAt: {
    field: 'upd_time',
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},{
  sequelize: db,
  modelName: 'users'
})
db.sync({ force: true })
class UserModel {
  static async create(userinfo) {
    let { groupId, email, password } = userinfo
    return await User.create({
      groupId,
      email,
      password
    })
  }
}

module.exports = UserModel
