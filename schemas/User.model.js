const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  email_verified: Boolean,
  email_verification_code: String,
  password: String,
  status: String
})

module.exports = mongoose.model('users', userSchema)