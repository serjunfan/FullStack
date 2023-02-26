import { useState, useEffect } from 'react'
import phoneBookService from './services/phonebooks'

const Display = (props) => {
  const person = props.props
  const {name, phoneNum, id, shouldRender} = person
  const deleteHandler = name =>{
    if(window.confirm(`Delete ${name} ?`))
      phoneBookService.deletePerson(id)
  }
  return(
          <>
	    {name} {phoneNum} <button 
            onClick={() => deleteHandler(name)}>{`delete`}</button>
            <br/>
          </>
	)
}

const Filter = ({filterName, setFilterName}) => {
  return(
    <>
      filter shown with: <input value={filterName} 
	onChange={event => setFilterName(event.target.value)} />
    </>
  )
}

const Persons = ({personsToShow}) => {
  return(
      <div>
      {personsToShow.map(person =>
	<Display key={person.name} props={person}/>)
      }
      </div>
  )
}

const PersonForm = (props) => {
  const {addPersonAndPhoneNum, newName, setNewName, newPhoneNum,
      setNewPhoneNum} = props
  return(
      <form onSubmit={addPersonAndPhoneNum}>
        <div>
          name: <input value={newName} 
                onChange={event => setNewName(event.target.value)}/>
          <br/>
          number: <input value={newPhoneNum}
                onChange={event => setNewPhoneNum(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() =>{
    phoneBookService 
      .getAll()
      .then(initialPersons => {
	setPersons(initialPersons)
      })
  }, [persons])

  const addPersonAndPhoneNum = event =>{
    event.preventDefault()
    persons.forEach(element => { 
      if(element.name === newName && element.phoneNum === newPhoneNum)
	alert(`${newName} & ${newPhoneNum} is already added to phonebook`)
    }) 
    const newPerson = {
      name: newName,
      phoneNum: newPhoneNum
    }
    phoneBookService
    .create(newPerson)
    .then(newPerson =>{
      console.log(newPerson)
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNum('')
    })
  }
  const personsToShow = filterName === '' ? persons :
    persons.filter( person => person.name === filterName )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} /> 
      <PersonForm addPersonAndPhoneNum={addPersonAndPhoneNum} 
      newName={newName} setNewName={setNewName} newPhoneNum={newPhoneNum}
      setNewPhoneNum={setNewPhoneNum}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
/*{persons.map( person =>{
	console.log(person)
	return(
	  <p key={person.name}>key={person.name} {person.name}</p>
         )	
      }
      )}
*/


 /*
      filter shown with: <input value={filterName} 
	onChange={event => setFilterName(event.target.value)} />
	*/
