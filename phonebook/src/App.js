import { useEffect, useState } from 'react'
import axios from 'axios'
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
    if (_.find(persons, { name: newName })) {
      alert(`用户 ${newName} 已存在！`)
    } else if (!newName || !newNumber) {
      alert(`信息不完整！`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber }])
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
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase())).map(person => <div>{person.name} {person.number}</div>)}
    </>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: '阿里巴巴', number: '110', id: 0 }
  ])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
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
