const router = require('express').Router()
const { User, Blog, Readinglist } = require('../models/index')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

router.get('/', async (req, res) => {
  const readinglists = await Readinglist.findAll()
  res.json(readinglists)
})

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body
  const blog = await Blog.findByPk(blogId)
  const user = await User.findByPk(userId)
  if (blog && user) {
    // https://stackoverflow.com/questions/55692731/aggregate-error-when-trying-to-use-many-to-many-table-with-sequelize
    try {
      // 这个through必须这么传递？翻遍官方文档都没看见这么说啊！
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

router.put('/:id',async (req,res)=>{
  const body = req.body
  const id = req.params.id
  const readinglist = await Readinglist.findByPk(id)
  if (readinglist) {
    readinglist.read = body.read
    await readinglist.save()
    res.json(readinglist)
  }else{
    res.status(400).end()
  }
})

module.exports = router