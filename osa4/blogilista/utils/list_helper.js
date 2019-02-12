const _ = require("lodash/core")

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return item.likes
      ? sum + item.likes
      : sum + 0
  }
  
  return blogs.length === 0
    ? 0 
    : blogs.reduce(reducer, 0)
}

const indexOfMaxValueGivenField = (arr, field) => {
  return arr.reduce((iMax, x, i, arr) => {
    return x[field] > arr[iMax][field] ? i : iMax
  }, 0);
}

const favoriteBlog = blogs => {
  const indexOfMaxValue = indexOfMaxValueGivenField(blogs, "likes")
  return blogs[indexOfMaxValue]
}

const mostBlogs = blogs => {
  
  const reducedBlogs = _.reduce(blogs, (res, blog) => {
    res[blog.author]
      ? res[blog.author] += 1
      : res[blog.author] = 1
    // console.log('res', res);
    
    return res
  }, {})

  maxInd = Object.values(reducedBlogs).indexOf(Math.max(...Object.values(reducedBlogs)))
  return { "author": Object.keys(reducedBlogs)[maxInd], "blogs": Object.values(reducedBlogs)[maxInd] }
}

const mostLikes = blogs => {
  const reducedBlogs = _.reduce(blogs, (res, blog) => {
    res[blog.author]
      ? res[blog.author] += blog.likes
      : res[blog.author] = blog.likes
    // console.log('res', res);
    
    return res
  }, {})

  maxInd = Object.values(reducedBlogs).indexOf(Math.max(...Object.values(reducedBlogs)))
  return { "author": Object.keys(reducedBlogs)[maxInd], "likes": Object.values(reducedBlogs)[maxInd] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}