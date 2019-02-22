import React from 'react'
import { render } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
// import { prettyDOM } from 'dom-testing-library'


test('renders content', () => {
  const sblog = {
    title: 'Blogi',
    author: 'Jäbä',
    likes: 123
  }

  const component = render(
    <SimpleBlog blog={sblog} />
  )

  const titleAuthor = component.getByText('Blogi Jäbä')
  expect(titleAuthor).toBeDefined()
  // console.log(prettyDOM(titleAuthor))

  const element = component.getByText('blog has 123 likes')
  expect(element).toBeDefined()
})