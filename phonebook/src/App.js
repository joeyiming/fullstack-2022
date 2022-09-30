import { useEffect, useState } from 'react'
import personService from './services/persons'
const _ = require('loadsh')

const Filter = ({ searchValue, setSearchValue }) => {
  return (
    <div>
      搜索：<input value={searchValue} onChange={({ target }) => setSearchValue(target.value)} />
    </div>
  )
}

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    const foundPerson = _.find(persons, { name: newName })
    if (foundPerson && newNumber) {
      if (window.confirm(`${newName} 已存在，是否更新用户信息？`)) {
        const newPerson = { ...foundPerson, number: newNumber }
        personService
          .update(foundPerson.id, newPerson)
          .then((res) => {
            const newPersons = [...persons.filter(person => person.name !== newName), res.data]
            setPersons(newPersons)
          })
      }
    } else if (!newName || !newNumber) {
      alert(`信息不完整！`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then((res) => {
          const newPersons = [...persons, res.data]
          setPersons(newPersons)
        })
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        名字: <input value={newName} onChange={({ target }) => setNewName(target.value)} />
      </div>
      <div>
        号码: <input value={newNumber} onChange={({ target }) => setNewNumber(target.value)} />
      </div>
      <div>
        <button type="submit">添加</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, setPersons, searchValue }) => {
  const onRemove = (person) => {
    if (window.confirm(`你确定要删除 ${person.name} ？`)) {
      personService.remove(person.id).then(res => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase())).map(person => <div>{person.name} {person.number} <button onClick={() => onRemove(person)}>删除</button> </div>)}
    </>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: '阿里巴巴', number: '110', id: 0 }
  ])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((res) => {
        setPersons(res.data)
      })
  }, [])

  return (
    <div>
      <h2>电话本</h2>
      <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
      <h2>新建联系人</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>号码</h2>
      <Persons persons={persons} setPersons={setPersons} searchValue={searchValue} />
    </div>
  );
}

export default App;
