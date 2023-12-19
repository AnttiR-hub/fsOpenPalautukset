import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useQuery } from '@apollo/client'
import { getUser } from './queries'



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const user = useQuery(getUser)
  

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} token={token}/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} user={user.data.me} />
      
      
    </div>
  )
}

export default App
