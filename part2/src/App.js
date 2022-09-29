import Course from "./components/Course"

const App = () => {
  const courses = [
    {
      name: '半栈开发',
      id: 1,
      parts: [{
        name: 'React基础',
        exercises: 10
      },
      {
        name: '参数传递与数据通信',
        exercises: 7
      },
      {
        name: '组件状态',
        exercises: 14
      }]
    },
    {
      name: 'NodeJS',
      id: 2,
      parts: [{
        name: '路由',
        exercises: 10
      },
      {
        name: '中间件',
        exercises: 7
      }]
    },
  ]

  return <Course courses={courses} />
}

export default App