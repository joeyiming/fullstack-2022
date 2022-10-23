const router = require('express').Router()
const { User, Blog, Readinglist } = require('../models/index')

router.get('/', async (req, res) => {
  const readinglists = await Readinglist.findAll()
  res.json(readinglists)
})

// TODO
router.post('/', async (req, res) => {
  const { blogId, userId } = req.body
  const blog = await Blog.findByPk(blogId)
  const user = await User.findByPk(userId)
  if (blog && user) {
    // console.log(blog);
    // console.log(user);
    // https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
    // console.log(await blog.getReaders());
    // console.log(await user.getReadingBlogs());
    // console.log(User.associations);
    try {
      await user.addReadingBlog(blog, {
        through: { blogId: blogId, userId: userId, read: false }
      })
    } catch (error) {
      console.log(error);
    }
    res.json(user)
  } else {
    res.status(400).end()
  }
})

module.exports = router