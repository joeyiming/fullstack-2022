const jwt = require('jsonwebtoken')
const bcypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null ? false : await bcypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router