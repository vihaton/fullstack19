import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
// import { prettyDOM } from 'dom-testing-library'

const initSBlog = () => {
  const sblog = {
    title: 'Blogi',
    author: 'Jäbä',
    likes: 123
  }

  return sblog
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={initSBlog()} />
  )
  const titleAuthor = component.getByText('Blogi Jäbä')
  expect(titleAuthor).toBeDefined()
  // console.log(prettyDOM(titleAuthor))

  const element = component.getByText('blog has 123 likes')
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={initSBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})