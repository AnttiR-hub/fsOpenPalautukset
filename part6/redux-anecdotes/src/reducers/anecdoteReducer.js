/* eslint-disable no-case-declarations */

import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
      voteAnecdote(state, action){

      const votedAnecdote = action.payload

      return state.map(anecdote => 
        anecdote.id !== action.payload.id ? anecdote : votedAnecdote
      )
        
      },
      appendAnecdote(state, action){
        state.push(action.payload)
      },
      initAnecdotes(state, action){
        return action.payload
      }
  }
})

export const {voteAnecdote, appendAnecdote, initAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(initAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = id => {
  return async dispatch => {
    const payload = await anecdoteService.updateVote(id)
    dispatch(voteAnecdote(payload))
  }
}