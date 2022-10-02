const { QueryTypes } = require('sequelize')
const { sequelize } = require('./utils/db')
const sql = 'SELECT * FROM blogs'

const main = async () => {
  const results = await sequelize.query(sql, { type: QueryTypes.SELECT })
  console.log(results)
  sequelize.close()
}

main()