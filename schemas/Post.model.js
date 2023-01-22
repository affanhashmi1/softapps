const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  status: String
})

module.exports = mongoose.model('posts', postSchema)