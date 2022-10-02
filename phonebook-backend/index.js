const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const _ = require('loadsh')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const personsRouter = require('./controllers/persons')

app.use(express.json())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

// 根目录请求将返回/build/index.html
app.use(express.static('build'))

app.use('/persons', personsRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`服务器已启动……（端口：${PORT}）`)
  })
}

start()

// TODO 需要移动到 controller/persons.js 下
// app.get('/persons', async (req, res) => {
//   const persons = await sequelize.query("SELECT * FROM persons", { type: QueryTypes.SELECT })
//   res.json(persons)
// })
// app.get('/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   if (_.find(persons, { id: id })) {
//     res.send(_.find(persons, { id: id }))
//   } else {
//     const errorMsg = "<strong style='color:red'>用户不存在</strong>"
//     res.status(404).send(errorMsg)
//   }
// })

// app.get('/info', (req, res) => {
//   const content = `
//     <p>总共有 ${persons.length} 位联系人</p>
//     <p>时间：${new Date()}</p>
//   `
//   res.send(content)
// })

// app.put('/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   const foundPerson = _.find(persons, { id: id })
//   if (foundPerson) {
//     const body = req.body
//     const newPerson = { ...foundPerson }
//     if (body.name) {
//       newPerson.name = body.name
//     }
//     if (body.number) {
//       newPerson.number = body.number
//     }
//     res.status(200).send(newPerson)
//   } else {
//     res.status(404).end()
//   }
// })

// app.delete('/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   if (_.find(persons, { id: id })) {
//     persons = persons.filter(person => person.id !== id)
//     res.status(200).send(persons)
//   } else {
//     res.status(404).end()
//   }
// })

// app.post('/persons', (req, res) => {
//   const body = req.body
//   const generateNewId = () => {
//     const maxId = Math.max(...persons.map(persons => persons.id))
//     return maxId + 1
//   }
//   if (body.name && body.number) {
//     if (!_.find(persons, { name: body.name })) {
//       const newPerson = { id: generateNewId(), ...body }
//       persons = [...persons, newPerson]
//       // console.log(persons)
//       res.status(200).send(newPerson)
//     } else {
//       const msg = {
//         error: `[POST] 用户 ${body.name} 已存在`
//       }
//       res.status(400).send(msg)
//     }
//   } else {
//     const msg = {
//       error: '[POST] 信息不完整'
//     }
//     res.status(400).send(msg)
//   }
// })

