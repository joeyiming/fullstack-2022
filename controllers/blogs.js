const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
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
  try {
    const newBlog = Blog.build(body)
    await newBlog.save()
    res.json(newBlog)
  } catch (error) {
    return res.status(400).send(error)
  }
})

router.delete('/:id', async (req, res) => {
  const blog = Blog.findByPk(req.params.id)
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