import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateVote } from './request'
import { useNotificationDispatch } from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: (updatedAnecdote) => {

       const anecdotes = queryClient.getQueryData('anecdotes')

       queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => 
         anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
       )) 
    }
  }) 
  
  const handleVote = async (anecdote) => {
     updateVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})

    await dispatch({ type: 'showNotification', payload: `You voted: ${anecdote.content} !`})

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
    
    console.log('vote')

  }
  
  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )
  console.log(result)

  if ( result.isLoading ) {
        return <div>Loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not avaiable due to problems in server</div>
}

const anecdotes = result.data

  return (
    <div>
      <h1>Anecdote app</h1>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default App