const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part => <p>{part.name} {part.exercises}</p>))}
    </>
  )
}

const Total = ({ parts }) => {
  const getSum = (total, num) => total+num
  return (
    <>
      Number of exercises {parts.map(part=>part.exercises).reduce(getSum)}
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = []
  parts.push({ name: part1, exercises: exercises1 })
  parts.push({ name: part2, exercises: exercises2 })
  parts.push({ name: part3, exercises: exercises3 })

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App