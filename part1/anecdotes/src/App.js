import { useState } from 'react'

const Button = props =>{
  return(
    <button onClick={props.onClick}> {props.text}</button>
  )
}
const ShowHeader = ({text}) => <h1> {text} </h1>
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accouts for the first 10 percent of the development time...The remaining 10 percent of the code accouts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const getRandomInt = () => Math.floor(Math.random() * anecdotes.length)
  const onClick = () => setSelected(getRandomInt())
  const handleVote = () =>{
    const copy = [ ...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const getMostVotesIndex = () =>{
    let idx = 0;
    for(let i = 0; i < anecdotes.length; i++){
      if(votes[i] > votes[idx]) idx = i
    }
    return idx
  }
  let mostVoted = getMostVotesIndex();

  return(
    <div>
      <ShowHeader text="Anecdote of the day" />
      {anecdotes[selected]}
      <p> has {votes[selected]} votes </p>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={onClick} text="next anecdote" />
      <ShowHeader text="Anecdote with most votes" />
      {anecdotes[mostVoted]}
      <p> has {votes[mostVoted]} votes</p>
    </div>
  )
}
export default App;
