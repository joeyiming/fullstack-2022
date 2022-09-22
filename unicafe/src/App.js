import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={increaseGood}>good</button>
        <button onClick={increaseNeutral}>neutral</button>
        <button onClick={increaseBad}>bad</button>
      </div>
      <h1>Statics</h1>
      {(good || bad || neutral ? <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad) / (good + neutral + bad) || 0}</p>
        <p>positive {good / (good + neutral + bad) * 100 || 0}%</p>
      </div> : <div>No Feedback Yet</div>)}

    </div>
  )
}

export default App