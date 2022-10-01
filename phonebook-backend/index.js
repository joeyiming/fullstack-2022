const express = require('express')
const morgan = require('morgan')
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

app.use(express.json())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

// 根目录请求将返回/build/index.html
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

app.put('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const foundPerson = _.find(persons, { id: id })
  if (foundPerson) {
    const body = req.body
    const newPerson = {...foundPerson}
    if (body.name) {
      newPerson.name = body.name
    }
    if (body.number) {
      newPerson.number = body.number
    }
    res.status(200).send(newPerson)
  } else {
    res.status(404).end()
  }
})

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  if (_.find(persons, { id: id })) {
    persons = persons.filter(person => person.id !== id)
    res.status(200).send(persons)
  } else {
    res.status(404).end()
  }
})

app.post('/persons', (req, res) => {
  const body = req.body
  const generateNewId = () => {
    const maxId = Math.max(...persons.map(persons => persons.id))
    return maxId + 1
  }
  if (body.name && body.number) {
    if (!_.find(persons, { name: body.name })) {
      const newPerson = { id: generateNewId(), ...body }
      persons = [...persons, newPerson]
      // console.log(persons)
      res.status(200).send(newPerson)
    } else {
      const msg = {
        error: `[POST] 用户 ${body.name} 已存在`
      }
      res.status(400).send(msg)
    }
  } else {
    const msg = {
      error: '[POST] 信息不完整'
    }
    res.status(400).send(msg)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`服务器已启动……（端口：${PORT}）`)
})