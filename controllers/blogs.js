const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id',async (req,res)=>{
  // 这里Pk的含义是 Primary Key
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  }else{
    res.status(404).end()
  }
})

module.exports = router