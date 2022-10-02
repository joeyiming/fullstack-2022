const { PORT } = require('./utils/config')
const app = require('express')()
const blogsRouter = require('./controllers/blogs')
const {connectToDatabase} = require('./utils/db')

app.use('/blogs',blogsRouter)

const start = async()=>{
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`服务器已启动……（端口：${PORT}）`)
  })
}

start()