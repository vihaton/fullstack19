const listHelper = require('../utils/list_helper')
const {blogs, listWithOneBlog} = require('./example_blogs')

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has several blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe("favourite blog", () => {

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    console.log(result);
    
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has several blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})