import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { login } from '../queries'

const Login = ({ setToken, show }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginFn, result ] = useMutation(login, {
        onError: (error) => {
           console.log(error)
        }
    })

    useEffect(() => {
        if( result.data ){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('userToken', token)
        }
    }, [result.data])


    const submit = async (event) => {
        event.preventDefault()

        loginFn({ variables: { username, password } })

        setUsername('')
        setPassword('')
    }

    return(
        <div>
          <form onSubmit={submit}>
            <div>
              name
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
            <input 
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
    )
}

export default Login