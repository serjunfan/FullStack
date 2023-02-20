import { useState } from 'react'

const ShowHeader = () =>{
  return(
    <h1> give feedback </h1>
  )
}

const StatisticLine = ({text, value}) => <td> {text} {value}</td>

const Statistics = ({good, neutral, bad}) =>{
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = good / all
  if(all == 0){
    return(
      <p> No feedback given </p>
    )
  }
  return(
    <table>
      <tbody>
	<tr>
	  <StatisticLine text="good" value={good} />
	</tr>
	<tr>
	  <StatisticLine text="neutral" value={neutral} />
	</tr>
	<tr>
	  <StatisticLine text="bad" value={bad} />
	</tr>
	<tr>
	  <StatisticLine text="all" value={all} />
	</tr>
	<tr>
	  <StatisticLine text="average" value={average} />
	</tr>
	<tr>
	  <StatisticLine text="positive" value={positive} />
	</tr>
      </tbody>
    </table>
  )
}

const Button = (props) =>{
 return(<button onClick={props.handleClick}> 
      {props.text} 
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return(
    <div>
      <ShowHeader />
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
