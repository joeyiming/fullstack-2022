const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Person extends Model { }

Person.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  number: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'Person',
  tableName: 'persons'
})

module.exports = Person