const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../models/index')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const { username, name, password, email } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = {
    username,
    name,
    passwordHash,
    email
  }
  const newUser = User.build(user)
  await newUser.save()

  res.status(201).json(newUser)
})

router.delete('/:id', async (req, res) => {
  const user = User.findByPk(req.params.id)
  if (user) {
    await user.destroy()
  }
  res.status(204).end()
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { name: req.params.username } })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router