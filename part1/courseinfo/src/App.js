const Header = (props) => {
  return(
    <h1>{props.name}</h1>
  )
}
const Part = (props) =>{
  return(
    <p>{props.part} {props.exercise}</p>
  )
}
const Content = (props) =>{
  const [part1, part2, part3] = props.parts
  return(
  <div>
    <Part part={part1.name} exercise={part1.exercises1}/>
    <Part part={part2.name} exercise={part2.exercises2}/> 
    <Part part={part3.name} exercise={part3.exercises3}/> 
  </div>
  )
}
const Total = (props) =>{
  const [exercises1, exercises2, exercises3] = props.parts
  return(
   <p>Number of exercises {exercises1 + exercises2 
     +exercises3} </p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts:[
    {
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
    }
    ]
  }
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
