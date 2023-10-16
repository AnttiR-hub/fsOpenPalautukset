/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({value, handleChange}) => {
  return(
  <div>
        Filter by name: <input value={value} onChange={handleChange}/>
      </div>
  )
}

const Form = ({onSubmit, nameValue, handleNameValue, nroValue, handleNroValue}) => {
  return(
  <div>
    <form onSubmit={onSubmit}>
        <div>
         name: <input value={nameValue} onChange={handleNameValue}/>
        </div>
        <div>
          nro: <input value={nroValue} onChange={handleNroValue}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
  )
}

const Persons = ({persons}) => {
  return(
    <div>
      {persons}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNro, setNewNro] = useState('')
  const [filterValue, setNewFilter] = useState('')

  useEffect(()=>{
    personService.getAll().then(response =>{setPersons(response.data)})
  })

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${person.name} ?`))
    {
      personService.deletePerson(id)
      setPersons(persons.filter(persons => persons.id !== id))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNro
    }

    if(persons.find((elem) => elem.name === newName)) {
      //alert(`${newName} is already added to phonebook`)
      if(window.confirm(`${newName} is already added to phonebook. Want to replace old number?`)) {
        const updatedPerson = persons.find((elem) => elem.name === newName)
        console.log(updatedPerson)
        personService.update(updatedPerson.id, personObj)
      }

    } else {
      personService.create(personObj).then(response => {console.log(response.data)})
    }
  }


 const handleNewName = (event) =>{setNewName(event.target.value)}
 const handleNewNro = (event) =>{setNewNro(event.target.value)}  
 const handleNewFilter = (event) =>{setNewFilter(event.target.value)}


const filteredPersons = persons.map(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase()))?
persons.filter(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase())):persons

const allPersons = filteredPersons.map(person => {
   return( 
     <div key={person.id}>
      <p> {person.name} {person.number}</p> 
      <button type="button" onClick={() => deletePerson(person.id)}>Delete</button>
     </div> 
   )
  }
  )


  return (
    <div>
      <Filter value={filterValue} handleChange={handleNewFilter}/>
      <h2>Phonebook</h2>
      <Form onSubmit={addPerson} nameValue={newName} handleNameValue={handleNewName} nroValue={newNro} handleNroValue={handleNewNro} />
      <h2>Numbers</h2>
      <Persons persons={allPersons}/>
    </div>
  )

}

export default App