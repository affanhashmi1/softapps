require('./connection')
const constants = require('./constants')
const User = require('../models/User.model')

const createUser = async () => {
  try {
    const password = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD('123')
    const response = await User.create({
      name: 'affan',
      role: 'admin',
      email: 'affanhashmi1@yahoo.com',
      email_verified: true,
      password: password,
      status: 'verified'
    })

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const setup = async () => {
  try {
    const userResponse = await createUser()
    if (!userResponse.status) throw new Error(userResponse.message)

    return 'Setup successful'
  } catch (error) {
    throw error
  }
}

setup()
  .then(response => {
    console.log(response)
    process.exit(1)
  })
  .catch(error => {
    console.log(error)
    process.exit(0)
  })