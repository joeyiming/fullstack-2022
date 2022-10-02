const { DATABASE_URL } = require('./config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = {
  connectToDatabase,
  sequelize
}