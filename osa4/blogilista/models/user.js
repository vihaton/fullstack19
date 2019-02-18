const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);


const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  name: String,
  passwordHash: { type: String, required: true, minlength: 3 },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // suodatetaan passwordHash eli salasanan tiiviste pois näkyviltä
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

module.exports = User