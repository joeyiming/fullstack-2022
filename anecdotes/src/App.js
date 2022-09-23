import { useState } from "react";

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [scores, setScores] = useState(new Uint8Array(anecdotes.length))

  const [selected, setSelected] = useState(0)
  const onVote = () => {
    let copy = [...scores]
    copy[selected] += 1
    setScores(copy)
    console.log(copy);
  }
  const getMaxIndex = () => {
    const max = Math.max(...scores)
    const index = scores.indexOf(max)
    return index
  }

  return (
    <div>
      <h1>每日一句</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {scores[selected] || 0}</p>
      <button onClick={onVote}>Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next</button>
      <h1>优选警句</h1>
      <p>{anecdotes[getMaxIndex()]}</p>
      <p>Votes: {Math.max(...scores)}</p>
    </div>
  );
}

export default App;
