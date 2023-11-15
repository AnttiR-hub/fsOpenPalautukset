import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Content before clicking view button', () => {
  const blog = {
    title: 'Testi blogii joo',
    author: 'V. Ristola',
    url: 'http://localhost',
    likes: 5,
    user:{
      id:'testaaja'
    }
  }
  const user = {
    id: 'testaaja'
  }

  const { container } = render(<Blog blog={blog} user={user}/>)

  const div = container.querySelector('.whenHidden')

  expect(div).toHaveTextContent(
    'Testi blogii joo'
  )

})

test('content after clicking view button', async () => {
  const blog = {
    title: 'Testi blogii joo',
    author: 'V. Ristola',
    url: 'http://localhost',
    likes: 5,
    user:{
      id:'testaaja'
    }
  }
  const user = {
    id: 'testaaja'
  }

  const { container } = render(<Blog blog={blog} user={user}/>)

  const div = container.querySelector('.whenShown')

  expect(div).toHaveTextContent('http://localhost')
  expect(div).toHaveTextContent('5')
})

test('likes button click twice', async () => {

  const blog = {
    title: 'Testi blogii joo',
    author: 'V. Ristola',
    url: 'http://localhost',
    likes: 5,
    user:{
      id:'testaaja'
    }
  }
  const user = {
    id: 'testaaja'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} addLikes={mockHandler}/>)

  const users = userEvent.setup()
  const button = screen.getByText('like')
  await users.click(button)
  await users.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})