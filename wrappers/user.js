// const omit = require('lodash/omit')
const constants = require('../utilities/constants')
const User = require('../schemas/User.model')
const emailService = require('../services/email')

const onRegister = async (user) => {
  const payload = {
    name: user.name,
    email: user.email,
    subject: 'Email Confirmation Link',
    message: `
      <p>Thank you for joining, we would like you to confirm your <strong>email address</strong> by clicking the link below</p>
      <a href="http://localhost:3000/confirm">Confirm email address</a>
      <p>SoftApps &copy; ${new Date().getFullYear()}</p>
    `
  }
  return await emailService.send(payload)
}

const onForgotPassword = async (user) => {
  const payload = {
    name: user.name,
    email: user.email,
    subject: 'Forgot Password Link',
    message: `
      <p><strong>Forgot your password</strong> by clicking the link below you will be able to change your account password</p>
      <a href="http://localhost:3000/forgot">Confirm email address</a>
      <p>If you didn't initiate this request please ignore this message</p>
      <p>SoftApps &copy; ${new Date().getFullYear()}</p>
    `
  }
  return await emailService.send(payload)
}

const createUser = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['name', 'role', 'email', 'password'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    payload.password = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD(payload.password)
    payload.status = constants.USER_STATUS.PENDING
    const response = await User.create(payload)

    onRegister(response)

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

const updateUser = async (payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')

    const user = await User.findById(payload.id)
    if (!user) throw new Error('user not found')

    if (payload.name) user.name = payload.name
    if (payload.email) user.email = payload.email
    if (payload.password && payload.password !== user.password) user.password = constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD(payload.password)

    const response = await user.save()

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

const deleteUser = async (id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const response = await User.deleteOne({ _id: id })

    return {
      status: true,
      user: `${response.deletedCount} row(s) affected`
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getParams = (params) => {
  const where = {}

  if (params.id) where.id = params.id
  if (params.ids) where.id = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.ids)
  }
  if (params.name) where.name = {
    [Op.like]: `${params.name}%`
  }

  return where
}

const getUsers = async (params) => {
  try {
    const response = await User.find()

    return {
      status: true,
      users: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getUser = async (id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const response = await User.findById(id)
    if (!response) throw new Error('user not found')

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

const login = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['email', 'password'], payload)
    if (message.length > 0) throw new Error(`${message.join(', ')} missing from the request`)

    const response = await User.findOne({ email: payload.email })
    if (!response) throw new Error('Invalid email or password')

    const comparison = await constants.GENERAL_FUNCTIONS.COMPARE_PASSWORD(payload.password, response.password)
    if (!comparison) throw new Error('Invalid email or password')

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

const logout = async (token) => {
  try {
    const sessionResponse = await sessionWrapper.deleteSession(token)
    if (!sessionResponse.status) throw new Error(sessionResponse.message)

    return {
      status: true,
      user: sessionResponse.session
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createUser, updateUser, deleteUser, getUsers, getUser, login, logout }