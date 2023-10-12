/* eslint-disable react/prop-types */
import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      nro: '0441234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNro, setNewNro] = useState('')
  const [filterValue, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObj =[{
      name: newName,
      nro: newNro
    }]

    if(persons.find((elem) => elem.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObj))
    }
  }


 const handleNewName = (event) =>{setNewName(event.target.value)}
 const handleNewNro = (event) =>{setNewNro(event.target.value)}  
 const handleNewFilter = (event) =>{setNewFilter(event.target.value)}


const filteredPersons = persons.map(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase()))?
persons.filter(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase())):persons

const allPersons = filteredPersons.map(person => {return  <p key={person.name}> {person.name} {person.nro}</p>})

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