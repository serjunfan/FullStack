const mongoose = require('mongoose')

if(process.argv.length<3){
  console.log('give passwoad as argumment')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNum = process.argv[4]

const url=
  `mongodb+srv://107703042:${password}@cluster0.3w5yfef.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phoneNum: String,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

if(!process.argv[3]){
  Person.find({}).then(result =>{
    result.forEach(person =>{
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else{
  const person = new Person({
    name: process.argv[3],
    phoneNum: process.argv[4],
    important: true,
  })
  person.save().then(result =>{
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}

/*
const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

const note1 = new Note({
  content: 'Maybe not so Easy',
  important: true,
})
note.save().then(result =>{
  console.log('note saved!')
  //mongoose.connection.close()
})
note1.save().then(result =>{
  console.log('note1 saved')
  mongoose.connection.close()
})
*/
