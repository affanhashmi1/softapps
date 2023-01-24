const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: {
    data: Buffer,
    contentType: String
  },
  status: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('posts', postSchema)