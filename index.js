const { PORT } = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const {connectToDatabase} = require('./utils/db')
const middleware = require('./utils/middleware')

app.use(express.json()) //built-in body-parser

app.get('/',(req,res)=>{
  res.send('<h1>Blog App API</h1>')
})

// app.use(cors())
// app.use(express.static('build'))

app.use('/blogs',blogsRouter)
app.use('/users',usersRouter)
app.use('/login',loginRouter)
app.use('/authors',authorsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const start = async()=>{
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`服务器已启动……（端口：${PORT}）`)
  })
}

start()