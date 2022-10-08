const router = require('express').Router()
const {Blog} = require('../models/index')
const {sequelize} = require('../utils/db')

router.get('/',async (req,res)=>{
  const authors = await Blog.findAll({
    order:[
      ['likes','DESC']
    ],
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('count',sequelize.col('title')),'articles'],
      [sequelize.fn('sum',sequelize.col('likes')),'likes'],
    ]
  })
  res.json(authors)
})

module.exports = router