const Header = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
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
    <p style={{ fontWeight: 'bold' }}>
      总练习数：{parts.map(part => part.exercises).reduce(getSum)}
    </p>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      <h1>课程列表</h1>
      {courses.map(course =>
        <div>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course