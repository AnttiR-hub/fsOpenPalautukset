import { useEffect, useRef, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route, Link } from 'react-router-dom'

import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersInfo from './components/UsersInfo'

import loginService from './services/login'
import { getBlogs, setToken } from './request'

import { useNotificationDispatch } from './notificationContext'
import UserContext from './userContext'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'

import { Form, Button, Navbar, Nav } from 'react-bootstrap'

const App = () => {

  const padding = {
    padding: 5
  }

  const formRef = useRef()

  const [user, userDispatch] = useContext(UserContext)

  const dispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      userDispatch({ type: 'setUser', payload: user })
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setToken(user.token)
      userDispatch({ type: 'setUser', payload: user })
    } catch (exception) {
      dispatch({ type: 'showNotification', payload: 'Wrong username or password' })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    userDispatch({ type: 'clearUser' })
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    options:
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
  )

  if( result.isLoading ){
    return <div>loading data...</div>
  }

  if( result.isError ){
    return<div>blog service not available due to problem in server</div>
  }

  const blogs = result.data


  const Home = () => {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }



    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <p key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
          </p>
        )}

        <Togglable buttonLabel="Create new blog" ref={formRef}>
          <NewBlog />
        </Togglable>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification className="error" />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
            />
            <Button variant="primary" type="submit">
            login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  return (
    <div className="container">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">Home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">Users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div>
            <p> {user.name} is logged in </p>
            <button type="submit" onClick={handleLogout}>Logout</button>
          </div>
        </Navbar>

      </div>
      <Notification className="success"/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<UsersInfo/>} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<SingleBlog blogs={blogs}/>} />
      </Routes>
    </div>
  )
}

export default App