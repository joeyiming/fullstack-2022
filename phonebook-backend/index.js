const express = require('express')
const app = express()
const cors = require('cors')
const _ = require('loadsh')

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/persons', (req, res) => {
  res.send(persons)
})

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (_.find(persons, { id: id })) {
    res.send(_.find(persons, { id: id }))
  } else {
    const errorMsg = "<strong style='color:red'>用户不存在</strong>"
    res.status(404).send(errorMsg)
  }
})

app.get('/info', (req, res) => {
  const content = `
    <p>总共有 ${persons.length} 位联系人</p>
    <p>时间：${new Date()}</p>
  `
  res.send(content)
})

// TODO DELETE
// TODO POST

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`服务器已启动……（端口：${PORT}）`)
})