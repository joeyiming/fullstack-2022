const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
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
  const getSum = (total, num) => total + num
  return (
    <>
      Number of exercises {parts.map(part => part.exercises).reduce(getSum)}
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App