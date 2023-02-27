import { useState, useEffect } from 'react'
import phoneBookService from './services/phonebooks'

const Display = (props) => {
  const {person, shouldReRender, setShouldReRender} = props
  const {name, phoneNum, id} = person
  const deleteHandler = name =>{
    if(window.confirm(`Delete ${name} ?`))
      phoneBookService.deletePerson(id)
      .then(returnStatus => returnStatus === 200 ?
	setShouldReRender(!shouldReRender) : console.log('sth wrong') 
      )
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

const Persons = ({personsToShow, shouldReRender, setShouldReRender}) => {
  return(
      <div>
      {personsToShow.map(person =>
	<Display key={person.name} person={person} 
	shouldReRender={shouldReRender}
	setShouldReRender={setShouldReRender}/>)
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
const Notification = ({message}) =>{
  const NotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    fontStyle: 'italic'
  }
  if(message === null){
    return null
  }

  return(
    <div style={NotificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [shouldReRender, setShouldReRender] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const [addMessage, setAddMessage] = useState('')

  useEffect(() =>{
    phoneBookService 
      .getAll()
      .then(initialPersons => {
	setPersons(initialPersons)
      })
  }, [shouldReRender])

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
      setAddMessage(`Added ${newName}`)
      setTimeout(() => setAddMessage(null), 3000)
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
      <Notification message={addMessage} />
      <Filter filterName={filterName} setFilterName={setFilterName} /> 
      <PersonForm addPersonAndPhoneNum={addPersonAndPhoneNum} 
      newName={newName} setNewName={setNewName} newPhoneNum={newPhoneNum}
      setNewPhoneNum={setNewPhoneNum}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} 
      shouldReRender={shouldReRender} setShouldReRender={setShouldReRender} 
      />
    </div>
  )
}

export default App
