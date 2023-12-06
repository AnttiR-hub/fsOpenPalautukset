import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [refreshBlog, setRefreshBlog] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [refreshBlog])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const postBlog = (blogObj) => {
    formRef.current.toggleVisibility()
    blogService.create(blogObj).then(response => {
      setBlogs(blogs.concat(response))
      setNotificationMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`)
      setRefreshBlog(!refreshBlog)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }

  const addLikes = async (id, blogObj) => {
    await blogService.update(id, blogObj)
    setRefreshBlog(!refreshBlog)
  }

  const deleteBlog = async id => {
    await blogService.remove(id)
    setRefreshBlog(!refreshBlog)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} className="error" />
        <form onSubmit={handleLogin}>
          <div>
            <p> username </p>
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id='username'
            />
          </div>

          <div>
            <p> password </p>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id='password'
            />
          </div>
          <button type="submit" id='login-button'>login</button>
        </form>
      </div>
    )
  }



  return (
    <div>
      <Notification message={notificationMessage} className="success"/>
      <p> {user.name} logged in </p>
      <button type="submit" onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="Create new blog" ref={formRef}>
        <NewBlog newBlog={postBlog} />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id}  blog={blog} addLikes={addLikes}  deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}

export default App