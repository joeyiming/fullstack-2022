const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { Blog, User } = require('../models/index')
const { Op } = require('sequelize')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

router.get('/', async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: '%' + req.query.search + '%'
          }
        },
        {
          author: {
            [Op.iLike]: '%' + req.query.search + '%'
          }
        }
      ]
    }
  }
  const blogs = await Blog.findAll({
    order: [
      ['likes','DESC']
    ],
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  // 这里Pk的含义是 Primary Key
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findByPk(decodedToken.id)
  const newBlog = Blog.build({ ...body, userId: user.id })
  await newBlog.save()
  res.json(newBlog)
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  if (blog.userId !== decodedToken.id) {
    // console.log(blog);
    return res.status(401).json({ error: 'permission denied' })
  }
  if (blog) {
    await blog.destroy()
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router