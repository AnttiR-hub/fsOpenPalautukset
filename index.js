const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body', (req) => JSON.stringify(req.body))

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

const postMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.post('/api/persons', postMorgan, (req, res, next) => {
  const newPerson = req.body
  if(!newPerson.name || !newPerson.number) {
    return res.status(400).json({
			error: 'name or number missing'
		})
  }else if (persons.persons.find(elm => elm.name === newPerson.name)) {
    return res.status(400).json({
			error: 'name must be unique'
		})
  }else{
    const id = Math.floor(Math.random() * 10000)
    newPerson.id = id.toString()
    persons.persons = persons.persons.concat(newPerson)

    res.json(newPerson)
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