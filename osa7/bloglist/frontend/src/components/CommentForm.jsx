import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment } from '../request'
import { Table, Form, Button } from 'react-bootstrap'

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient()


  const newCommentMutation = useMutation({ mutationFn: addComment,
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData('comments')
      queryClient.setQueryData('comments', comments.concat(newComment) )
    }
  })

  const addCommentFn = async (event) => {
    event.preventDefault()

    const content = event.target.comment.value

    event.target.comment.value = ''

    console.log(blog, content)
    newCommentMutation.mutate({ blog, content })
  }

  return (
    <div>
      <Form onSubmit={addCommentFn}>
        <Form.Group>
          <Form.Label> Comment: </Form.Label>
          <Form.Control
            type="text"
            name="comment"
            placeholder='write your comment here'
          />
          <Button type="submit" id='create-button'>Add comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CommentForm