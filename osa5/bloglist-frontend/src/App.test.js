import App from './App'
import React from 'react'
import {
  render, waitForElement, //prettyDOM
} from 'react-testing-library'

jest.mock('./services/blogs')

describe('<App />', () => {
  it('doesnt render blogs if not logged in', async () => {
    const component = render(
      <App />
    )
    // component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.app')
    )

    // const div = component.container.querySelector('.app')
    // console.log(prettyDOM(div))

    expect(component.container).not.toHaveTextContent(
      'logout'
    )

    expect(component.container).not.toHaveTextContent(
      'Blogi Jäbä'
    )
  })

  it('renders blogs when user logged in', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.app')
    )

    // const div = component.container.querySelector('.app')
    // console.log(prettyDOM(div))


    expect(component.container).toHaveTextContent(
      'logout'
    )

    expect(component.container).toHaveTextContent(
      'Blogi Jäbä'
    )

  })
})