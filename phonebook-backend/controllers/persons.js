const router = require('express').Router()

const { Person } = require('../models')

router.get('/', async (req, res) => {
  const persons = await Person.findAll()
  res.json(persons)
})

module.exports = router