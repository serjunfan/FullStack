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

app.get('/info', (request, response) =>{
  const date = new Date();
  const reply = `<p>Phonebook has info for ${Person.length} 
  ${Person.length === 1 ? 'person' : 'people'} </p>
  <p> ${date} </p>`
  console.log(date)
  response.send(reply)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person =>{
    console.log(person)
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) =>{
  Person.findByIdAndRemove(request.params.id)
  .then( result =>{
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    phoneNum:body.number,
    important: body.important || false,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) =>{
  console.log(error)
  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message })
  }

  next(error)
}
//this has to be the last loaded middlewear
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
