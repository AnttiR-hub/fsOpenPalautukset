import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useNotificationDispatch } from '../notificationContext'
import { updateLike, deleteBlog, getComments } from '../request'
import { useUserValue } from '../userContext'
import CommentForm from './CommentForm'

const Blog = (({ blog }) => {
  const queryClient = useQueryClient()

  const user = useUserValue()

  const dispatch = useNotificationDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const result = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(blog),
    options:
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
  )

  const addLikeMutation = useMutation({ mutationFn: updateLike,
    onSuccess: (updatedLike) => {
      console.log('update', updatedLike)

      const blogs = queryClient.getQueryData( 'blogs' )

      queryClient.setQueryData('blogs', blogs.map(blog => blog.id === updatedLike.id ? updatedLike : blog))
    }
  })

  const handleLike = async (blog) => {
    addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })

    await dispatch({ type: 'showNotification', payload: `You add one like for: ${blog.title} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  const deleteMutation = useMutation({ mutationFn: deleteBlog,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData('blogs')

      queryClient.setQueryData('blogs', blogs.filter(blog => blog.id !== deletedBlog.id))
    }
  })

  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteMutation.mutate(blog)
    }
    await dispatch({ type: 'showNotification', payload: `You deleted: ${blog.title} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  const showDelete = blog.user.username === user.username ? true : false


  if( result.isLoading ){
    return <div>loading blog</div>
  }

  if( result.isError ){
    return<div>blog not available due to problem in server</div>
  }

  const comments = result.data

  return (
    <div style={blogStyle}  className='blog'>
      {blog.title} by: {blog.author}
      <p>{blog.url}</p>
      <p>
        {blog.likes}
        <button onClick={() => handleLike(blog)}>likes</button>
      </p>
      <p>Author: {blog.user!== null && blog.user.name}</p>
      {showDelete && <button onClick={() => handleDelete(blog)} id='remove-button'>remove blog</button>}

      <p>Comments:</p>
      {comments.map(comment =>
        <p key={comment.id}>{comment.content}</p>)}

      <CommentForm blog={blog}/>
    </div>
  )
})

export default Blog