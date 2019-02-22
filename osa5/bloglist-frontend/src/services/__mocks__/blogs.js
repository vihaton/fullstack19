const blogs = [
  {
    title: 'Blogi',
    author: 'Jäbä',
    url: 'www.url.fi',
    likes: 123,
    user: '1234'
  },
  {
    title: 'Blogi2',
    author: 'Jäbä',
    url: 'www.url2.fi',
    likes: 321,
    user: '4321'
  },
  {
    title: 'Blogi3',
    author: 'Jyby',
    url: 'www.lru.fi',
    likes: 1,
    user: '1234'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (token) => {
  return null
}

export default { getAll, setToken }