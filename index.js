const express = require('express')
const app = express()

let persons = 
  {
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "609",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Anthi",
        "number": "0443463131",
        "id": 3
      }
    ]
  }


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})


app.delete('/api/persons/:id', (req, res) => {
  const personById = persons.persons.find(elm => elm.id === Number(req.params.id))
  if(personById) {
    persons.persons = persons.persons.filter(elm => elm.id !== Number(req.params.id))
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

app.get('/api/persons/:id', (req, res) => {
  const personById = persons.persons.find(elem => elem.id === Number(req.params.id))
  if(personById) {
    res.json(personById)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  const numberOfPersons = persons.persons.length
  res.send(
    `
    <p>Phonebook has ${numberOfPersons} contacts </p>
    <p>${date}</p>
    `
  )
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})