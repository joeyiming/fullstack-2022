const { QueryTypes } = require('sequelize')
const { sequelize } = require('./utils/db')
const sql = "insert into blogs (title,author,url) values ('hello world','ben','www.ben.org')"

const main = async () => {
  const results = await sequelize.query(sql, { type: QueryTypes.SELECT })
  console.log(results)
  sequelize.close()
}

main()