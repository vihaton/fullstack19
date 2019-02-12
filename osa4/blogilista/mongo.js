
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//const url = `mongodb://xvixvi:${password}@cluster0-shard-00-00-guglj.mongodb.net:27017,cluster0-shard-00-01-guglj.mongodb.net:27017,cluster0-shard-00-02-guglj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
const url = `mongodb+srv://xvixvi:${password}@cluster0-guglj.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true }).catch(error => {
  console.log('failed to connect with error', error)
})

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)


if (process.argv.length<7) {
  console.log('blogit:')

  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog.title, blog.author)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}

const blog = new Blog({
  title: process.argv[3],
  author: process.argv[4],
  url: process.argv[5],
  likes: process.argv[6],
})

blog.save().then(() => {
  console.log(`lisätään ${blog.title}, by ${blog.author}, luetteloon`)

  mongoose.connection.close()
}).catch(error => {
  console.log(`ERROR @ saving person: ${error}`)
})