import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'
// import { prettyDOM } from 'dom-testing-library'

const initBlog = () => {
  const blog = {
    title: 'Blogi',
    author: 'Jäbä',
    url: 'www.url.fi',
    likes: 123,
    user: '1234'
  }

  return blog
}

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const user = { id: '1234', username: 'testi' }

    component = render(
      <Blog blog={initBlog()}
        handleLike={mockLike} removeBlog={mockRemove}
        user={user} />
    )
  })


  it('renders only title and author first', () => {

    const titleAuthor = component.getByText('Blogi Jäbä')
    expect(titleAuthor).toBeDefined()
    // console.log(prettyDOM(titleAuthor))

    const div = component.container.querySelector('.blogDetails')

    expect(div).toHaveStyle('display: none')
  })

  it('clicking the button shows the details', async () => {
    const outerDiv = component.container.querySelector('.blogOverview')

    expect(outerDiv).not.toHaveStyle('display: none')

    fireEvent.click(outerDiv)

    const div = component.container.querySelector('.blogDetails')

    expect(div).not.toHaveStyle('display: none')
  })
})