require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person') 

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
] 

app.get('/info', (request, response) =>{
  const date = new Date();
  const reply = `<p>Phonebook has info for ${persons.length} 
  ${persons.length === 1 ? 'person' : 'people'} </p>
  <p> ${date} </p>`
  console.log(date)
  response.send(reply)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter( person => person.id === id )
  reponse.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const generateId = () =>{
    let id = Math.random()
      while(persons.find(person => person.id === id)){
      id = Math.random()
    }
    return id
  }

  const body = request.body
  console.log(`on post, request.body = ${body}`)
  if(!body.content){
    return response.status(400).json({
      error: 'missing name or number'
    })
  }
  const hasDuplicateName = () => {
    return persons.find(person => person.name === body.content.name
    )
  }
  if(hasDuplicateName()){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person ={
    content: body.content,
    important: body.important || false,
    id: generateId()
  }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
