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

const favoriteBlog = blogs => {
  const indexOfMaxValue = blogs.reduce((iMax, x, i, blogs) => {
    return x.likes > blogs[iMax].likes ? i : iMax
  }, 0);
  return blogs[indexOfMaxValue]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}