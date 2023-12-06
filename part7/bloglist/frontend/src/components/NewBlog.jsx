import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createBlog } from '../request'
import { useNotificationDispatch } from '../notificationContext'

import { Table, Form, Button } from 'react-bootstrap'


const NewBlog = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newBlogMutation = useMutation({ mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog) )
    }
  })

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    newBlogMutation.mutate({ title, author, url })
    console.log('new blog')

    await dispatch({ type: 'showNotification', payload: `You added ${title} by ${author} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label> Title: </Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder='write title here'
          />
          <Form.Group> Author: </Form.Group>
          <Form.Control
            type="text"
            name="author"
            placeholder='write author here'
          />

          <Form.Label> URL: </Form.Label>
          <Form.Control
            type="text"
            name="url"
            placeholder='write url here'
          />
          <Button type="submit" id='create-button'>Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog